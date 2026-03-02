import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchTracks } from "@/lib/spotify";

describe("fetchTracks", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("calls Spotify search API with token and query", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tracks: { items: [] },
      }),
    } as Response);

    await fetchTracks("token123", "hello");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.spotify.com/v1/search?q=hello&type=track&market=FR&limit=10&offset=0",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer token123",
        },
      }
    );
  });

  it("encodes query in URL", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tracks: { items: [] } }),
    } as Response);

    await fetchTracks("t", "a b & c");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("q=a%20b%20%26%20c"),
      expect.any(Object)
    );
  });

  it("returns tracks from response", async () => {
    const mockFetch = vi.mocked(fetch);
    const items = [
      {
        id: "1",
        name: "Track",
        artists: [{ name: "Artist" }],
        album: { images: [] },
        preview_url: null,
      },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ tracks: { items } }),
    } as Response);

    const result = await fetchTracks("t", "q");

    expect(result).toEqual(items);
  });

  it("throws with API error message when response not ok", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
      json: async () => ({
        error: { message: "Invalid access token" },
      }),
    } as Response);

    await expect(fetchTracks("bad", "q")).rejects.toThrow("Invalid access token");
  });

  it("throws with statusText when error body has no message", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Forbidden",
      json: async () => ({}),
    } as Response);

    await expect(fetchTracks("t", "q")).rejects.toThrow("Forbidden");
  });

  it("returns empty array when tracks is missing", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await fetchTracks("t", "q");

    expect(result).toEqual([]);
  });
});
