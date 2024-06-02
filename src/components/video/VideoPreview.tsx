import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPreviewProps {
  videoUrl: string | null;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full relative">
      <h2 className="text-xl mb-4">Video Preview</h2>
      {videoUrl ? (
        <ReactPlayer
          url={[videoUrl]}
          controls
          width="100%"
          height="auto"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
    
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
