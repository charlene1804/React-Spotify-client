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
        <h1 className="text-xl font-bold text-[#1DB954] sm:text-2xl">
          Spotify Track Search
        </h1>
      </div>
      {!hasToken && (
        <div
          className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 transition-colors duration-300 ease-in-out sm:p-4 dark:border-amber-500/40 dark:bg-amber-950/50 dark:text-amber-200"
          role="status"
        >
          <span aria-hidden className="shrink-0 text-amber-600 dark:text-amber-400">
            ⚠
          </span>
          <div className="min-w-0">
            <p className="font-medium">Insert an access token</p>
            <p className="mt-0.5 text-amber-800 dark:text-amber-200/90">
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
          <label htmlFor="search" className="block text-sm font-medium text-zinc-700 transition-colors duration-300 ease-in-out dark:text-zinc-300">
            Search for a track
          </label>
          <input
            id="search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a track"
            className="w-full min-h-[44px] rounded-lg border border-zinc-300 bg-white px-3 py-3 text-base text-zinc-900 placeholder:text-zinc-500 transition-colors duration-300 ease-in-out focus:border-[#1DB954] focus:outline-none focus:ring-1 focus:ring-[#1DB954] dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 sm:py-2 sm:text-sm"
            aria-busy={isLoading}
          />
          {isLoading && (
            <p className="text-sm text-zinc-500 dark:text-zinc-500" aria-live="polite">
              Loading…
            </p>
          )}
        </form>
      )}
    </div>
  );
}
