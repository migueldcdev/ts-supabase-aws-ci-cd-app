import { useForm, SubmitHandler } from "react-hook-form";
import { useAppContext } from "../../context";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const { handleLogin } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => handleLogin(data);

  return (
    <div className="flex justify-center items-center mt-36">
      <div className="bg-white p-8 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border border-slate-400 rounded-md"
          />
          {errors.email && <p>Email required</p>}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border border-slate-400 rounded-md"
          />
          {errors.password && <p>Password required</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md hover:cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
