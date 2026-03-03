import { describe, it, expect, vi } from "vitest";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TokenInput from "@/components/TokenInput";

describe("TokenInput", () => {
  it("renders label and input", () => {
    const { container } = render(
      <TokenInput accessToken="" setAccessToken={vi.fn()} />,
    );
    const scoped = within(container);
    expect(scoped.getByLabelText(/access token/i)).toBeInTheDocument();
    expect(scoped.getByPlaceholderText(/paste your spotify access token/i)).toBeInTheDocument();
  });

  it("shows initial access token value", () => {
    const { container } = render(
      <TokenInput accessToken="abc-123" setAccessToken={vi.fn()} />,
    );
    const input = within(container).getByRole("textbox");
    expect(input).toHaveValue("abc-123");
  });

  it("calls setAccessToken when user types", async () => {
    const user = userEvent.setup();
    const setAccessToken = vi.fn();
    const { container } = render(
      <TokenInput accessToken="" setAccessToken={setAccessToken} />,
    );
    const input = within(container).getByRole("textbox");
    await user.type(input, "x");
    expect(setAccessToken).toHaveBeenCalledWith("x");
  });

  it("associates hint with input via aria-describedby", () => {
    const { container } = render(
      <TokenInput accessToken="" setAccessToken={vi.fn()} />,
    );
    const input = within(container).getByRole("textbox");
    const hint = within(container).getByText(/get a token from the spotify developer dashboard/i);
    expect(input).toHaveAttribute("aria-describedby", "token-hint");
    expect(hint).toHaveAttribute("id", "token-hint");
  });
});
