import React from 'react';
import { IoClose } from 'react-icons/io5'; // optional close icon

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl relative animate-fadeIn">
        {/* Header with title and close button */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition text-2xl"
            aria-label="Close Modal"
          >
            <IoClose />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4">{children}</div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}
