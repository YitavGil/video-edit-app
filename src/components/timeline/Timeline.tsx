import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";

interface VideoFile {
  name: string;
  url: string;
  duration: number;
}

interface TimelineProps {
  videos: VideoFile[];
  onDrop: (video: VideoFile) => void;
  onRemove: (index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ videos, onDrop, onRemove }) => {
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

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

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
  };

  return (
    <div>
      <div className="flex justify-start mb-2 mx-2">
        <button onClick={handleZoomIn} className="mr-2">
          <RiZoomInFill className="w-8 h-8 text-orange-500" />
        </button>
        <button onClick={handleZoomOut}>
          <RiZoomOutFill className="w-8 h-8 text-orange-500" />
        </button>
      </div>
      <div
        ref={drop}
        className={`mt-4 p-4 border border-gray-300 rounded-lg w-full h-30 ${
          isOver ? "bg-gray-100" : ""
        }`}
        onClick={handleCursorPositionChange}
      >
        <h2 className="text-xl mb-2">Timeline</h2>
        <div className="relative h-10">
          {[...Array(100).keys()].map((second) => (
            <div
              key={second}
              className="absolute top-0 left-0 h-full w-px bg-gray-400"
              style={{ left: `${second * zoomLevel}%` }}
            ></div>
          ))}
          {videos.map((video, index) => (
            <div
              key={`${video.name}-${index}`}
              className="absolute top-0 left-0 bg-blue-500 text-white text-center"
              style={{
                width: `${video.duration * zoomLevel}%`,
                left: `${index * video.duration * zoomLevel}%`,
              }}
            >
              <span>{video.name}</span>
              <button
                className="absolute top-0 right-0 text-red-500 bg-transparent border-none"
                onClick={() => handleRemoveVideo(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
          <div
            className="absolute top-0 left-0 h-full w-px bg-red-500"
            style={{ left: `${cursorPosition * zoomLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
