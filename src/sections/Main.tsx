import React from 'react';
import VideoList from '../components/video/VideoList';
import VideoPreview from '../components/video/VideoPreview';
import PlayButton from '../components/UI/PlayButton';

interface VideoFile {
  name: string;
  url: string;
  duration: number;
}

interface MainProps {
  videos: VideoFile[];
  previewUrls: string[];
  onPreview: (url: string) => void;
  onDrop: (video: VideoFile) => void;
  onPlay: () => void;
  playing: boolean; // Add playing prop
}

const Main: React.FC<MainProps> = ({ videos, previewUrls, onPreview, onDrop, onPlay, playing }) => {
  const handlePlayClick = () => {
    onPlay();
  };

  return (
    <div className="flex flex-col md:flex-row flex-1">
      <div className="flex-1">
        <VideoList videos={videos} onPreview={onPreview} />
      </div>
      <div className="flex-1">
        <VideoPreview videoUrls={previewUrls} playing={playing} /> {/* Pass playing prop */}
        <PlayButton onClick={handlePlayClick} disabled={videos.length === 0} />
      </div>
    </div>
  );
};

export default Main;
