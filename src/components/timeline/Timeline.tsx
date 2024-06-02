import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { FaTimes } from 'react-icons/fa';

interface VideoFile {
  name: string;
  url: string;
  duration: number; // in seconds
}

interface TimelineProps {
    videos: VideoFile[];
    onDrop: (video: VideoFile) => void;
    onRemove: (videoName: string, index: number) => void; // Update the interface to accept index parameter
  }

const Timeline: React.FC<TimelineProps> = ({ videos, onDrop, onRemove }) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'VIDEO',
    drop: (item: VideoFile) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleCursorPositionChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const time = Math.floor((position / rect.width) * 100);
    setCursorPosition(time);
  };

  const handleRemoveVideo = (videoName: string, index: number) => {
    onRemove(videoName, index);
  };

  console.log(videos);
  

  return (
    <div
      ref={drop}
      className={`mt-4 p-4 border border-gray-300 rounded-lg w-full h-30 ${isOver ? 'bg-gray-100' : ''}`}
      onClick={handleCursorPositionChange}
    >
      <h2 className="text-xl mb-2">Timeline</h2>
      <div className="relative h-10">
        {[...Array(100).keys()].map((second) => (
          <div
            key={second}
            className="absolute top-0 left-0 h-full w-px bg-gray-400"
            style={{ left: `${second}%` }}
          ></div>
        ))}
        {videos.map((video, index) => (
          <div
            key={`${video.name}-${index}`} // Unique identifier for each video entry
            className="absolute top-0 left-0 bg-blue-500 text-white text-center"
            style={{ width: `${video.duration}%`, left: `${index * 10}%` }}
          >
            <span>{video.name}</span>
            <button
              className="absolute top-0 right-0 text-red-500 bg-transparent border-none"
              onClick={() => handleRemoveVideo(video.name, index)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <div className="absolute top-0 left-0 h-full w-px bg-red-500" style={{ left: `${cursorPosition}%` }}></div>
      </div>
    </div>
  );
};

export default Timeline;
