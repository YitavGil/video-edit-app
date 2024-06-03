import React from 'react';

const VideoUpload: React.FC<{ onUpload: (file: File) => void }> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Video Editor</h1>
      <label className="relative cursor-pointer text-blue-500">
        <span className="bg-orange-500 text-white py-2 px-4 rounded-lg">Upload</span>
        <input
          type="file"
          accept="video/*"  
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </label>
    </nav>
  );
};

export default VideoUpload;
