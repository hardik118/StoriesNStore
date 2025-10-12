import React from "react";
import "@dotlottie/react-player/dist/index.css";
import Lottie from "lottie-react";
import animationData  from "../../public/animation/Animation - 1743963625804.json"

interface ConfirmationBoxProps {
  isOpen: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  heading?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  heading = "Are you sure?",
  description,
  confirmLabel = "Proceed",
  cancelLabel = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center space-y-4">
        {/* Optional animation */}
          <div className="w-36 mx-auto">
            <Lottie
              animationData={animationData}
              loop
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        

        {/* Heading + description */}
        <h2 className="text-lg font-semibold text-gray-700">{heading}</h2>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
