import React from 'react';
import { Instagram, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-morphism shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 instagram-gradient rounded-2xl shadow-lg">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                Instagram İçerik Üretici
              </h1>
              <p className="text-gray-600 text-sm">
                AI destekli sosyal medya içeriği oluşturun
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-purple-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">
              OpenAI GPT-4 Vision
            </span>
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            '🎯 Hedef odaklı içerik',
            '📈 Etkileşim artırıcı',
            '#️⃣ Trend hashtag\'ler',
            '🔥 Anında üretim'
          ].map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-white/30"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;