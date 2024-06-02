import React from 'react';
import VideoList from '../components/video/VideoList';
import VideoPreview from '../components/video/VideoPreview';

interface VideoFile {
  name: string;
  url: string;
  duration: number; // in seconds
}

interface MainProps {
  videos: VideoFile[];
  previewUrl: string | null;
  onPreview: (url: string) => void;
  onDrop: (video: VideoFile) => void;
  onPlay: () => void; // New prop for handling the play functionality
}

const Main: React.FC<MainProps> = ({ videos, previewUrl, onPreview, onDrop, onPlay }) => {
  const handlePlayClick = () => {
    onPlay(); // Invoke the play function passed from the parent component
  };

  return (
    <div className="flex flex-col md:flex-row flex-1">
      <div className="flex-1">
        <VideoList videos={videos} onPreview={onPreview} />
      </div>
      <div className="flex-1">
        <VideoPreview videoUrl={previewUrl} />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none mt-4"
          onClick={handlePlayClick}
          disabled={videos.length === 0} // Disable the button if no videos are in the timeline
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Main;
