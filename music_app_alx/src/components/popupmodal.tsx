import React from "react";

interface PopupModalProps {
  selectedItem: any;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  return (
    <div
      className="fixed inset-0 bg-white/30 bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose} // click backdrop to close
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-500 px-2 py-1 rounded-md text-sm"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">{selectedItem.name}</h2>

        {/* Image */}
        {(selectedItem.images?.[0]?.url ||
          selectedItem.album?.images?.[0]?.url) && (
          <img
            src={
              selectedItem.images?.[0]?.url ||
              selectedItem.album?.images?.[0]?.url
            }
            alt={selectedItem.name}
            className="rounded-lg mb-4 w-full object-cover"
          />
        )}

        {/* Artists */}
        {selectedItem.artists && (
          <p className="mb-2">
            <span className="font-semibold">Artists:</span>{" "}
            {selectedItem.artists.map((a: any) => a.name).join(", ")}
          </p>
        )}

        {/* Release Date */}
        {selectedItem.release_date && (
          <p className="mb-2">
            <span className="font-semibold">Release date:</span>{" "}
            {selectedItem.release_date}
          </p>
        )}

        {/* Type / Extra */}
        {selectedItem.type && (
          <p className="text-sm text-gray-400 mb-2">
            Type: {selectedItem.type}
          </p>
        )}

        {/* Track Preview */}
        {selectedItem.type === "track" &&
          (selectedItem.preview_url ? (
            <div className="mt-4">
              <audio
                key={selectedItem.preview_url} // ensures audio resets when switching tracks
                controls
                autoPlay
                src={selectedItem.preview_url}
                className="w-full"
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <p className="text-gray-400 mt-2">Preview not available</p>
          ))}

        {/* Open on Spotify button */}
        {selectedItem.external_urls?.spotify && (
          <a
            href={selectedItem.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-white font-semibold"
          >
            Open on Spotify
          </a>
        )}
      </div>
    </div>
  );
};

export default PopupModal;
