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
        aria-describedby="token-hint"
      />
      <p id="token-hint" className="sr-only">
        Get a token from the Spotify Developer Dashboard; see README.
      </p>
    </div>
  );
}
