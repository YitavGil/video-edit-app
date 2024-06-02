import React from 'react';

interface VideoPreviewProps {
  videoUrl: string | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full">
      <h2 className="text-xl mb-4">Video Preview</h2>
      {videoUrl ? (
        <video controls className="w-full">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video selected for preview.</p>
      )}
    </div>
  );
};

export default VideoPreview;
