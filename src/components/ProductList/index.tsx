import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppContext } from "../../context"

type Inputs = {
  id?: number;
  name: string;
  price: number;
}

export const ProductList = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext()
  
  const [editingProduct, setEditingProduct] = useState(false);

  const {
    register,
    handleSubmit,    
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> =  editingProduct ? (data) => updateProduct(data) : (data) => addProduct(data)

  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4 mb-6">
        <input type="text" placeholder="Product Name" {...register("name")} className="w-full" />
        {errors.name && <p>Name is required</p>}
        <input type="number" placeholder="Price" {...register("price")} className="w-full" />
        {errors.price && <p>Price is required</p>}
        <button type="submit">{!editingProduct ? "Add" : "Update"}</button>
      </form>
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
                <button onClick={() => setEditingProduct(!editingProduct) } className="bg-yellow-500 hover:bg-yellow-600">Edit</button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

