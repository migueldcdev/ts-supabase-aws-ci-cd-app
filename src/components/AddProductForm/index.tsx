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
    <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4 mb-6">
      <input
        type="text"
        placeholder="Product Name"
        {...register("name")}
        className="w-full"
      />
      {errors.name && <p>Name is required</p>}
      <input
        type="number"
        placeholder="Price"
        {...register("price")}
        className="w-full"
      />
      {errors.price && <p>Price is required</p>}
      <button type="submit">Add</button>
    </form>
  );
};
