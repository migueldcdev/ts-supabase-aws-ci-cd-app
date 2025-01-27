import { render, screen } from "@testing-library/react";

import { Login } from ".";

test("renders login form", () => {
  render(<Login />);

  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});
