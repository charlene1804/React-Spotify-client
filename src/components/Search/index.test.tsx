import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@/components/Search";

describe("Search", () => {
  it("renders the Spotify Track Search heading", () => {
    render(
      <Search
        accessToken=""
        searchTerm=""
        setSearchTerm={vi.fn()}
        isLoading={false}
      />,
    );
    expect(
      screen.getByRole("heading", { name: /spotify track search/i }),
    ).toBeInTheDocument();
  });

  it("shows insert token alert when access token is empty", () => {
    render(
      <Search
        accessToken=""
        searchTerm=""
        setSearchTerm={vi.fn()}
        isLoading={false}
      />,
    );
    expect(screen.getAllByText(/insert an access token/i).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/paste your spotify access token in the field above/i).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("shows insert token alert when access token is only whitespace", () => {
    render(
      <Search
        accessToken="   "
        searchTerm=""
        setSearchTerm={vi.fn()}
        isLoading={false}
      />,
    );
    expect(screen.getAllByText(/insert an access token/i).length).toBeGreaterThanOrEqual(1);
  });

  it("shows search form when access token is present", () => {
    const { container } = render(
      <Search
        accessToken="fake-token"
        searchTerm=""
        setSearchTerm={vi.fn()}
        isLoading={false}
      />,
    );
    const scoped = within(container);
    expect(scoped.getByLabelText(/search for a track/i)).toBeInTheDocument();
    expect(scoped.getByPlaceholderText(/search for a track/i)).toBeInTheDocument();
  });

  it("displays search term in input", () => {
    render(
      <Search
        accessToken="token"
        searchTerm="hello world"
        setSearchTerm={vi.fn()}
        isLoading={false}
      />,
    );
    expect(screen.getByDisplayValue("hello world")).toBeInTheDocument();
  });

  it("calls setSearchTerm when user types", async () => {
    const setSearchTerm = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Search
        accessToken="token"
        searchTerm=""
        setSearchTerm={setSearchTerm}
        isLoading={false}
      />,
    );
    const input = within(container).getByPlaceholderText(/search for a track/i);
    await user.type(input, "x");
    expect(setSearchTerm).toHaveBeenCalledWith("x");
  });

  it("shows loading message when isLoading is true", () => {
    render(
      <Search
        accessToken="token"
        searchTerm=""
        setSearchTerm={vi.fn()}
        isLoading={true}
      />,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("sets aria-busy on search input when loading", () => {
    const { container } = render(
      <Search
        accessToken="token"
        searchTerm=""
        setSearchTerm={vi.fn()}
        isLoading={true}
      />,
    );
    const input = within(container).getByPlaceholderText(/search for a track/i);
    expect(input).toHaveAttribute("aria-busy", "true");
  });
});
