import { useAppContext } from "../../context"
import { useState } from "react";

import { AddProductForm } from "../AddProductForm";
import { UpdateProductForm } from "../UpdateProductForm";

type Inputs = {
  id: number;
  name: string;
  price: number;
}

export const ProductList = () => {
  const { products, deleteProduct, addProduct, updateProduct } = useAppContext()

  const [isEditing, setIsEditing] = useState(false)
  const [ currentProduct, setCurrentProduct ] = useState<Inputs>({id: 0, name: "", price: 0})

  function handleEdit(product: Inputs) {
    setIsEditing(!isEditing)
    setCurrentProduct(product)
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      {!isEditing ?
        <AddProductForm addProduct={addProduct} />
        :
        <UpdateProductForm updateProduct={updateProduct} product={currentProduct}/>
      }
      
      <table className="table-auto w-full border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">${product.price}</td>
              <td className="px-4 py-3 flex space-x-2 justify-center">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 hover:bg-yellow-600">Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

