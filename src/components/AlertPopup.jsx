"use client";

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AlertPopup({
  open,
  type = "success",
  message,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      <div
        className={`w-full max-w-md rounded-3xl p-8 text-white shadow-2xl animate-popup
        ${
          type === "success"
            ? "bg-[#9E1C60]"
            : "bg-red-600"
        }`}
      >

        <div className="flex flex-col items-center text-center">

          {/* ICON */}
          <div className="mb-5">
            {type === "success" ? (
              <CheckCircle2 size={70} />
            ) : (
              <XCircle size={70} />
            )}
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold mb-3">
            {type === "success"
              ? "Success!"
              : "Oops!"}
          </h2>

          {/* MESSAGE */}
          <p className="text-white/90 leading-7">
            {message}
          </p>

          {/* BUTTON */}
          <button
            onClick={onClose}
            className="mt-7 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            OKAY
          </button>

        </div>
      </div>

      <style jsx>{`
        @keyframes popup {
          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-popup {
          animation: popup 0.3s ease;
        }
      `}</style>

    </div>
  );
}