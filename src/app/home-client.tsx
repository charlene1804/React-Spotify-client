"use client";

import { useQuery } from "@tanstack/react-query";
import { useApp } from "./providers";
import { fetchTracks } from "@/lib/spotify";

export default function HomeClient() {
  const { accessToken, setAccessToken, searchTerm, setSearchTerm } = useApp();
  const { data: tracks, isLoading, isError, error } = useQuery({
    queryKey: ["tracks", accessToken, searchTerm],
    queryFn: () => fetchTracks(accessToken, searchTerm),
    enabled: Boolean(accessToken.trim() && searchTerm.trim()),
  });

  return (
    <main className="min-h-screen p-6 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Spotify Track Search</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="token" className="block text-sm font-medium mb-1">
            Access token
          </label>
          <input
            id="token"
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder="Paste your Spotify access token"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a track"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        {!accessToken.trim() && (
          <p className="text-sm text-amber-700">
            Enter an access token above to enable search. See README for how to
            get one.
          </p>
        )}
        {isLoading && <p className="text-sm text-zinc-500">Loading…</p>}
        {isError && (
          <p className="text-sm text-red-600" role="alert">
            {error instanceof Error ? error.message : "Search failed"}
          </p>
        )}
        {tracks && tracks.length === 0 && (
          <p className="text-sm text-zinc-500">No tracks found.</p>
        )}
        {tracks && tracks.length > 0 && (
          <ul className="list-disc list-inside text-sm space-y-1">
            {tracks.map((t) => (
              <li key={t.id}>
                {t.name} – {t.artists[0]?.name ?? ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
