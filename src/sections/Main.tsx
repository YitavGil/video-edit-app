import React, { useState, useEffect } from 'react';
import VideoList from '../components/video/VideoList';
import VideoPreview from '../components/video/VideoPreview';

interface VideoFile {
  name: string;
  url: string;
}

interface MainProps {
  videos: VideoFile[];
  previewUrl: string | null;
}

const Main: React.FC<MainProps> = ({ videos, previewUrl }) => {
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPreviewUrl(previewUrl);
  }, [previewUrl]);

  const handlePreview = (url: string) => {
    setCurrentPreviewUrl(url);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <VideoList videos={videos} onPreview={handlePreview} />
      </div>
      <div className="flex-1">
        <VideoPreview videoUrl={currentPreviewUrl} />
      </div>
    </div>
  );
};

export default Main;
