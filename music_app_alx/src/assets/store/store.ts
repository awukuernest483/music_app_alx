import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  uri: string;
  href: string;
  images?: { url: string }[];
  external_urls?: { spotify: string };
  [key: string]: any;
}

interface SpotifyState {
  accessToken: string | null;
  profile: SpotifyUser | null;
  setAccessToken: (token: string | null) => void;
  setProfile: (profile: SpotifyUser | null) => void;
  logout: () => void;
}

export const useSpotifyStore = create<SpotifyState>()(
  persist(
    (set) => ({
      accessToken: null,
      profile: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setProfile: (profile) => set({ profile }),
      logout: () => set({ accessToken: null, profile: null }),
    }),
    {
      name: "spotify-auth", // key in localStorage
    }
  )
);
