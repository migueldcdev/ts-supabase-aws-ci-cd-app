import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  id: number;
  name: string;
  price: number;
};

type AddProductFormProps = {
  addProduct: (data: Inputs) => void;
};

export const AddProductForm = ({ addProduct }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => addProduct(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          {...register("name", { required: true })}
          className="w-full border-2 border-slate-300 rounded px-2"
        />

        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          className="w-full border-2 border-slate-300 rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-7 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
        >
          Add
        </button>
      </form>
      <div className="mb-4">
        {errors.name && <p className="text-red-400">Name is required</p>}
        {errors.price && <p className="text-red-400">Price is required</p>}
      </div>
    </>
  );
};
