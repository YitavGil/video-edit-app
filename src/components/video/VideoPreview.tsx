import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPreviewProps {
  videoUrls: string[]; // Change prop name to videoUrls
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrls }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    // Reset to the first video when the videoUrls change
    setCurrentVideoIndex(0);
  }, [videoUrls]);

  const handleEnded = () => {
    // Move to the next video when the current video ends
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full relative">
      <h2 className="text-xl mb-4">Video Preview</h2>
      {videoUrls.length > 0 ? (
        <ReactPlayer
          url={videoUrls[currentVideoIndex]}
          controls
          width="100%"
          height="auto"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          playing
          onEnded={handleEnded} // Call handleEnded when the video ends
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
