import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    id: number;
    name: string;
    price: number;
}


export const UpdateProductForm = ({ updateProduct, product }: { updateProduct: (data: Inputs) => void, product: Inputs }) => {
      
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>({defaultValues: {...product}})
  
    const onSubmit: SubmitHandler<Inputs> = (data) => updateProduct({ ...data,  })
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-4 mb-6">
        <input type="text" placeholder="Product Name" {...register("name")} className="w-full" />
        {errors.name && <p>Name is required</p>}
        <input type="number" placeholder="Price" {...register("price")} className="w-full" />
        {errors.price && <p>Price is required</p>}
        <button type="submit">Update</button>
      </form>
    )
  }