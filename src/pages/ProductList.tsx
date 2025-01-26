import { useEffect, useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import { supabase } from "../supabase";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  const addProduct = async () => {
    const { data, error } = await supabase.from("products").insert([{ name, price }]).select();
    if (error) {
      console.error(error);
      alert("Error adding product: " + error.message);
    } else if (data) {
      setProducts((prev) => [...prev, ...data]);
      setName("");
      setPrice(0);
    }
  };

  const updateProduct = async () => {
    if (!editingProduct) return;
    const { error } = await supabase.from("products").update({ name, price }).eq("id", editingProduct.id);
    if (error) {
      console.error(error);
      alert("Error updating product: " + error.message);
    } else {
      setProducts(products.map((product) => (product.id === editingProduct.id ? { ...product, name, price } : product)));
      setEditingProduct(null);
      setName("");
      setPrice(0);
    }
  };

  const deleteProduct = async (id: number) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      <div className="flex space-x-4 mb-6">
        <Input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
        <Input type="number" placeholder="Price" value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} className="w-full" />
        {editingProduct ? (
          <Button onClick={updateProduct} className="bg-yellow-500 hover:bg-yellow-600">Update</Button>
        ) : (
          <Button onClick={addProduct} className="bg-green-500 hover:bg-green-600">Add</Button>
        )}
      </div>
      <table className="table-auto w-full border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">${product.price}</td>
              <td className="px-4 py-3 flex space-x-2 justify-center">
                <Button onClick={() => { setEditingProduct(product); setName(product.name); setPrice(product.price); }} className="bg-yellow-500 hover:bg-yellow-600">Edit</Button>
                <Button onClick={() => deleteProduct(product.id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
