import React, { useEffect, useRef } from 'react';

interface VideoPreviewProps {
  videoUrl: string | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.load();
    }
  }, [videoUrl]);

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full relative">
      <h2 className="text-xl mb-4">Video Preview</h2>
      {videoUrl ? (
        <video ref={videoRef} controls className="w-full">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
