import React, { useState } from 'react';
import { Wand2, ArrowLeft, Loader2, Settings, Instagram } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContentGenerator = ({ image, onContentGenerated, isLoading, setIsLoading, onReset }) => {
  const [options, setOptions] = useState({
    style: 'professional',
    platform: 'Instagram',
    language: 'tr'
  });

  const styleOptions = [
    { value: 'professional', label: 'Profesyonel', description: 'İş dünyasına uygun, ciddi ton' },
    { value: 'casual', label: 'Rahat & Samimi', description: 'Günlük, arkadaş canlısı stil' },
    { value: 'trendy', label: 'Trend & Genç', description: 'Güncel akımlar, gençlere hitap' },
    { value: 'emotional', label: 'Duygusal', description: 'Kalp dokunduran, hikaye odaklı' },
    { value: 'promotional', label: 'Tanıtım', description: 'Ürün/hizmet tanıtımı odaklı' }
  ];

  const platformOptions = [
    { value: 'Instagram', label: 'Instagram', icon: '📷' },
    { value: 'Facebook', label: 'Facebook', icon: '👍' },
    { value: 'Twitter', label: 'Twitter/X', icon: '🐦' },
    { value: 'LinkedIn', label: 'LinkedIn', icon: '💼' }
  ];

  const languageOptions = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' }
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('style', options.style);
      formData.append('platform', options.platform);
      formData.append('language', options.language);

      const response = await axios.post('/api/generate-content', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout
      });

      if (response.data.success) {
        onContentGenerated(response.data.content);
        toast.success('İçerik başarıyla oluşturuldu! 🎉');
      } else {
        throw new Error(response.data.error || 'İçerik oluşturulamadı');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.code === 'ECONNABORTED') {
        toast.error('İşlem zaman aşımına uğradı. Lütfen tekrar deneyin.');
      } else {
        toast.error('İçerik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            İçerik Oluşturun
          </h2>
          <p className="text-gray-600">
            Ayarları özelleştirin ve AI destekli içeriğinizi oluşturun
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Preview */}
        <div className="content-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Instagram className="w-6 h-6 mr-2 text-purple-600" />
            Yüklenen Resim
          </h3>
          <div className="relative group">
            <img
              src={image.preview}
              alt="Uploaded content"
              className="w-full h-80 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-xl"></div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600">
              <span>📄 {image.name}</span>
              <span>📦 {formatFileSize(image.size)}</span>
            </div>
          </div>
        </div>

        {/* Generation Options */}
        <div className="content-card rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-purple-600" />
            İçerik Ayarları
          </h3>

          <div className="space-y-6">
            {/* Style Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                İçerik Stili
              </label>
              <div className="grid grid-cols-1 gap-3">
                {styleOptions.map((style) => (
                  <label
                    key={style.value}
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      options.style === style.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="style"
                      value={style.value}
                      checked={options.style === style.value}
                      onChange={(e) => setOptions({ ...options, style: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{style.label}</span>
                        {options.style === style.value && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Platform
              </label>
              <div className="grid grid-cols-2 gap-3">
                {platformOptions.map((platform) => (
                  <label
                    key={platform.value}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      options.platform === platform.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="platform"
                      value={platform.value}
                      checked={options.platform === platform.value}
                      onChange={(e) => setOptions({ ...options, platform: e.target.value })}
                      className="sr-only"
                    />
                    <span className="text-xl mr-2">{platform.icon}</span>
                    <span className="font-medium text-gray-800">{platform.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dil
              </label>
              <div className="grid grid-cols-2 gap-3">
                {languageOptions.map((language) => (
                  <label
                    key={language.value}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      options.language === language.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value={language.value}
                      checked={options.language === language.value}
                      onChange={(e) => setOptions({ ...options, language: e.target.value })}
                      className="sr-only"
                    />
                    <span className="font-medium text-gray-800">{language.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold text-white transition-all ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'instagram-gradient hover:shadow-lg hover:scale-105 active:scale-95'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>İçerik Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span>İçerik Oluştur</span>
                </>
              )}
            </button>

            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-blue-800 text-sm">
                    Resminiz analiz ediliyor ve özel içerik oluşturuluyor...
                  </p>
                </div>
                <div className="mt-2 text-xs text-blue-600">
                  Bu işlem 30-60 saniye sürebilir.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;