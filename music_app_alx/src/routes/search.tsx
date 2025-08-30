import { useEffect, useState } from "react";
import { useSpotifyStore } from "../assets/store/store";
import Genrecard from "../components/genrecard";
import Musiccardsmall from "../components/musiccardsmall";
import Searchbox from "../components/searchbox";
import { spotifyLogin, isLoggedIn } from "../script";
import Spinner from "../components/spinner";
import { X } from "lucide-react";
import PopupModal from "../components/popupmodal";

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
  const [categories, setCategories] = useState<any[]>([]);
  const [recommendedalbums, setRecommendedAlbums] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { accessToken } = useSpotifyStore();

  // NEW: selected item for popup
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    if (!isInitialized) {
      const initializeAuth = async () => {
        const params = new URLSearchParams(window.location.search);
        const hasCode = params.has("code");
        const alreadyLoggedIn = isLoggedIn();

        if (hasCode || !alreadyLoggedIn) {
          await spotifyLogin();
        }

        setIsInitialized(true);
      };

      initializeAuth();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!accessToken || !isInitialized) return;

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/browse/categories?locale=sv_SE&limit=10&offset=5",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data.categories?.items || []);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecommendedAlbums = async () => {
      try {
        const res = await fetch(
          "https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc&market=GH",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch albums");

        const data = await res.json();
        setRecommendedAlbums(data.albums || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
    fetchRecommendedAlbums();
  }, [accessToken, isInitialized]);

  // 🔍 SEARCH FUNCTION
  const handleSearch = async (query: string) => {
    if (!query || !accessToken) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track,album&limit=10`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      const combined = [
        ...(data.tracks?.items || []),
        ...(data.albums?.items || []),
      ];

      setSearchResults(combined);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  // Use a small wrapper so we can log and be sure the handler runs
  const handleItemClick = (item: any) => {
    console.log("handleItemClick fired:", item?.id ?? item?.name);
    setSelectedItem(item);
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6">
      {/* 🔍 Search box */}
      <header className="w-full flex items-center justify-center px-6">
        <Searchbox onSearch={handleSearch} />
      </header>

      {!isInitialized ? (
        <div className="text-white text-center p-4">
          <Spinner />
        </div>
      ) : (
        <div>
          {/* If searching → show results */}
          {searching ? (
            <div className="flex justify-center p-6">
              <Spinner />
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <div className="justify-between flex flex-row w-full items-center">
                <p className="text-white text-lg p-4 font-bold">
                  Search Results
                </p>
                <button
                  onClick={() => setSearchResults([])}
                  className="text-sm bg-gray-700 h-fit hover:bg-gray-600 text-white px-3 py-1 rounded-md flex gap-2 items-center "
                >
                  <X className="w-3 h-3" />
                  Clear results
                </button>
              </div>
              <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((item) => (
                  <Musiccardsmall
                    key={item.id ?? item.uri ?? item.name}
                    title={item.name}
                    imageUrl={
                      item.images?.[0]?.url ||
                      item.album?.images?.[0]?.url ||
                      ""
                    }
                    onClick={() => handleItemClick(item)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Categories */}
              <p className="text-white text-lg p-4 font-bold">Categories</p>
              <div className="flex flex-wrap p-4 gap-4 mb-4">
                {categories.length === 0 ? (
                  <p className="text-gray-400">
                    {!accessToken
                      ? "Please log in to view categories"
                      : "No categories available"}
                  </p>
                ) : (
                  categories.map((item) => (
                    <Musiccardsmall
                      key={item.id}
                      title={item.name}
                      imageUrl={item.icons?.[0]?.url || ""}
                      iscategory={true}
                      onClick={() => handleItemClick(item)}
                    />
                  ))
                )}
              </div>

              {/* Genres */}
              <p className="text-white text-lg p-4 font-bold">Genres</p>
              <div className="flex flex-wrap p-4 gap-4 mb-4">
                {dummygenres.map((item, index) => (
                  <Genrecard key={index} title={item.title} />
                ))}
              </div>

              {/* Recommended Albums */}
              <p className="text-white text-lg p-4 font-bold">
                Recommended Albums
              </p>
              <div className="w-full p-4 grid md:grid-cols-2 grid-cols-1 gap-4">
                {recommendedalbums.length === 0 ? (
                  <p className="text-gray-400">
                    {!accessToken
                      ? "Please log in to view recommendations"
                      : "No albums found"}
                  </p>
                ) : (
                  recommendedalbums.map((item) => (
                    <Musiccardsmall
                      key={item.id}
                      title={item.name}
                      imageUrl={item.images?.[0]?.url || ""}
                      onClick={() => handleItemClick(item)}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* POPUP MODAL */}
      {selectedItem && (
        <PopupModal
          selectedItem={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Search;
