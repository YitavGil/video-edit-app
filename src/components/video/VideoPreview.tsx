import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPreviewProps {
  videoUrls: string[];
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrls }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  useEffect(() => {
    setCurrentVideoIndex(0);
  }, [videoUrls]);

  const handleEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full relative">
      <h2 className="text-xl mb-4">Video Preview</h2>
      {videoUrls.length > 0 ? (
        <ReactPlayer
          key={videoUrls.join(',')} // Use key prop to force re-mount on urls change
          url={videoUrls[currentVideoIndex]}
          controls
          width="100%"
          height="auto"
          playing
          onEnded={handleEnded}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-64 bg-gray-200 relative">
          <p className="absolute text-gray-600 text-center text-lg">
            Upload a video to show preview.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;
