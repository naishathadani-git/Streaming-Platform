import React, { useEffect, useRef } from "react";
import { StreamingContent } from "../types/StreamingContent";
import useWatchHistory from "../hooks/useWatchHistory";

interface ContentModalProps {
  content: StreamingContent | null;
  isOpen: boolean;
  onClose: () => void;
  getProgress: (id: string) => number;
  updateProgress: (id: string, percent: number) => void;
}

const ContentModal: React.FC<ContentModalProps> = ({
  content,
  isOpen,
  onClose,
  getProgress,
  updateProgress,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  //MArk 60% watched
  //const { updateProgress, getProgress } = useWatchHistory();
  // useEffect(() => {
  //   if (content?.id) {
  //     updateProgress(content.id, 60);
  //   }
  // }, [content]);

  useEffect(() => {
    if (isOpen) {
      // Focus the close button when modal opens
      closeButtonRef.current?.focus();

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Handle escape key
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!content) return null;

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[1000] p-4 ${
        isOpen ? "flex" : "hidden"
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 bg-white bg-opacity-10 border-none rounded-full w-10 h-10 text-white text-2xl cursor-pointer flex items-center justify-center transition-colors duration-300 z-[1001] hover:bg-opacity-20 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2"
        >
          ×
        </button>

        <div className="p-8">
          <img
            src={content.thumbnailUrl}
            alt={`${content.title} thumbnail`}
            className="w-full h-72 md:h-80 object-cover rounded-lg mb-6"
          />

          <h1
            id="modal-title"
            className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight"
          >
            {content.title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-6 items-center md:flex-row md:items-center md:gap-4 flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-gray-300 text-base">
              <span className="text-yellow-400 font-semibold">
                ★ {content.rating}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-base">
              <span>{content.year}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-base">
              <span>{formatDuration(content.duration)}</span>
            </div>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {content.genre}
            </span>
          </div>

          <p
            id="modal-description"
            className="text-gray-300 leading-relaxed mb-6 text-base"
          >
            {content.description}
          </p>

          {content.cast && content.cast.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-3">Cast</h3>
              <div className="flex flex-wrap gap-2">
                {content.cast &&
                  content.cast.split(",").map((member, index) => (
                    <span
                      key={index}
                      className="bg-white bg-opacity-10 text-black px-4 py-2 rounded-full text-sm"
                    >
                      {member.trim()}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {/* Modal content here */}
          <button
            onClick={() => updateProgress(content.id, 60)} // ✅ test update
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Mark 60% Watched
          </button>
          {getProgress(content.id) > 0 && (
            <div className="mt-6">
              <div className="text-white text-base font-semibold mb-2">
                Watch Progress
              </div>
              <div className="w-full h-2 bg-white bg-opacity-20 rounded overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
                  style={{ width: `${getProgress(content.id)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;
