import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer from "@/components/AudioPlayer";

describe("AudioPlayer", () => {
  const mockPlay = vi.fn();
  const mockPause = vi.fn();
  const mockAddEventListener = vi.fn();
  const mockRemoveEventListener = vi.fn();

  beforeEach(() => {
    vi.stubGlobal(
      "Audio",
      class MockAudio {
        play = mockPlay;
        pause = mockPause;
        addEventListener = mockAddEventListener;
        removeEventListener = mockRemoveEventListener;
        _src = "";
        get src() {
          return this._src;
        }
        set src(v: string) {
          this._src = v;
        }
      },
    );
  });

  it("renders Play button initially", () => {
    render(<AudioPlayer url="https://example.com/preview.mp3" />);
    expect(
      screen.getByRole("button", { name: /play preview/i }),
    ).toBeInTheDocument();
  });

  it("toggles to Pause and calls play on first click", async () => {
    render(<AudioPlayer url="https://example.com/preview.mp3" />);
    const buttons = screen.getAllByRole("button", { name: /play preview/i });
    fireEvent.click(buttons[0]);
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    expect(mockPlay).toHaveBeenCalled();
  });

  it("cleanup removes ended listener", () => {
    const { unmount } = render(
      <AudioPlayer url="https://example.com/preview.mp3" />,
    );
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "ended",
      expect.any(Function),
    );
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "ended",
      expect.any(Function),
    );
  });
});
