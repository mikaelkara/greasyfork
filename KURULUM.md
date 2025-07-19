# 🚀 Instagram İçerik Üreticisi - Kurulum Rehberi

Bu rehber, AI destekli Instagram içerik üreticisinin nasıl kurulacağını ve kullanılacağını adım adım açıklar.

## 🎯 Proje Özeti

Instagram İçerik Üreticisi, OpenAI'ın güçlü görsel analiz teknolojisini kullanarak görsellerden otomatik olarak Instagram içerikleri oluşturan web uygulamasıdır.

### ✨ Özellikler:
- 🖼️ Görsel analizi ve yorumlama
- 📝 4 farklı içerik türü (Caption, Story, Reels, Hashtag)
- 🎭 5 farklı ton seçeneği
- 🌐 Modern ve responsive web arayüzü
- ⚡ Hızlı ve güvenli dosya işleme
- 📱 Mobil uyumlu tasarım

## 📋 Gereksinimler

### Sistem Gereksinimleri:
- Node.js v16+ 
- NPM veya Yarn
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)

### API Gereksinimleri:
- OpenAI hesabı
- OpenAI API anahtarı
- GPT-4 Vision API erişimi

## 🛠️ Kurulum Adımları

### 1. Projeyi İndirin
```bash
# Terminal'de proje klasörüne gidin
cd instagram-content-generator
```

### 2. Bağımlılıkları Kontrol Edin
```bash
# Node.js versiyonunu kontrol edin
node --version  # v16+ olmalı

# NPM versiyonunu kontrol edin
npm --version
```

### 3. Bağımlılıkları Yükleyin
```bash
# Tüm gerekli paketleri yükleyin
npm install
```

### 4. OpenAI API Anahtarını Alın

