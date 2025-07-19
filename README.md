# 🎨 Instagram İçerik Üreticisi

AI destekli Instagram içerik üreticisi! Görsellerinizi yükleyin ve OpenAI'ın gücüyle profesyonel Instagram içerikleri oluşturun.

## ✨ Özellikler

- 🖼️ **Görsel Analizi**: AI görselinizi analiz eder ve içeriğe uygun metinler üretir
- 📝 **Çoklu İçerik Türü**: Caption, Story, Reels ve Hashtag'ler için özel içerikler
- 🎭 **Ton Seçenekleri**: Samimi, Profesyonel, Eğlenceli, İlham Verici ve Rahat tonlar
- 🌐 **Modern Web Arayüzü**: Responsive ve kullanıcı dostu tasarım
- 📱 **Mobil Uyumlu**: Tüm cihazlarda mükemmel çalışır
- ⚡ **Hızlı ve Güvenli**: Dosyalar geçici olarak işlenir ve hemen silinir

## 🚀 Kurulum

### Ön Gereksinimler

- Node.js (v16 veya üzeri)
- NPM veya Yarn
- OpenAI API anahtarı

### 1. Projeyi İndirin

```bash
git clone <repository-url>
cd instagram-content-generator
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env` dosyasını düzenleyin ve OpenAI API anahtarınızı ekleyin:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### 4. OpenAI API Anahtarı Alın

1. [OpenAI Platform](https://platform.openai.com/api-keys) adresine gidin
2. Hesabınıza giriş yapın veya yeni hesap oluşturun
3. "Create new secret key" butonuna tıklayın
4. Anahtarı kopyalayın ve `.env` dosyasına yapıştırın

### 5. Uygulamayı Başlatın

Geliştirme ortamı için:
```bash
npm run dev
```

Üretim ortamı için:
```bash
npm start
```

## 📖 Kullanım

1. **Tarayıcınızda açın**: `http://localhost:3000`
2. **Görsel yükleyin**: Resminizi sürükleyip bırakın veya tıklayarak seçin
3. **İçerik türünü seçin**: Caption, Story, Reels veya Hashtag
4. **Ton belirleyin**: Markanıza uygun tonu seçin
5. **İçerik oluşturun**: "İçerik Oluştur" butonuna tıklayın
6. **Sonucu kopyalayın**: Oluşturulan içeriği Instagram'da kullanın

## 🎯 İçerik Türleri

### 📝 Caption
- İlgi çekici başlangıç
- Görselle alakalı açıklama
- Alakalı hashtag'ler
- Etkileşim artırıcı sorular
- Maksimum 150 kelime

### 📱 Story
- Kısa ve çarpıcı
- Anında dikkat çeken
- Maksimum 50 kelime

### 🎬 Reels
- Trend hashtag'ler
- Video içerik önerileri
- Harekete geçirici metinler
- Maksimum 100 kelime

### #️⃣ Hashtag
- 15-20 alakalı hashtag
- Popüler ve niche karışımı
- Erişimi artırıcı etiketler

## 🎨 Ton Seçenekleri

- **Samimi**: Arkadaşça ve yakın
- **Profesyonel**: İş dünyasına uygun
- **Eğlenceli**: Komik ve neşeli
- **İlham Verici**: Motive edici ve olumlu
- **Rahat**: Günlük ve doğal

## 🛠️ Teknolojiler

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI**: OpenAI GPT-4 Vision API
- **File Upload**: Multer
- **Styling**: Modern CSS Grid & Flexbox

## 📂 Proje Yapısı

```
instagram-content-generator/
├── server.js              # Ana server dosyası
├── package.json           # NPM bağımlılıkları
├── .env                   # Ortam değişkenleri
├── README.md             # Bu dosya
├── public/
│   └── index.html        # Frontend arayüzü
└── uploads/              # Geçici dosya yükleme klasörü
```

## 🔒 Güvenlik

- Dosyalar işlem sonrası otomatik olarak silinir
- 10MB dosya boyutu sınırı
- Sadece resim dosyaları kabul edilir
- CORS koruması aktif
- Input validation ve sanitization

## 🚨 Sorun Giderme

### OpenAI API Hatası
- API anahtarınızın geçerli olduğundan emin olun
- OpenAI hesabınızda kredi bulunduğunu kontrol edin
- İnternet bağlantınızı kontrol edin

### Dosya Yükleme Hatası
- Dosya boyutunun 10MB'dan küçük olduğundan emin olun
- Dosya formatının desteklendiğini kontrol edin (JPG, PNG, GIF, WEBP)

### Server Başlatma Hatası
- Port 3000'in kullanımda olmadığından emin olun
- `.env` dosyasının doğru yapılandırıldığını kontrol edin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 💡 Gelecek Özellikler

- [ ] Çoklu dil desteği
- [ ] Özel prompt şablonları
- [ ] Toplu işlem desteği
- [ ] Instagram API entegrasyonu
- [ ] Analitik ve raporlama
- [ ] Kullanıcı hesapları
- [ ] İçerik geçmişi

## 📞 Destek

Herhangi bir sorunuz varsa lütfen GitHub Issues bölümünden bildirin.

---

**Instagram İçerik Üreticisi** ile sosyal medya içeriklerinizi bir üst seviyeye taşıyın! 🚀
