const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları kabul edilir!'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Convert image to base64
function imageToBase64(filePath) {
  const imageBuffer = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
}

// Generate Instagram content using OpenAI Vision API
async function generateInstagramContent(imagePath, contentType, tone) {
  try {
    const base64Image = imageToBase64(imagePath);
    
    let prompt = '';
    
    switch (contentType) {
      case 'caption':
        prompt = `Bu Instagram gönderisi için ${tone} tonunda Türkçe bir caption yaz. Caption'da:
        - İlgi çekici bir başlangıç olsun
        - Görselle alakalı içerik olsun
        - 2-3 alakalı hashtag ekle
        - Takipçilerle etkileşimi artıracak bir soru ya da çağrı olsun
        - Maksimum 150 kelime olsun`;
        break;
        
      case 'story':
        prompt = `Bu görsel için Instagram Story metni yaz. ${tone} tonunda, kısa ve çarpıcı olsun. Maksimum 50 kelime.`;
        break;
        
      case 'reels':
        prompt = `Bu görsel için Instagram Reels açıklaması yaz. ${tone} tonunda:
        - Trend hashtag'ler kullan
        - Video içeriği öner
        - İzleyiciyi harekete geçirecek bir metin
        - Maksimum 100 kelime`;
        break;
        
      case 'hashtags':
        prompt = `Bu görsel için 15-20 tane alakalı Instagram hashtag öner. Hem popüler hem de niche hashtag'ler kullan. Hashtag'leri virgülle ayır.`;
        break;
        
      default:
        prompt = `Bu görsel için genel bir Instagram gönderisi metni yaz. ${tone} tonunda ve maksimum 100 kelime olsun.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('İçerik oluşturulurken bir hata oluştu: ' + error.message);
  }
}

// Routes
app.post('/api/generate-content', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Lütfen bir resim yükleyin' });
    }

    const { contentType = 'caption', tone = 'friendly' } = req.body;
    
    // Validate content type
    const validContentTypes = ['caption', 'story', 'reels', 'hashtags'];
    if (!validContentTypes.includes(contentType)) {
      return res.status(400).json({ error: 'Geçersiz içerik türü' });
    }

    // Validate tone
    const validTones = ['friendly', 'professional', 'funny', 'inspirational', 'casual'];
    if (!validTones.includes(tone)) {
      return res.status(400).json({ error: 'Geçersiz ton' });
    }

    const content = await generateInstagramContent(req.file.path, contentType, tone);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      content: content,
      contentType: contentType,
      tone: tone
    });

  } catch (error) {
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error:', error);
    res.status(500).json({ 
      error: error.message || 'Sunucu hatası oluştu'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Dosya boyutu çok büyük (maksimum 10MB)' });
    }
  }
  
  res.status(500).json({ error: error.message || 'Sunucu hatası' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Instagram Content Generator ready!`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});
