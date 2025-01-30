import { Login } from ".";
import { test, describe, vi } from "vitest";
import { render, screen } from "../../utils/test";
import { userEvent } from "@testing-library/user-event";

const context = {
  session: undefined,
  products: [],
  handleLogout: () => {},
  handleLogin: () => {},
  fetchProducts: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
};

describe("Login component test suite", () => {
  test("should accept user input and submmit data", async () => {
    const user = userEvent.setup();
    const handleLogin = vi.fn();
    render(<Login />, { ...context, handleLogin });

    const inputEmail = screen.getByPlaceholderText("Email");
    await user.type(inputEmail, "user@mail.com");

    const inputPassword = screen.getByPlaceholderText("Password");
    await user.type(inputPassword, "abc123");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await user.click(loginButton);

    expect(handleLogin).toHaveBeenCalledWith({
      email: "user@mail.com",
      password: "abc123",
    });
  });
});
