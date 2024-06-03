import React from 'react';

interface PlayButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPlaying: boolean; // Add isPlaying prop
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, disabled, isPlaying }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
    >
      {isPlaying ? 'Pause Timeline' : 'Play Timeline'}
    </button>
  );
};

export default PlayButton;
