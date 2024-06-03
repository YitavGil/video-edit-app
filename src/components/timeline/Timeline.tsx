import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaTimes } from "react-icons/fa";

interface VideoFile {
  name: string;
  url: string;
  duration: number; // in seconds
}

interface TimelineProps {
  videos: VideoFile[];
  onDrop: (video: VideoFile) => void;
  onRemove: (index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ videos, onDrop, onRemove }) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "VIDEO",
    drop: (item: VideoFile) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleCursorPositionChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const position = e.clientX - rect.left;
    const time = Math.floor((position / rect.width) * 100);
    setCursorPosition(time);
  };

  const handleRemoveVideo = (index: number) => {
    onRemove(index);
  };

  const maxTime = 100; // This is an arbitrary value to indicate the timeline length for demonstration purposes

  const renderVideoBlocks = () => {
    let accumulatedTime = 0;
    return videos.map((video, index) => {
      const trimmedName = video.name.length > 10 ? `${video.name.slice(0, 10)}...` : video.name;
      const leftPosition = (accumulatedTime / maxTime) * 100;
      const widthPercentage = (video.duration / maxTime) * 100;
      accumulatedTime += video.duration;
      return (
        <div
          key={`${video.name}-${index}`}
          className="absolute top-0 bg-orange-500 text-white text-center truncate"
          style={{
            width: `${widthPercentage}%`,
            left: `${leftPosition}%`,
          }}
        >
          <span>{trimmedName}</span>
          <button
            className="absolute top-0 right-0 text-red-500 bg-transparent border-none"
            onClick={() => handleRemoveVideo(index)}
          >
            <FaTimes />
          </button>
        </div>
      );
    });
  };

  return (
    <div
      ref={drop}
      className={`mt-4 p-4 border border-gray-300 rounded-lg w-full h-30 ${
        isOver ? "bg-gray-100" : ""
      }`}
      onClick={handleCursorPositionChange}
    >
      <h2 className="text-xl mb-2">Timeline</h2>
      <div className="relative h-10">
        {[...Array(maxTime).keys()].map((second) => (
          <div
            key={second}
            className="absolute top-0 left-0 h-full w-px bg-gray-400"
            style={{ left: `${second}%` }}
          >
            <span className="absolute text-xs -top-4">{second + 1}</span>
          </div>
        ))}
        {renderVideoBlocks()}
        <div
          className="absolute top-0 left-0 h-full w-px bg-red-500"
          style={{ left: `${cursorPosition}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timeline;
