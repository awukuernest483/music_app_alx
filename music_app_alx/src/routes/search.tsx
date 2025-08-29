import React from "react";
import Musiccardsmall from "../components/musiccardsmall";
import Genrecard from "../components/genrecard";
import Searchbox from "../components/searchbox";
import AlbumCard from "../components/albumcard";
import { fetchProfileButtonHandler, spotifyLogin } from "../script";

const dummydetails = [
  {
    title: "Song Title",
  },
  {
    title: "Another Song Title",
  },
  {
    title: "Another Song Title",
  },
  {
    title: "Song Title",
  },
  {
    title: "Another Song Title",
  },
  {
    title: "Another Song Title",
  },
  {
    title: "Song Title",
  },
  {
    title: "Another Song Title",
  },
];

const dummygenres = [
  { title: "Pop" },
  { title: "Rock" },
  { title: "Jazz" },
  { title: "Classical" },
  { title: "Hip Hop" },
  { title: "Country" },
  { title: "Reggae" },
  { title: "Blues" },
];

const Search = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-6">
      <header className="w-full flex items-center justify-center px-6">
        <Searchbox />
      </header>

      <p className="text-white text-lg p-4 font-bold">Genres</p>
      <div
        className="flex flex-wrap p-4 gap-4 mb-4"
        onClick={() => {
          // fetchProfileButtonHandler();
        }}
      >
        {dummygenres.map((item, index) => (
          <Genrecard key={index} title={item.title} />
        ))}
      </div>

      <p className="text-white text-lg p-4 font-bold">Browse All</p>
      <div className="w-full  p-4 grid grid-cols-2 gap-4">
        {dummydetails.map((item, index) => (
          <Musiccardsmall
            key={index}
            title={item.title}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
