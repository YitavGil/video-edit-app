import React from 'react';
import VideoList from '../components/video/VideoList';
import VideoPreview from '../components/video/VideoPreview';

interface VideoFile {
  name: string;
  url: string;
}

interface MainProps {
  videos: VideoFile[];
  previewUrl: string | null;
  onPreview: (url: string) => void;
}

const Main: React.FC<MainProps> = ({ videos, previewUrl, onPreview }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <VideoList videos={videos} onPreview={onPreview} />
      </div>
      <div className="flex-1">
        <VideoPreview videoUrl={previewUrl} />
      </div>
    </div>
  );
};

export default Main;
