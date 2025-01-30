import { useAppContext } from "../../context";
import { useState } from "react";

import { AddProductForm } from "../AddProductForm";
import { UpdateProductForm } from "../UpdateProductForm";

import { FaTrash } from "react-icons/fa";

type Inputs = {
  id: number;
  name: string;
  price: number;
};

export const ProductList = () => {
  const { products, deleteProduct, addProduct, updateProduct } =
    useAppContext();

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Inputs>({
    id: 0,
    name: "",
    price: 0,
  });

  function handleEdit(product: Inputs) {
    setIsEditing(!isEditing);
    setCurrentProduct(product);
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white ">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      {!isEditing ? (
        <AddProductForm addProduct={addProduct} />
      ) : (
        <UpdateProductForm
          updateProduct={updateProduct}
          product={currentProduct}
        />
      )}

      <table className="table-auto w-full border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-center">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product.id}
              className="border border-slate-200 hover:bg-gray-100 transition text-center"
            >
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">${product.price}</td>
              <td className="px-4 py-3 flex gap-6 justify-center">
                <button
                  onClick={() => handleEdit(product)}
                  className="py-1 px-2 rounded-lg border-2 border-slate-300 hover:bg-slate-200 hover:cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 hover:cursor-pointer"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
