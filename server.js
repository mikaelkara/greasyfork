const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadsDir);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir!'));
    }
  }
});

// Helper function to encode image to base64
function encodeImageToBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

// Route to generate Instagram content from image
app.post('/api/generate-content', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Lütfen bir resim yükleyin' });
    }

    const { style, platform, language } = req.body;
    const imagePath = req.file.path;
    
    // Encode image to base64
    const base64Image = encodeImageToBase64(imagePath);

    // Create prompt based on user preferences
    let prompt = `Bu görseli analiz ederek ${platform || 'Instagram'} için uygun sosyal medya içeriği oluştur. `;
    
    if (style) {
      prompt += `Stil: ${style}. `;
    }
    
    if (language === 'tr') {
      prompt += `Türkçe olarak yaz. `;
    } else if (language === 'en') {
      prompt += `Write in English. `;
    }
    
    prompt += `Şunları içer:
    1. Çekici bir başlık/caption
    2. İlgili hashtag'ler
    3. Görseldeki önemli detayları vurgula
    4. Etkileşimi artıracak sorular veya call-to-action
    5. Trend hashtag önerileri

    Çıktıyı JSON formatında ver:
    {
      "caption": "Ana metin",
      "hashtags": ["hashtag1", "hashtag2", ...],
      "description": "Görselin detaylı açıklaması",
      "engagement_tips": ["tip1", "tip2", ...],
      "trending_hashtags": ["trend1", "trend2", ...]
    }`;

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const aiResponse = response.choices[0].message.content;
    
    // Try to parse JSON response
    let parsedContent;
    try {
      // Extract JSON from the response if it's wrapped in markdown
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedContent = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        parsedContent = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      parsedContent = {
        caption: aiResponse,
        hashtags: [],
        description: "AI tarafından oluşturulan içerik",
        engagement_tips: [],
        trending_hashtags: []
      };
    }

    // Clean up uploaded file
    fs.remove(imagePath).catch(console.error);

    res.json({
      success: true,
      content: parsedContent,
      originalFilename: req.file.originalname
    });

  } catch (error) {
    console.error('Error generating content:', error);
    
    // Clean up uploaded file in case of error
    if (req.file) {
      fs.remove(req.file.path).catch(console.error);
    }
    
    res.status(500).json({
      error: 'İçerik oluşturulurken hata oluştu',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React app for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Dosya boyutu çok büyük! Maksimum 10MB.' });
    }
  }
  
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Sunucu hatası oluştu' });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? 'Ayarlandı' : 'Ayarlanmadı'}`);
});