import React from 'react';
import './Dialog.scss';

interface DialogProps {
  message: string | React.ReactNode;
  isVisible: boolean;
  onDismiss?: () => void;
}

const Dialog: React.FC<DialogProps> = ({ message, isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        {!!onDismiss && (
          <button className="dialog-close-button" onClick={() => onDismiss()}>
            &times;
          </button>
        )}
        {message}
      </div>
    </div>
  );
};

export default Dialog;
