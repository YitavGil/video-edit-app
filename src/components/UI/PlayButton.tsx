import React from 'react';

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
      Play
    </button>
  );
};

export default PlayButton;
