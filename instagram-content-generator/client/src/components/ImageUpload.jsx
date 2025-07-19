import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.some(error => error.code === 'file-too-large')) {
        toast.error('Dosya boyutu çok büyük! Maksimum 10MB yükleyebilirsiniz.');
      } else if (rejection.errors.some(error => error.code === 'file-invalid-type')) {
        toast.error('Geçersiz dosya türü! Sadece JPG, PNG, GIF ve WEBP formatları desteklenir.');
      } else {
        toast.error('Dosya yüklenirken bir hata oluştu.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageData = {
          file: file,
          preview: e.target.result,
          name: file.name,
          size: file.size
        };
        onImageUpload(imageData);
        toast.success('Resim başarıyla yüklendi!');
      };
      
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const getDropzoneClassName = () => {
    let className = 'upload-area rounded-2xl p-8 md:p-12 cursor-pointer transition-all duration-300 ';
    
    if (isDragActive) {
      className += 'dragover ';
    }
    if (isDragAccept) {
      className += 'border-green-400 bg-green-50 ';
    }
    if (isDragReject) {
      className += 'border-red-400 bg-red-50 ';
    }
    
    return className;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Resminizi Yükleyin
        </h2>
        <p className="text-gray-600 text-lg">
          Instagram içeriği oluşturmak için bir resim seçin veya sürükleyin
        </p>
      </div>

      <div
        {...getRootProps()}
        className={getDropzoneClassName()}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <div className="mb-6">
            {isDragActive ? (
              <div className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-purple-100 mb-4">
                  <Upload className="w-12 h-12 text-purple-600 animate-bounce" />
                </div>
                <p className="text-xl font-semibold text-purple-700">
                  Resmi buraya bırakın...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-4">
                  <ImageIcon className="w-12 h-12 text-purple-600" />
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Resim yüklemek için tıklayın veya sürükleyin
                </p>
                <p className="text-gray-500">
                  JPG, PNG, GIF, WEBP formatları desteklenir (Max: 10MB)
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Hızlı yükleme</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Güvenli işleme</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>AI analizi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upload tips */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              En İyi Sonuçlar İçin İpuçları:
            </h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Yüksek çözünürlüklü ve net resimler kullanın</li>
              <li>• İyi aydınlatılmış fotoğraflar daha iyi analiz edilir</li>
              <li>• Kişiler, ürünler veya manzara içeren resimler ideal</li>
              <li>• Çok karmaşık olmayan kompozisyonlar tercih edin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;