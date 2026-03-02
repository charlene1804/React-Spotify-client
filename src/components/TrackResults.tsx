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
      <p className="text-sm text-zinc-500" aria-live="polite">
        Loading…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600" role="alert">
        {error instanceof Error ? error.message : "Search failed"}
      </p>
    );
  }

  if (!tracks || tracks.length === 0) {
    return (
      <p className="text-sm text-zinc-500" aria-live="polite">
        No tracks found.
      </p>
    );
  }

  return (
    <ul
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="Search results"
    >
      {tracks.map((track) => (
        <li
          key={track.id}
          className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm"
        >
          <div className="aspect-square w-full overflow-hidden rounded bg-zinc-100">
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
          <p className="mt-2 font-medium text-zinc-900 truncate" title={track.name}>
            {track.name}
          </p>
          <p className="text-sm text-zinc-500 truncate">
            {track.artists[0]?.name ?? "—"}
          </p>
          {track.preview_url && (
            <div className="mt-2">
              <AudioPlayer url={track.preview_url} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