#### 4.1 OpenAI Hesabı Oluşturun
1. [OpenAI Platform](https://platform.openai.com/) adresine gidin
2. "Sign Up" ile hesap oluşturun veya "Log In" ile giriş yapın
3. Telefon numaranızı doğrulayın

#### 4.2 API Anahtarı Oluşturun
1. [API Keys](https://platform.openai.com/api-keys) sayfasına gidin
2. "Create new secret key" butonuna tıklayın
3. Anahtar için bir isim verin (örn: "Instagram Content Generator")
4. Anahtarı kopyalayın ve güvenli bir yerde saklayın

#### 4.3 Kredi Yükleyin
1. [Billing](https://platform.openai.com/account/billing) sayfasına gidin
2. "Add to credit balance" ile kredi ekleyin
3. Minimum $5 yüklemeniz önerilir

### 5. Ortam Değişkenlerini Ayarlayın

`.env` dosyasını düzenleyin:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3000
```

**⚠️ Önemli**: 
- `your_openai_api_key_here` yerine gerçek API anahtarınızı yazın
- API anahtarı `sk-` ile başlamalıdır
- Bu dosyayı asla paylaşmayın veya GitHub'a yüklemeyin

### 6. Uygulamayı Başlatın

#### Geliştirme Modunda:
```bash
npm run dev
```

#### Üretim Modunda:
```bash
npm start
```

### 7. Tarayıcıda Açın
```
http://localhost:3000
```

## 🎮 Kullanım Rehberi

### Adım 1: Görsel Yükleme
1. Ana sayfadaki yükleme alanına tıklayın
2. Bilgisayarınızdan bir resim seçin veya sürükleyip bırakın
3. Desteklenen formatlar: JPG, PNG, GIF, WEBP (Max: 10MB)

### Adım 2: İçerik Türü Seçimi
- **Caption**: Ana feed paylaşımları için detaylı açıklamalar
- **Story**: 24 saatlik hikayeler için kısa metinler  
- **Reels**: Video içerikler için açıklamalar
- **Hashtag**: Erişim artırmak için etiket önerileri

### Adım 3: Ton Belirleme
- **Samimi**: Kişisel, arkadaşça
- **Profesyonel**: İş odaklı, ciddi
- **Eğlenceli**: Komik, neşeli
- **İlham Verici**: Motive edici, pozitif
- **Rahat**: Günlük, doğal

### Adım 4: İçerik Oluşturma
1. "İçerik Oluştur" butonuna tıklayın
2. AI'ın analiz etmesini bekleyin (5-15 saniye)
3. Oluşturulan içeriği inceleyin

### Adım 5: İçeriği Kullanma
1. "Kopyala" butonu ile panoya kopyalayın
2. Instagram'da yapıştırın
3. Gerekirse düzenlemeler yapın

## 🔧 Sorun Giderme

### Sık Karşılaşılan Problemler:

#### Problem: "Cannot find module" hatası
```bash
# Çözüm: Bağımlılıkları yeniden yükleyin
rm -rf node_modules package-lock.json
npm install
```

#### Problem: "OpenAI API key required" hatası
```bash
# Çözüm: .env dosyasını kontrol edin
cat .env
# OPENAI_API_KEY satırında gerçek anahtarınız olmalı
```

#### Problem: "Invalid API key" hatası
- OpenAI dashboard'da API anahtarının aktif olduğunu kontrol edin
- Anahtarın doğru kopyalandığından emin olun
- Yeni bir API anahtarı oluşturmayı deneyin

#### Problem: "Insufficient quota" hatası
- OpenAI hesabınızda kredi kalmamış olabilir
- Billing sayfasından kredi ekleyin
- Usage sayfasından ne kadar kullandığınızı kontrol edin

#### Problem: Server başlamıyor
```bash
# Port 3000 kullanımda olabilir, farklı port deneyin
PORT=3001 npm run dev
```

#### Problem: Görsel yüklenmiyor
- Dosya boyutunun 10MB'dan küçük olduğundan emin olun
- Dosya formatının desteklendiğini kontrol edin
- İnternet bağlantınızı kontrol edin

## 📊 Performans İpuçları

### Daha İyi Sonuçlar İçin:
1. **Kaliteli Görseller**: Yüksek çözünürlük, iyi ışıklandırma
2. **Net Konular**: Ana nesne belirgin olsun
3. **Uygun Format**: JPG optimal performans sağlar
4. **Küçük Boyut**: 2-5MB arası ideal

### Maliyet Optimizasyonu:
- GPT-4 Vision yaklaşık $0.01-0.02 per request
- Günlük 50-100 analiz için ~$1-2 maliyet
- Batch işlemler yapmak yerine tekil analizler yapın

## 🔒 Güvenlik

### Veri Korunması:
- Yüklenen görseller geçici olarak işlenir
- İşlem sonrası dosyalar otomatik silinir
- API anahtarları güvenli şekilde saklanır
- CORS koruması aktif

### Gizlilik:
- Görseller OpenAI sunucularında işlenir
- OpenAI veri saklama politikasını kontrol edin
- Hassas içerikler için dikkatli olun

## 🚀 Üretim Ortamına Yükleme

### Netlify ile:
```bash
# Build komutu
npm run build

# Netlify'a yükleyin
# _redirects dosyası: /* /index.html 200
```

### Vercel ile:
```bash
# vercel.json oluşturun
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/server.js" }
  ]
}
```

### Heroku ile:
```bash
# Procfile oluşturun
web: node server.js

# Environment variables ekleyin
heroku config:set OPENAI_API_KEY=your-key
```

## 📞 Destek

### Yardım Alın:
- GitHub Issues: Teknik problemler için
- OpenAI Documentation: API kullanımı için
- Community Forum: Genel sorular için

### Faydalı Linkler:
- [OpenAI Platform](https://platform.openai.com/)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Instagram API Guidelines](https://developers.facebook.com/docs/instagram)

---

**🎉 Başarılar! Instagram içeriklerinizi AI ile yepyeni bir seviyeye taşıyın!**