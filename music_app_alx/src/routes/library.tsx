import { Album } from "lucide-react";
import React from "react";
import AlbumCard from "../components/albumcard";

const libraryitems = [
  { id: 1, title: "Playlists" },
  { id: 2, title: "Podcasts & Shows" },
  { id: 3, title: "Artists" },
  { id: 4, title: "Albums" },
  { id: 5, title: "Downloaded" },
];

const Library = () => {
  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold text-white mb-2">Library</h2>
      <div className="grid grid-cols-4 gap-4">
        {libraryitems.map((item) => (
          <AlbumCard key={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default Library;
