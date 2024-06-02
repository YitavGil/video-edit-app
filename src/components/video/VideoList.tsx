import React from 'react';
import { useDrag } from 'react-dnd';

interface VideoFile {
  name: string;
  url: string;
}

interface VideoListProps {
  videos: VideoFile[];
  onPreview: (url: string) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onPreview }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg w-full">
      <h2 className="text-xl mb-4">All Scenes</h2>
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <VideoListItem key={index} video={video} onPreview={onPreview} />
        ))
      ) : (
        <p>No videos uploaded yet.</p>
      )}
    </div>
  );
};

const VideoListItem: React.FC<{ video: VideoFile; onPreview: (url: string) => void }> = ({ video, onPreview }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'VIDEO',
    item: video,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center mb-2 ${isDragging ? 'opacity-50' : ''}`}
    >
      <span className="mr-4">{video.name}</span>
      <button
        onClick={() => onPreview(video.url)}
        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="fill-current text-gray-700"
        >
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
};

export default VideoList;
