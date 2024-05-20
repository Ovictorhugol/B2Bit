import "../styles/index.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginServices } from "../Services";
import { UserInterface } from "../Interfaces";

import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const createUserFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email obrigatório")
    .email("Formato de email inválido"),
  password: z.string().min(1, "Senha com mínimo de 6 caracteres"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const Login = () => {
  const [errorLogin, setErrorLogin] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function submitUser(values: UserInterface) {
    //setOutput(JSON.stringify(values, null, 2));
    const data = await LoginServices.loginUser(values);
    if (data != null && data.tokens) {
      localStorage.setItem("token", data.tokens?.access);
      navigate("/Profile");
    } else if (data === null) {
      setErrorLogin(true);
    }
  }

  return (
    <main className="h-screen bg-zinc-100 flex flex-col items-center justify-center font-roboto">
      <div className="flex-col h-3/4  w-96 bg-white flex items-center justify-center shadow-2xl rounded-lg gap-6">
        <img src={logo} alt="Logo" className="h-20 " />
        <form
          className="flex flex-col gap-4 w-full max-w-xs"
          onSubmit={handleSubmit(submitUser)}
        >
          <div className="flex flex-col gap-1 ">
            <label htmlFor="" className="font-semibold">
              E-mail
            </label>
            <input
              type="email"
              className="border-none border-zinc-300 shadow-sm rounded h-12 px-3 bg-zinc-100 font-light "
              placeholder="@gmail.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="border-none border-zinc-300 shadow-sm rounded h-12 px-3 bg-zinc-100 font-light"
              placeholder="**************"
            />
            {errors.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-b2bit 
            rounded 
            font-semibold 
            text-white h-12
           hover:bg-blue-700"
          >
            Sing In
          </button>
        </form>
        {errorLogin && (
          <span className="text-red-600">Usuário e/ou senha incorreto(s)</span>
        )}
      </div>
    </main>
  );
};

export default Login;
