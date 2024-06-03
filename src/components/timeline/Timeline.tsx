import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FaTimes } from "react-icons/fa";
import { RiZoomInFill, RiZoomOutFill  } from "react-icons/ri";

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
  const [timelineScale, setTimelineScale] = useState<number>(1); // Initial scale

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "VIDEO",
    drop: (item: VideoFile) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleZoomIn = () => {
    setTimelineScale((prevScale) => prevScale + 0.1); // Increase scale by 0.1
  };

  const handleZoomOut = () => {
    if(timelineScale===1) return
    if (timelineScale > 0.1) {
      // Ensure scale doesn't go negative
      setTimelineScale((prevScale) => prevScale - 0.1); // Decrease scale by 0.1
    }
  };

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
      const trimmedName =
        video.name.length > 10 ? `${video.name.slice(0, 10)}...` : video.name;
      const leftPosition =
        (accumulatedTime / maxTime) * 100 * timelineScale; // Adjust left position based on scale
      const widthPercentage =
        (video.duration / maxTime) * 100 * timelineScale; // Adjust width based on scale
      accumulatedTime += video.duration;
      return (
        <div
          key={`${video.name}-${index}`}
          className="absolute top-0 bg-orange-500 text-white text-center truncate"
          style={{
            width: `${widthPercentage}%`,
            left: `${index === 0 ? leftPosition : leftPosition}%`, // Adjust start position without space
          }}
        >
          <span>{trimmedName}</span>
          <button
            className="absolute top-0 right-0 text-red-800 bg-transparent border-none"
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
      className={`mt-4 p-4 border border-gray-300 rounded-lg overflow-hidden w-full h-30 ${
        isOver ? "bg-gray-100" : ""
      }`}
      onClick={handleCursorPositionChange}
    >
      <h2 className="text-xl mb-1">Timeline (sec)</h2>
      <div className="flex mb-5">
        <button onClick={handleZoomIn} className="mr-2">
         <RiZoomInFill className="text-orange-500 w-6 h-6" />
        </button>
        <button onClick={handleZoomOut}><RiZoomOutFill className="text-orange-500 w-6 h-6" /></button>
      </div>
      <div className="relative h-10">
        {[...Array(maxTime).keys()].map((second) => (
          <div
            key={second}
            className="absolute top-0 left-0 h-full w-px bg-gray-400"
            style={{ left: `${second * timelineScale}%` }} // Adjust left position based on scale
          >
            <span className="absolute text-xs -top-4 hidden lg:block">{second + 1}</span>
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
