import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ContentGenerator from './components/ContentGenerator';
import ContentDisplay from './components/ContentDisplay';
import Footer from './components/Footer';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
    setGeneratedContent(null); // Reset generated content when new image is uploaded
  };

  const handleContentGenerated = (content) => {
    setGeneratedContent(content);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setGeneratedContent(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Upload Section */}
        {!uploadedImage && (
          <div className="fade-in">
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        )}

        {/* Content Generation Section */}
        {uploadedImage && !generatedContent && (
          <div className="fade-in">
            <ContentGenerator
              image={uploadedImage}
              onContentGenerated={handleContentGenerated}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Generated Content Display */}
        {generatedContent && (
          <div className="fade-in">
            <ContentDisplay
              content={generatedContent}
              image={uploadedImage}
              onReset={handleReset}
              onRegenerate={() => {
                setGeneratedContent(null);
              }}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;