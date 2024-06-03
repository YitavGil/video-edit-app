import React, { useState, useEffect } from 'react';
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
  timelineVideos: VideoFile[]
}

const Main: React.FC<MainProps> = ({ videos, previewUrls, onPreview, onPlay, playing, timelineVideos }) => {
  const [isPlaying, setIsPlaying] = useState(playing);

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

  const handlePlayClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      onPlay();
      setIsPlaying(true);
    }
  };


  return (
    <div className="flex flex-col md:flex-row flex-1 px-4">
      <div className="flex-1">
        <VideoList videos={videos} onPreview={onPreview} />
      </div>
      <div className="flex-1">
        <VideoPreview videoUrls={previewUrls} playing={isPlaying} />
        <PlayButton onClick={handlePlayClick} disabled={timelineVideos.length < 1} isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default Main;
