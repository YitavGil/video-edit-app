import React from "react";
import { Tooltip } from "react-tooltip";
import { MdInfo } from "react-icons/md";

interface PlayButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPlaying: boolean; // Add isPlaying prop
}

const PlayButton: React.FC<PlayButtonProps> = ({
  onClick,
  disabled,
  isPlaying,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onClick}
        disabled={disabled}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded disabled:bg-gray-400 mb-3 cursor-pointer"
      >
        {isPlaying ? "Pause Timeline" : "Play Timeline"}
      </button>
      <MdInfo data-tooltip-id="infoTooltip" data-tooltip-content="Drag videos to the timeline to play them" className='cursor-pointer text-orange-500 w-6 h-5' />
        <Tooltip id="infoTooltip" place="top" />
    </div>
  );
};

export default PlayButton;
