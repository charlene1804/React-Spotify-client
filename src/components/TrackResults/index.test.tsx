import { describe, it, expect, vi } from "vitest";
import { render, within } from "@testing-library/react";
import TrackResults from "@/components/TrackResults";
import { Providers } from "@/app/providers";
import type { SpotifyTrack } from "@/lib/spotify";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

function makeTrack(overrides: Partial<SpotifyTrack> = {}): SpotifyTrack {
  return {
    id: "tid-1",
    name: "Track One",
    artists: [{ name: "Artist A" }],
    album: { images: [{ url: "https://example.com/cover.jpg", width: 200, height: 200 }] },
    preview_url: "https://example.com/preview.mp3",
    ...overrides,
  };
}

function renderWithProviders(
  props: React.ComponentProps<typeof TrackResults>,
  initialTheme: "light" | "dark" = "light",
) {
  return render(
    <Providers initialTheme={initialTheme}>
      <TrackResults {...props} />
    </Providers>,
  );
}

describe("TrackResults", () => {
  it("shows loading message when isLoading is true", () => {
    const { container } = renderWithProviders({
      tracks: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });
    expect(within(container).getByText("Loading…")).toBeInTheDocument();
    expect(within(container).getByText("Loading…")).toHaveAttribute("aria-live", "polite");
  });

  it("shows error message when isError is true", () => {
    const { container } = renderWithProviders({
      tracks: undefined,
      isLoading: false,
      isError: true,
      error: new Error("Token expired"),
    });
    const alert = within(container).getByRole("alert");
    expect(alert).toHaveTextContent("Token expired");
  });

  it("shows generic error when isError is true and error is not an Error instance", () => {
    const { container } = renderWithProviders({
      tracks: undefined,
      isLoading: false,
      isError: true,
      error: null,
    });
    const alert = within(container).getByRole("alert");
    expect(alert).toHaveTextContent("Search failed");
  });

  it("shows no tracks message when tracks is undefined", () => {
    const { container } = renderWithProviders({
      tracks: undefined,
      isLoading: false,
      isError: false,
      error: null,
    });
    expect(within(container).getByText("No tracks found.")).toBeInTheDocument();
  });

  it("shows no tracks message when tracks is empty", () => {
    const { container } = renderWithProviders({
      tracks: [],
      isLoading: false,
      isError: false,
      error: null,
    });
    expect(within(container).getByText("No tracks found.")).toBeInTheDocument();
  });

  it("renders list with search results when tracks provided", () => {
    const tracks = [makeTrack()];
    const { container } = renderWithProviders({
      tracks,
      isLoading: false,
      isError: false,
      error: null,
    });
    const list = within(container).getByRole("list", { name: "Search results" });
    expect(list).toBeInTheDocument();
    expect(within(list).getByText("Track One")).toBeInTheDocument();
    expect(within(list).getByText("Artist A")).toBeInTheDocument();
  });

  it("renders track image when album has image", () => {
    const tracks = [makeTrack()];
    const { container } = renderWithProviders({
      tracks,
      isLoading: false,
      isError: false,
      error: null,
    });
    const img = container.querySelector('img[src="https://example.com/cover.jpg"]');
    expect(img).toBeInTheDocument();
  });

  it("renders No image when album has no image", () => {
    const tracks = [makeTrack({ album: { images: [] } })];
    const { container } = renderWithProviders({
      tracks,
      isLoading: false,
      isError: false,
      error: null,
    });
    expect(within(container).getByText("No image")).toBeInTheDocument();
  });

  it("renders play button when track has preview_url", () => {
    const tracks = [makeTrack({ preview_url: "https://example.com/preview.mp3" })];
    const { container } = renderWithProviders({
      tracks,
      isLoading: false,
      isError: false,
      error: null,
    });
    expect(within(container).getByRole("button", { name: /play preview/i })).toBeInTheDocument();
  });

  it("renders sample fallback and Open in Spotify link when no preview_url", () => {
    const tracks = [
      makeTrack({
        preview_url: null,
        external_urls: { spotify: "https://open.spotify.com/track/abc" },
      }),
    ];
    const { container } = renderWithProviders({
      tracks,
      isLoading: false,
      isError: false,
      error: null,
    });
    expect(within(container).getByText("(sample — preview unavailable)")).toBeInTheDocument();
    const link = within(container).getByRole("link", { name: "Open in Spotify" });
    expect(link).toHaveAttribute("href", "https://open.spotify.com/track/abc");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders artist dash when track has no artists", () => {
    const tracks = [makeTrack({ artists: [] })];
    const { container } = renderWithProviders({
      tracks,
      isLoading: false,
      isError: false,
      error: null,
    });
    expect(within(container).getByText("—")).toBeInTheDocument();
  });
});
