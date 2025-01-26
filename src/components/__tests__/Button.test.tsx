import { render, screen } from "@testing-library/react";

import Button from "../Button";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

test("renders the button and handles click", async () => {
  const mockOnClick = vi.fn();

  render(<Button onClick={mockOnClick}>Click me</Button>);

  const button = screen.getByText("Click me");
  await userEvent.click(button);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
