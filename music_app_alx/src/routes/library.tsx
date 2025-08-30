import { useEffect, useState } from "react";
import { useSpotifyStore } from "../assets/store/store";
import AlbumCard from "../components/albumcard";
import Spinner from "../components/spinner";

const libraryitems = [
  { id: 1, title: "Playlists" },
  // { id: 2, title: "Artists" },
  // { id: 3, title: "Albums" },
];

const Library = () => {
  const { accessToken } = useSpotifyStore();
  const [activeTab, setActiveTab] = useState("Playlists");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        switch (activeTab) {
          case "Playlists":
            endpoint = "https://api.spotify.com/v1/me/playlists";
            break;
            // case "Artists":
            //   endpoint = "https://api.spotify.com/v1/me/following?type=artist";
            //   break;
            // case "Albums":
            //   endpoint = "https://api.spotify.com/v1/me/albums";
            break;
        }

        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch " + activeTab);

        const json = await res.json();

        // normalize results based on tab
        let results: any[] = [];
        if (activeTab === "Playlists") {
          results = json.items || [];
        } else if (activeTab === "Artists") {
          results = json.artists?.items || [];
        } else if (activeTab === "Albums") {
          results = json.items?.map((i: any) => i.album) || [];
        }

        setItems(results);
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, accessToken]);

  return (
    <div className="p-10">
      <h2 className="text-lg font-semibold text-white mb-4">Library</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {libraryitems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.title)}
            className={`px-4 py-2 rounded ${
              activeTab === item.title
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center p-6">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {items.length === 0 ? (
            <p className="col-span-4 text-gray-400">
              No {activeTab.toLowerCase()} found.
            </p>
          ) : (
            items.map((item: any) => (
              <AlbumCard
                key={item.id}
                title={item.name}
                imageUrl={
                  item.images?.[0]?.url ||
                  item.album?.images?.[0]?.url ||
                  item.icons?.[0]?.url ||
                  ""
                }
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
