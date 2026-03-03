"use client";

import { useState } from "react";
import Image from "next/image";
import type { SpotifyTrack } from "@/lib/spotify";
import AudioPlayer from "../AudioPlayer";
import { useTheme } from "@/app/providers";

type TrackResultsProps = {
  tracks: SpotifyTrack[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

export default function TrackResults({
  tracks,
  isLoading,
  isError,
  error,
}: TrackResultsProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const transitionClass = "transition-colors duration-300 ease-in-out";

  if (isLoading) {
    return (
      <p
        className={`text-sm ${transitionClass} ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
        aria-live="polite"
      >
        Loading…
      </p>
    );
  }

  if (isError) {
    return (
      <p
        className={`text-sm ${transitionClass} ${isDark ? "text-red-400" : "text-red-600"}`}
        role="alert"
      >
        {error instanceof Error ? error.message : "Search failed"}
      </p>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <p
        className={`text-sm ${transitionClass} ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
        aria-live="polite"
      >
        No tracks found.
      </p>
    );
  }

  const cardClass = isDark
    ? "rounded-xl border border-zinc-600 bg-zinc-800 p-3 shadow-none transition-colors duration-300 ease-in-out hover:border-zinc-500 hover:bg-zinc-700 sm:p-4"
    : "rounded-xl border border-zinc-200 bg-white p-3 shadow-md transition-colors duration-300 ease-in-out hover:border-zinc-300 hover:bg-zinc-50 sm:p-4";
  const imagePlaceholderClass = isDark
    ? "bg-zinc-700 transition-colors duration-300 ease-in-out"
    : "bg-zinc-100 transition-colors duration-300 ease-in-out";
  const titleClass = isDark
    ? "text-zinc-100 transition-colors duration-300 ease-in-out"
    : "text-zinc-900 transition-colors duration-300 ease-in-out";
  const artistClass = isDark
    ? "text-zinc-400 transition-colors duration-300 ease-in-out"
    : "text-zinc-600 transition-colors duration-300 ease-in-out";
  const sampleClass = isDark
    ? "text-zinc-500 transition-colors duration-300 ease-in-out"
    : "text-zinc-500 transition-colors duration-300 ease-in-out";

  return (
    <ul
      className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Search results"
    >
      {tracks.map((track) => (
        <li key={track.id} className={cardClass}>
          <div
            className={`aspect-square w-full overflow-hidden rounded-lg ${imagePlaceholderClass}`}
          >
            {track.album.images?.[0]?.url ? (
              <Image
                src={track.album.images[0].url}
                alt=""
                width={200}
                height={200}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <span
                className={`flex h-full items-center justify-center text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
              >
                No image
              </span>
            )}
          </div>
          <p
            className={`mt-2 font-medium truncate text-sm sm:text-base ${titleClass}`}
            title={track.name}
          >
            {track.name}
          </p>
          <p className={`text-xs truncate sm:text-sm ${artistClass}`}>
            {track.artists[0]?.name ?? "—"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            {track.preview_url ? (
              <AudioPlayer
                url={track.preview_url}
                playerId={track.id}
                playingId={playingId}
                onStartPlaying={setPlayingId}
              />
            ) : (
              <>
                <AudioPlayer
                  url="/sample.m4a"
                  playerId={`${track.id}-sample`}
                  playingId={playingId}
                  onStartPlaying={setPlayingId}
                />
                <span className={`text-xs ${sampleClass}`}>
                  (sample — preview unavailable)
                </span>
                {track.external_urls?.spotify && (
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1DB954] underline hover:text-[#1ed760] min-h-[44px] min-w-[44px] inline-flex items-center"
                  >
                    Open in Spotify
                  </a>
                )}
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
