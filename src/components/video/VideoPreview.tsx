import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPreviewProps {
  videoUrls: string[];
  playing: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrls, playing }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    setCurrentVideoIndex(0);
  }, [videoUrls]);

  const handleEnded = () => {
    if (currentVideoIndex < videoUrls.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentVideoIndex(0);
    }
  };

  return (
    <div className="mt-4 p-4 rounded-lg w-full relative">
      <h2 className="text-xl mb-4">Video Preview</h2>
      {videoUrls.length > 0 ? (
        <ReactPlayer
          key={`${currentVideoIndex}-${videoUrls[currentVideoIndex]}`}
          url={videoUrls[currentVideoIndex]}
          controls
          width="100%"
          height="auto"
          playing={playing}
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
