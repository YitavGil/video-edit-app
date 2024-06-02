import React, { useState } from 'react';
import VideoList from './VideoList';
import VideoPreview from './VideoPreview';

interface VideoFile {
  name: string;
  url: string;
}

const VideoUpload: React.FC = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideos([...videos, { name: file.name, url: fileURL }]);
    }
  };

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <h1 className="text-xl">Video Editor</h1>
          <label className="relative cursor-pointer text-blue-500">
            <span className="bg-blue-500 text-white py-2 px-4 rounded-lg">Upload</span>
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </label>
        </nav>
        <VideoList videos={videos} onPreview={handlePreview} />
      </div>
      <div className="flex-1">
        <VideoPreview videoUrl={previewUrl} />
      </div>
    </div>
  );
};

export default VideoUpload;
