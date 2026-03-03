import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/components/ThemeToggle";
import { Providers } from "@/app/providers";

describe("ThemeToggle", () => {
  it("renders a button", () => {
    const { container } = render(
      <Providers initialTheme="light">
        <ThemeToggle />
      </Providers>,
    );
    expect(within(container).getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label for switching to dark when theme is light", () => {
    const { container } = render(
      <Providers initialTheme="light">
        <ThemeToggle />
      </Providers>,
    );
    expect(
      within(container).getByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
  });

  it("has accessible label for switching to light when theme is dark", () => {
    const { container } = render(
      <Providers initialTheme="dark">
        <ThemeToggle />
      </Providers>,
    );
    expect(
      within(container).getByRole("button", { name: /switch to light theme/i }),
    ).toBeInTheDocument();
  });

  it("calls setTheme to dark when clicked in light mode", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Providers initialTheme="light">
        <ThemeToggle />
      </Providers>,
    );
    const scoped = within(container);
    const button = scoped.getByRole("button", { name: /switch to dark theme/i });
    await user.click(button);
    expect(scoped.getByRole("button", { name: /switch to light theme/i })).toBeInTheDocument();
  });

  it("calls setTheme to light when clicked in dark mode", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Providers initialTheme="dark">
        <ThemeToggle />
      </Providers>,
    );
    const scoped = within(container);
    const button = scoped.getByRole("button", { name: /switch to light theme/i });
    await user.click(button);
    expect(scoped.getByRole("button", { name: /switch to dark theme/i })).toBeInTheDocument();
  });
});
