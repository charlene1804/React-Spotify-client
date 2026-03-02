"use client";

import { useRef, useState, useEffect } from "react";

type AudioPlayerProps = { url: string };

function useAudio(url: string) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<InstanceType<typeof Audio> | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [url]);

  const toggle = () => setPlaying((p) => !p);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play();
    else audio.pause();
  }, [playing]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [url]);

  return [playing, toggle] as const;
}

export default function AudioPlayer({ url }: AudioPlayerProps) {
  const [playing, toggle] = useAudio(url);

  return (
    <button
      type="button"
      onClick={() => toggle()}
      className="inline-flex items-center gap-1.5 rounded bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
      aria-label={playing ? "Pause" : "Play preview"}
    >
      <span aria-hidden>{playing ? "Pause" : "Play"}</span>
    </button>
  );
}
