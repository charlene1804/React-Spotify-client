"use client";

import Image from "next/image";
import type { SpotifyTrack } from "@/lib/spotify";
import AudioPlayer from "./AudioPlayer";

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
  if (isLoading) {
    return (
      <p className="text-sm text-zinc-400" aria-live="polite">
        Loading…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-400" role="alert">
        {error instanceof Error ? error.message : "Search failed"}
      </p>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <p className="text-sm text-zinc-400" aria-live="polite">
        No tracks found.
      </p>
    );
  }

  return (
    <ul
      className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Search results"
    >
      {tracks.map((track) => (
        <li
          key={track.id}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-lg transition-[border-color,background-color] hover:border-zinc-700 hover:bg-zinc-800/80 sm:p-4"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-800">
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
              <span className="flex h-full items-center justify-center text-zinc-400 text-xs">
                No image
              </span>
            )}
          </div>
          <p className="mt-2 font-medium text-zinc-100 truncate text-sm sm:text-base" title={track.name}>
            {track.name}
          </p>
          <p className="text-xs text-zinc-500 truncate sm:text-sm">
            {track.artists[0]?.name ?? "—"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
            {track.preview_url ? (
              <AudioPlayer url={track.preview_url} />
            ) : (
              <>
                <AudioPlayer url="/sample.m4a" />
                <span className="text-xs text-zinc-500">(sample — preview unavailable)</span>
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
