export type SpotifyTrack = {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string; width: number; height: number }>;
  };
  preview_url: string | null;
};

export async function fetchTracks(
  accessToken: string,
  query: string
): Promise<SpotifyTrack[]> {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&market=FR&limit=20&offset=0`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      typeof body?.error?.message === "string"
        ? body.error.message
        : response.statusText || "Search failed";
    throw new Error(message);
  }

  const data = await response.json();
  const items = data?.tracks?.items ?? [];
  return items;
}
