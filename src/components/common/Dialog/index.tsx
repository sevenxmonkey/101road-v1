import React from 'react';
import './Dialog.scss';

interface DialogProps {
  message: string | React.ReactNode;
  isVisible: boolean;
}

const Dialog: React.FC<DialogProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        {message}
      </div>
    </div>
  );
};

export default Dialog;
