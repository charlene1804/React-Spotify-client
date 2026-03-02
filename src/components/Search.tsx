"use client";

type SearchProps = {
  accessToken: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isLoading: boolean;
};

export default function Search({
  accessToken,
  searchTerm,
  setSearchTerm,
  isLoading,
}: SearchProps) {
  const hasToken = accessToken.trim().length > 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <span className="text-2xl font-bold text-[#1DB954]" aria-hidden>
          Spotify
        </span>
      </div>
      {!hasToken && (
        <div
          className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800"
          role="status"
        >
          <span aria-hidden className="shrink-0">
            ⚠
          </span>
          <div>
            <p className="font-medium">Insert an access token</p>
            <p className="mt-0.5 text-amber-700">
              To use search, paste your Spotify access token in the field above.
              See README for how to get one.
            </p>
          </div>
        </div>
      )}
      {hasToken && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <label htmlFor="search" className="block text-sm font-medium">
            Search for a track
          </label>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a track"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            aria-busy={isLoading}
          />
          {isLoading && (
            <p className="text-sm text-zinc-500" aria-live="polite">
              Loading…
            </p>
          )}
        </form>
      )}
    </div>
  );
}
