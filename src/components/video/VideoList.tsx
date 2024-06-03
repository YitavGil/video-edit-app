import React from 'react';
import { useDrag } from 'react-dnd';
import { Tooltip } from 'react-tooltip';
import { MdInfo } from "react-icons/md";

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
    <div className="mt-5 p-4 rounded-lg md:w-3/4 w-full">
      <div className="flex items-center mb-4">
        <h2 className="text-xl mr-2">All Scenes</h2>
        <MdInfo data-tooltip-id="infoTooltip" data-tooltip-content="Uploaded videos will be added to this list" className='cursor-pointer text-orange-500 w-6 h-5' />
        <Tooltip id="infoTooltip" place="top" />
      </div>
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
      className={`flex items-center justify-between px-4 py-2 rounded-lg bg-orange-400 mb-2 ${isDragging ? 'opacity-80' : ''}`}
    >
      <span className="mr-4">{video.name}</span>
      <button
        onClick={() => onPreview(video.url)}
        className=" p-2 rounded-full "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          className="fill-current text-gray-700"
        >
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
};

export default VideoList;
