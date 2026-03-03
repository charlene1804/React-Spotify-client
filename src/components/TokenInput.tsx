"use client";

type TokenInputProps = {
  accessToken: string;
  setAccessToken: (value: string) => void;
};

export default function TokenInput({
  accessToken,
  setAccessToken,
}: TokenInputProps) {
  return (
    <div>
      <label htmlFor="token" className="block text-sm font-medium mb-1.5 text-zinc-300">
        Access token
      </label>
      <input
        id="token"
        type="text"
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
        placeholder="Paste your Spotify access token"
        className="w-full min-h-[44px] rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-3 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954] sm:py-2 sm:text-sm"
        aria-describedby="token-hint"
      />
      <p id="token-hint" className="sr-only">
        Get a token from the Spotify Developer Dashboard; see README.
      </p>
    </div>
  );
}
