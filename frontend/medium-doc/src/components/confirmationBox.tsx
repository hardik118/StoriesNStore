import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

interface ConfirmationBoxProps {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  heading?: string;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  heading = "Are you sure?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center space-y-4">
        <div className="w-28 mx-auto">
          <DotLottiePlayer
            src="/animations/confirmation.lottie" // Ensure this path is correct
            autoplay
            loop
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <h2 className="text-md font-semibold text-gray-700">{heading}</h2>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
