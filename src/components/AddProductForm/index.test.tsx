import { describe, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../utils/test";
import { AddProductForm } from ".";

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

describe("Add product form test suite", () => {
  test("should accept user input and submmit data", async () => {
    const user = userEvent.setup();
    const addProduct = vi.fn();
    render(<AddProductForm addProduct={addProduct} />, context);

    const inputProductName = screen.getByPlaceholderText("Product Name");
    await user.type(inputProductName, "Apple");

    const inputPrice = screen.getByPlaceholderText("Price");
    await user.type(inputPrice, "10");

    const submitButton = screen.getByRole("button", { name: "Add" });

    await user.click(submitButton);

    expect(addProduct).toHaveBeenCalledWith({ name: "Apple", price: "10" });
  });

  test("should validate user input", async () => {
    const user = userEvent.setup();
    const addProduct = vi.fn();
    render(<AddProductForm addProduct={addProduct} />, context);

    const inputProductName = screen.getByPlaceholderText("Product Name");
    await user.type(inputProductName, "Apple");

    const inputPrice = screen.getByPlaceholderText("Price");
    await user.type(inputPrice, "a");

    const submitButton = screen.getByRole("button", { name: "Add" });

    await user.click(submitButton);

    expect(addProduct).not.toHaveBeenCalled();
  });
});
