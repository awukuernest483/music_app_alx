import { X } from "lucide-react";
import React from "react";

interface PopupModalProps {
  selectedItem: any;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ selectedItem, onClose }) => {
  if (!selectedItem) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="items-center flex justify-between">
          <h2 className="text-xl font-bold mb-4">{selectedItem.name}</h2>

          <button
            onClick={onClose}
            className=" text-white bg-red-600 hover:bg-red-500 px-2 py-1 rounded-md text-sm"
          >
            <X size={20} />
          </button>
        </div>

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

        {selectedItem.artists && (
          <p className="mb-2">
            <span className="font-semibold">Artists:</span>{" "}
            {selectedItem.artists.map((a: any) => a.name).join(", ")}
          </p>
        )}

        {selectedItem.release_date && (
          <p className="mb-2">
            <span className="font-semibold">Release date:</span>{" "}
            {selectedItem.release_date}
          </p>
        )}

        {selectedItem.type && (
          <p className="text-sm text-gray-400 mb-2">
            Type: {selectedItem.type}
          </p>
        )}

        {selectedItem.type === "track" &&
          (selectedItem.preview_url ? (
            <div className="mt-4">
              <audio
                key={selectedItem.preview_url}
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
