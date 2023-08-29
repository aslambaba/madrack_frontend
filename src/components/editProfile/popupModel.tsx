import { ReactNode } from "react";

type PopupModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function PopupModal({ children, onClose }: PopupModalProps) {
  return (
    <div className="popup-modal">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
      <style jsx>{`
        .popup-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow-y: scroll !important;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .popup-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: transparent;
          border: none;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
