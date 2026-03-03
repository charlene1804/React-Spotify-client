"use client";

import { useQuery } from "@tanstack/react-query";
import { useApp } from "./providers";
import { fetchTracks } from "@/lib/spotify";
import TokenInput from "@/components/TokenInput";
import Search from "@/components/Search";
import TrackResults from "@/components/TrackResults";

export default function HomeClient() {
  const { accessToken, setAccessToken, searchTerm, setSearchTerm } = useApp();
  const { data: tracks, isLoading, isError, error } = useQuery({
    queryKey: ["tracks", accessToken, searchTerm],
    queryFn: () => fetchTracks(accessToken, searchTerm),
    enabled: Boolean(accessToken.trim() && searchTerm.trim()),
  });

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-6 md:max-w-4xl md:mx-auto">
      <div className="space-y-4 sm:space-y-6">
        <TokenInput accessToken={accessToken} setAccessToken={setAccessToken} />
        <Search
          accessToken={accessToken}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
        />
        <p className="text-xs text-zinc-500 sm:text-sm">
          When Spotify does not provide a preview, the play button uses a sample
          clip so you can still try the audio player.
        </p>
        <TrackResults
          tracks={tracks}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
      </div>
    </main>
  );
}
