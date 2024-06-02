import React from 'react';

interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean; // Make the disabled prop optional
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
      Play
    </button>
  );
};

export default PlayButton;
