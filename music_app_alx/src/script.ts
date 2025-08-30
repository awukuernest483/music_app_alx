import { useSpotifyStore } from "./assets/store/store";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

// In-memory storage as fallback (for environments where localStorage isn't available)
let memoryStorage = {};

function setItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    memoryStorage[key] = value;
  }
}

function getItem(key) {
  try {
    return localStorage.getItem(key) || memoryStorage[key];
  } catch (e) {
    return memoryStorage[key];
  }
}

function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    delete memoryStorage[key];
  }
}

export async function spotifyLogin() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");

  if (error) {
    console.error("Spotify authorization error:", error);
    return;
  }

  if (!code) {
    console.log("No authorization code found, redirecting to Spotify...");
    await redirectToAuthCodeFlow(clientId);
  } else {
    try {
      console.log("Authorization code found, exchanging for access token...");
      const accessToken = await getAccessToken(clientId, code);
      console.log("Access token received:", accessToken);

      setItem("access_token", accessToken);

      const profile = await fetchProfile(accessToken);
      console.log("Profile fetched:", profile);

      // ✅ Save into Zustand
      useSpotifyStore.getState().setAccessToken(accessToken);
      useSpotifyStore.getState().setProfile(profile);

      populateUI(profile);

      window.history.replaceState({}, document.title, redirectUri);
      removeItem("verifier");
    } catch (error) {
      console.error("Error during token exchange:", error);
    }
  }
}

export async function redirectToAuthCodeFlow(clientId) {
  try {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    console.log("Generated verifier:", verifier);
    setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    console.log("Redirecting to:", authUrl);

    document.location = authUrl;
  } catch (error) {
    console.error("Error in redirect flow:", error);
    throw error;
  }
}

function generateCodeVerifier(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientId, code) {
  const verifier = getItem("verifier");

  if (!verifier) {
    throw new Error(
      "Code verifier not found. Please restart the authentication flow."
    );
  }

  console.log("Using verifier:", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier);

  console.log("Token request params:", Object.fromEntries(params));

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await result.json();
  console.log("Token response:", data);

  if (!result.ok || data.error) {
    throw new Error(
      `Token request failed: ${data.error || result.status} - ${
        data.error_description || result.statusText
      }`
    );
  }

  if (!data.access_token) {
    throw new Error("No access token received from Spotify");
  }

  return data.access_token;
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    const errorData = await result.json().catch(() => ({}));
    throw new Error(
      `Failed to fetch profile: ${result.status} - ${
        errorData.error?.message || result.statusText
      }`
    );
  }

  return await result.json();
}

function populateUI(profile) {
  const elements = {
    displayName: document.getElementById("displayName"),
    avatar: document.getElementById("avatar"),
    id: document.getElementById("id"),
    email: document.getElementById("email"),
    uri: document.getElementById("uri"),
    url: document.getElementById("url"),
    imgUrl: document.getElementById("imgUrl"),
  };

  // Check if elements exist before trying to populate them
  if (elements.displayName)
    elements.displayName.innerText = profile.display_name || "N/A";
  if (elements.id) elements.id.innerText = profile.id || "N/A";
  if (elements.email) elements.email.innerText = profile.email || "N/A";
  if (elements.uri) {
    elements.uri.innerText = profile.uri || "N/A";
    if (profile.external_urls?.spotify) {
      elements.uri.setAttribute("href", profile.external_urls.spotify);
    }
  }
  if (elements.url) {
    elements.url.innerText = profile.href || "N/A";
    if (profile.href) {
      elements.url.setAttribute("href", profile.href);
    }
  }
  if (elements.imgUrl) {
    elements.imgUrl.innerText =
      profile.images?.[0]?.url || "(no profile image)";
  }

  if (elements.avatar && profile.images?.[0]) {
    // Clear existing images
    elements.avatar.innerHTML = "";
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    profileImage.alt = "Profile image";
    elements.avatar.appendChild(profileImage);
  }
}

export async function fetchProfileButtonHandler() {
  try {
    const token = getItem("access_token");
    if (!token) {
      return;
    }

    console.log("Fetching profile with token:", token.substring(0, 20) + "...");
    const profile = await fetchProfile(token);
    console.log("Profile data:", profile);
    populateUI(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    // If token is invalid, clear it
    if (error.message.includes("401") || error.message.includes("invalid")) {
      removeItem("access_token");
    }
  }
}

// Utility function to check if user is logged in
export function isLoggedIn() {
  return !!getItem("access_token");
}

// Utility function to logout
export function logout() {
  removeItem("access_token");
  removeItem("verifier");
  console.log("Logged out successfully");
}
