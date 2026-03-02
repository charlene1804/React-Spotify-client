import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeClient from "@/app/home-client";
import { Providers } from "@/app/providers";

describe("HomeClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("shows token hint when no token", () => {
    render(
      <Providers>
        <HomeClient />
      </Providers>
    );
    expect(
      screen.getByText(/insert an access token/i)
    ).toBeInTheDocument();
  });

  it("shows search and token inputs", () => {
    render(
      <Providers>
        <HomeClient />
      </Providers>
    );
    expect(screen.getByLabelText(/access token/i)).toBeInTheDocument();
    const tokenInputs = screen.getAllByPlaceholderText(/paste your spotify access token/i);
    expect(tokenInputs[0]).toBeInTheDocument();
  });

  it("shows loading then tracks when token and search are entered", async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        tracks: {
          items: [
            {
              id: "1",
              name: "Test Track",
              artists: [{ name: "Test Artist" }],
              album: { images: [{ url: "https://example.com/1.jpg", width: 200, height: 200 }] },
              preview_url: null,
            },
          ],
        },
      }),
    } as Response);

    const user = userEvent.setup();
    render(
      <Providers>
        <HomeClient />
      </Providers>
    );

    const tokenInputs = screen.getAllByPlaceholderText(/paste your spotify access token/i);
    await user.type(tokenInputs[0], "fake-token");

    const searchInputs = screen.getAllByPlaceholderText(/search for a track/i);
    await user.type(searchInputs[0], "test");

    expect(await screen.findByText("Test Track")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });
});
