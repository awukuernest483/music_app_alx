import { create } from "zustand";
import { spotifyLogin } from "../../script";

interface UserState {
  accessToken: string | null;
  profile: any | null;
  setAccessToken: (token: string) => void;
  setProfile: (profile: any) => void;
  login: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  profile: null,

  setAccessToken: (token) => set({ accessToken: token }),
  setProfile: (profile) => set({ profile }),

  login: async () => {
    const profile = await spotifyLogin();
    if (profile) {
      set({ profile });
    }
  },

  logout: () => {
    set({ accessToken: null, profile: null });
    localStorage.removeItem("access_token");
    localStorage.removeItem("verifier");
  },
}));
