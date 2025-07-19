import React from 'react';
import { Heart, Zap, Shield, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 glass-morphism border-t border-white/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Instagram İçerik Üretici
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              OpenAI'nin güçlü GPT-4 Vision teknolojisini kullanarak 
              resimlerinizden profesyonel Instagram içerikleri oluşturun.
            </p>
            <div className="flex items-center space-x-2 text-purple-600">
              <Heart className="w-4 h-4" />
              <span className="text-sm">AI ile güçlendirilmiş</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Özellikler
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Anında içerik üretimi</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Güvenli dosya yükleme</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Çoklu platform desteği</span>
              </li>
              <li className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Etkileşim odaklı içerik</span>
              </li>
            </ul>
          </div>

          {/* Usage Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Nasıl Kullanılır?
            </h4>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <span>Resminizi yükleyin</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <span>Stil ve platform seçin</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <span>AI içeriğinizi oluştursun</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <span>Kopyalayıp kullanın!</span>
              </li>
            </ol>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2024 Instagram İçerik Üretici. OpenAI GPT-4 Vision ile güçlendirilmiştir.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistem Aktif</span>
              </div>
              <div className="hidden md:block">
                <span>OpenAI API ile bağlantılı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;