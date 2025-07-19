# Instagram İçerik Üretici 📷✨

OpenAI GPT-4 Vision destekli Instagram sosyal medya içerik üretim platformu. Resimlerinizi yükleyin, AI'ın sizin için profesyonel Instagram içerikleri oluşturmasını sağlayın!

## 🌟 Özellikler

- **🤖 AI Destekli İçerik Üretimi**: OpenAI GPT-4 Vision ile görsel analiz
- **📝 Çoklu İçerik Türü**: Caption, hashtag'ler, açıklamalar ve etkileşim ipuçları
- **🎨 Çoklu Stil Seçenekleri**: Profesyonel, rahat, trendy, duygusal ve tanıtım stilleri
- **🌐 Platform Desteği**: Instagram, Facebook, Twitter ve LinkedIn
- **🌍 Çoklu Dil**: Türkçe ve İngilizce
- **📱 Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **📋 Kolay Kopyalama**: Tek tıkla panoya kopyalama
- **💾 İndirme Seçeneği**: İçeriği dosya olarak kaydetme

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- OpenAI API anahtarı

### 1. Projeyi İndirin

```bash
git clone <repo-url>
cd instagram-content-generator
```

### 2. Bağımlılıkları Kurun

```bash
# Ana dizinde
npm install

# Client dizininde
cd client
npm install
cd ..
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env` olarak kopyalayın ve OpenAI API anahtarınızı ekleyin:

```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

### 4. Client'ı Derleyin

```bash
cd client
npm run build
cd ..
```

### 5. Uygulamayı Başlatın

#### Geliştirme Modu (Önerilen)
```bash
npm run dev
```

Bu komut hem backend'i (port 5000) hem de frontend'i (port 3000) aynı anda başlatır.

#### Üretim Modu
```bash
npm start
```

Backend ve derlenmiş frontend'i port 5000'de çalıştırır.

## 🔑 OpenAI API Anahtarı Alma

1. [OpenAI Platform](https://platform.openai.com) adresine gidin
2. Hesap oluşturun veya giriş yapın
3. [API Keys](https://platform.openai.com/api-keys) sayfasına gidin
4. "Create new secret key" butonuna tıklayın
5. Anahtarı kopyalayın ve `.env` dosyasına ekleyin

**Not**: GPT-4 Vision kullanımı için hesabınızda kredi bulunması gerekir.

## 📖 Kullanım

### 1. Resim Yükleme
- Ana sayfada "Resim yüklemek için tıklayın" alanına tıklayın
- Veya resmi sürükleyip bırakın
- Desteklenen formatlar: JPG, PNG, GIF, WEBP (Max: 10MB)

### 2. Ayarları Özelleştirme
- **İçerik Stili**: Profesyonel, rahat, trendy, duygusal veya tanıtım
- **Platform**: Instagram, Facebook, Twitter veya LinkedIn
- **Dil**: Türkçe veya İngilizce

### 3. İçerik Oluşturma
- "İçerik Oluştur" butonuna tıklayın
- AI'ın resminizi analiz etmesini bekleyin (30-60 saniye)
- Oluşturulan içeriği görüntüleyin

### 4. İçeriği Kullanma
- Bölümleri ayrı ayrı kopyalayın
- Tüm içeriği tek seferde kopyalayın
- İçeriği dosya olarak indirin
- Yeni içerik için "Yeniden Oluştur" seçeneğini kullanın

## 🛠️ Teknik Detaylar

### Backend (Node.js + Express)
- **Multer**: Dosya yükleme
- **OpenAI API**: GPT-4 Vision entegrasyonu
- **CORS**: Cross-origin istekleri
- **fs-extra**: Dosya sistemi işlemleri

### Frontend (React + Vite)
- **React 18**: Kullanıcı arayüzü
- **Tailwind CSS**: Styling
- **React Dropzone**: Dosya yükleme
- **Lucide React**: İkonlar
- **Axios**: HTTP istekleri
- **React Hot Toast**: Bildirimler

### Güvenlik
- Dosya türü doğrulama
- Dosya boyutu sınırlama
- Geçici dosya temizleme
- CORS koruması

## 📁 Proje Yapısı

```
instagram-content-generator/
├── server.js                 # Express backend
├── package.json              # Backend dependencies
├── .env.example             # Ortam değişkenleri şablonu
├── .env                     # Ortam değişkenleri (git'e dahil değil)
├── uploads/                 # Geçici dosya dizini
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # React bileşenleri
│   │   ├── App.jsx         # Ana uygulama bileşeni
│   │   ├── main.jsx        # React giriş noktası
│   │   └── index.css       # Ana stil dosyası
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite konfigürasyonu
│   ├── tailwind.config.js  # Tailwind CSS konfigürasyonu
│   └── dist/               # Derlenmiş frontend (üretim)
└── README.md               # Bu dosya
```

## 🎨 Özelleştirme

### Stilleri Değiştirme
- `client/src/index.css` dosyasında CSS değişkenleri
- `client/tailwind.config.js` dosyasında Tailwind ayarları

### Yeni Stiller Ekleme
- `ContentGenerator.jsx` dosyasında `styleOptions` dizisini güncelleyin
- Backend'de `server.js` dosyasındaki prompt'u düzenleyin

### Platform Desteği
- `ContentGenerator.jsx` dosyasında `platformOptions` dizisini genişletin

## 🐛 Sorun Giderme

### Yaygın Hatalar

**"OpenAI API anahtarı bulunamadı"**
- `.env` dosyasında `OPENAI_API_KEY` ayarlandığından emin olun
- Sunucuyu yeniden başlatın

**"Dosya yüklenemiyor"**
- Dosya boyutunun 10MB'den küçük olduğunu kontrol edin
- Desteklenen dosya formatlarını kullanın

**"İçerik oluşturulamadı"**
- OpenAI hesabınızda kredi bulunduğundan emin olun
- İnternet bağlantınızı kontrol edin

### Log'ları İnceleme
```bash
# Backend logları
npm run server

# Detaylı loglar için
DEBUG=* npm run server
```

## 📊 Performans

- **Ortalama yanıt süresi**: 30-60 saniye
- **Maksimum dosya boyutu**: 10MB
- **Desteklenen eşzamanlı kullanıcı**: API limitine bağlı
- **Resim çözünürlüğü**: Otomatik optimizasyon

## 🔒 Gizlilik

- Yüklenen resimler geçici olarak sunucuda saklanır
- İşlem tamamlandıktan sonra resimler otomatik silinir
- OpenAI API'sine gönderilen veriler OpenAI gizlilik politikasına tabidir

## 📄 Lisans

Bu proje MIT lisansı altında yayınlanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. GitHub Issues bölümünde sorun açın
2. README dosyasındaki sorun giderme bölümünü inceleyin
3. OpenAI API durumunu kontrol edin

## 🚀 Güncellemeler

- **v1.0.0**: İlk sürüm
  - Temel AI destekli içerik üretimi
  - Çoklu stil ve platform desteği
  - Modern React arayüzü

---

Made with ❤️ using OpenAI GPT-4 Vision
