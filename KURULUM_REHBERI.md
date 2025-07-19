# Instagram İçerik Üretici - Kurulum Rehberi 🚀

Bu rehber, Instagram İçerik Üretici uygulamasını kurmanız ve çalıştırmanız için adım adım talimatlar içerir.

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm
- OpenAI API anahtarı

## 🔧 Kurulum Adımları

### 1. Proje Dosyalarını Kontrol Edin

Proje dizininizde aşağıdaki dosyalar olmalı:

```
instagram-content-generator/
├── server.js              # Backend sunucu
├── package.json           # Backend bağımlılıkları
├── .env.example          # Çevre değişkenleri örneği
├── .gitignore            # Git ignore dosyası
├── README.md             # Ana dokümantasyon
├── uploads/              # Geçici dosya dizini
└── client/               # Frontend React uygulaması
    ├── src/              # React kaynak kodları
    ├── package.json      # Frontend bağımlılıkları
    ├── vite.config.js    # Vite konfigürasyonu
    ├── tailwind.config.js # Tailwind CSS ayarları
    └── index.html        # Ana HTML dosyası
```

### 2. Bağımlılıkları Kurun

```bash
# Ana dizinde backend bağımlılıklarını kurun
npm install

# Client dizininde frontend bağımlılıklarını kurun
cd client
npm install
cd ..
```

### 3. OpenAI API Anahtarı Ayarlayın

a) `.env.example` dosyasını `.env` olarak kopyalayın:
```bash
cp .env.example .env
```

b) `.env` dosyasını açın ve OpenAI API anahtarınızı ekleyin:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
PORT=5000
```

**OpenAI API Anahtarı Alma:**
1. [OpenAI Platform](https://platform.openai.com) adresine gidin
2. Hesap oluşturun veya giriş yapın
3. [API Keys](https://platform.openai.com/api-keys) sayfasına gidin
4. "Create new secret key" butonuna tıklayın
5. Anahtarı kopyalayın ve `.env` dosyasına yapıştırın

### 4. Frontend'i Derleyin

```bash
cd client
npm run build
cd ..
```

### 5. Uygulamayı Başlatın

#### Geliştirme Modu (Önerilen):
```bash
npm run dev
```
Bu komut hem backend'i (port 5000) hem frontend'i (port 3000) başlatır.

#### Üretim Modu:
```bash
npm start
```
Bu komut sadece backend'i (port 5000) başlatır ve derlenmiş frontend'i servis eder.

## 🌐 Erişim

Uygulama başlatıldıktan sonra:

- **Geliştirme modu**: http://localhost:3000
- **Üretim modu**: http://localhost:5000

## ✅ Test Etme

1. Tarayıcınızda uygulamayı açın
2. Bir resim yükleyin (JPG, PNG, GIF, WEBP - Max 10MB)
3. İçerik stilini seçin
4. "İçerik Oluştur" butonuna tıklayın
5. AI'ın oluşturduğu içeriği görüntüleyin

## 🐛 Sorun Giderme

### Sunucu Başlamıyor

**Hata**: `EADDRINUSE: address already in use :::5000`
**Çözüm**: Port 5000 kullanımda. `.env` dosyasında farklı bir port belirleyin.

### OpenAI API Hatası

**Hata**: `Invalid API key`
**Çözüm**: 
- `.env` dosyasındaki API anahtarını kontrol edin
- OpenAI hesabınızda kredi olduğundan emin olun
- API anahtarının aktif olduğunu doğrulayın

### Frontend Görünmüyor

**Hata**: Sayfa yüklenmiyor
**Çözüm**:
- `cd client && npm run build` komutunu çalıştırın
- Sunucuyu yeniden başlatın

### Dosya Yükleme Hatası

**Hata**: "Dosya yüklenemiyor"
**Çözüm**:
- Dosya boyutunun 10MB'den küçük olduğunu kontrol edin
- Desteklenen dosya formatlarını kullanın (JPG, PNG, GIF, WEBP)

## 📊 Performans İpuçları

- İlk API çağrısı 30-60 saniye sürebilir
- Yüksek çözünürlüklü resimler daha iyi sonuç verir
- İyi aydınlatılmış fotoğraflar tercih edin

## 🔧 Özelleştirme

### Stil Seçenekleri Ekleme

`src/components/ContentGenerator.jsx` dosyasında `styleOptions` dizisini güncelleyin:

```jsx
const styleOptions = [
  // Mevcut seçenekler...
  { value: 'yeni_stil', label: 'Yeni Stil', description: 'Açıklama' }
];
```

### Platform Desteği Ekleme

Aynı dosyada `platformOptions` dizisini genişletin:

```jsx
const platformOptions = [
  // Mevcut platformlar...
  { value: 'YeniPlatform', label: 'Yeni Platform', icon: '📱' }
];
```

## 📞 Destek

Sorun yaşıyorsanız:

1. Bu rehberdeki sorun giderme bölümünü kontrol edin
2. GitHub Issues'da sorun bildirin
3. Logları `npm run server` ile inceleyin

## 🎉 Başarılı Kurulum!

Tebrikler! Instagram İçerik Üretici uygulamanız çalışmaya hazır. 

Artık resimlerinizden profesyonel Instagram içerikleri oluşturabilirsiniz! 🎨✨