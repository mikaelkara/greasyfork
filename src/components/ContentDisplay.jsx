import React, { useState } from 'react';
import { 
  Copy, 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  CheckCircle, 
  Share2, 
  Heart,
  MessageCircle,
  Hash,
  Lightbulb,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';

const ContentDisplay = ({ content, image, onReset, onRegenerate }) => {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = async (text, section) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      toast.success(`${section} panoya kopyalandı!`);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      toast.error('Kopyalama işlemi başarısız oldu');
    }
  };

  const copyAllContent = async () => {
    const allContent = `${content.caption}

${content.hashtags?.map(tag => `#${tag}`).join(' ') || ''}

---
Görselin Açıklaması:
${content.description || ''}

---
Etkileşim İpuçları:
${content.engagement_tips?.map((tip, index) => `${index + 1}. ${tip}`).join('\n') || ''}

---
Trend Hashtag'ler:
${content.trending_hashtags?.map(tag => `#${tag}`).join(' ') || ''}`;

    await copyToClipboard(allContent, 'Tüm İçerik');
  };

  const downloadContent = () => {
    const allContent = `Instagram İçeriği

CAPTION:
${content.caption}

HASHTAGS:
${content.hashtags?.map(tag => `#${tag}`).join(' ') || ''}

GÖRSEL AÇIKLAMASI:
${content.description || ''}

ETKİLEŞİM İPUÇLARI:
${content.engagement_tips?.map((tip, index) => `${index + 1}. ${tip}`).join('\n') || ''}

TREND HASHTAG'LER:
${content.trending_hashtags?.map(tag => `#${tag}`).join(' ') || ''}

Oluşturulma Tarihi: ${new Date().toLocaleString('tr-TR')}
Instagram İçerik Üretici - AI Destekli`;

    const blob = new Blob([allContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `instagram-content-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('İçerik dosya olarak indirildi!');
  };

  const CopyButton = ({ text, section, className = "" }) => (
    <button
      onClick={() => copyToClipboard(text, section)}
      className={`flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors ${className}`}
    >
      {copiedSection === section ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-green-600">Kopyalandı</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-gray-600" />
          <span className="text-gray-600">Kopyala</span>
        </>
      )}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Oluşturulan İçerik ✨
          </h2>
          <p className="text-gray-600">
            AI tarafından oluşturulan Instagram içeriğiniz hazır!
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRegenerate}
            className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Yeniden Oluştur</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Yeni Resim</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Image Preview */}
        <div className="lg:col-span-1">
          <div className="content-card rounded-2xl p-6 shadow-lg sticky top-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Instagram Önizleme
            </h3>
            
            {/* Mock Instagram Post */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Post Header */}
              <div className="flex items-center p-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">@</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-800">kullanici_adi</p>
                  <p className="text-xs text-gray-500">Konum</p>
                </div>
              </div>
              
              {/* Post Image */}
              <img
                src={image.preview}
                alt="Post preview"
                className="w-full aspect-square object-cover"
              />
              
              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center space-x-4 mb-2">
                  <Heart className="w-6 h-6 text-gray-800" />
                  <MessageCircle className="w-6 h-6 text-gray-800" />
                  <Share2 className="w-6 h-6 text-gray-800" />
                </div>
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">1,234 beğeni</span>
                </p>
                <p className="text-sm text-gray-800 mt-2">
                  <span className="font-semibold">kullanici_adi</span>{' '}
                  {content.caption?.slice(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyAllContent}
              className="flex items-center space-x-2 px-6 py-3 instagram-gradient text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Copy className="w-5 h-5" />
              <span>Tümünü Kopyala</span>
            </button>
            <button
              onClick={downloadContent}
              className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>İndir</span>
            </button>
          </div>

          {/* Caption */}
          <div className="content-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
                Caption
              </h3>
              <CopyButton text={content.caption} section="Caption" />
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {content.caption}
              </p>
            </div>
          </div>

          {/* Hashtags */}
          {content.hashtags && content.hashtags.length > 0 && (
            <div className="content-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Hash className="w-6 h-6 mr-2 text-purple-600" />
                  Hashtag'ler
                </h3>
                <CopyButton 
                  text={content.hashtags.map(tag => `#${tag}`).join(' ')} 
                  section="Hashtag'ler" 
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {content.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image Description */}
          {content.description && (
            <div className="content-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-green-600" />
                  Görselin Açıklaması
                </h3>
                <CopyButton text={content.description} section="Açıklama" />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 leading-relaxed">
                  {content.description}
                </p>
              </div>
            </div>
          )}

          {/* Engagement Tips */}
          {content.engagement_tips && content.engagement_tips.length > 0 && (
            <div className="content-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                  Etkileşim İpuçları
                </h3>
                <CopyButton 
                  text={content.engagement_tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n')} 
                  section="İpuçları" 
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {content.engagement_tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Trending Hashtags */}
          {content.trending_hashtags && content.trending_hashtags.length > 0 && (
            <div className="content-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-pink-600" />
                  Trend Hashtag'ler
                </h3>
                <CopyButton 
                  text={content.trending_hashtags.map(tag => `#${tag}`).join(' ')} 
                  section="Trend Hashtag'ler" 
                />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-wrap gap-2">
                  {content.trending_hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDisplay;