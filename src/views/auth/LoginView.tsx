import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserLoginForm } from "../../types";
import { authenticateUser } from "../../api/AuthAPI";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid"; // Importar íconos de Heroicons

export default function LoginView() {
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-8">Iniciar Sesión</h1>
      <p className="text-center text-gray-600 text-xl mb-10">
        Comienza a planear tus proyectos {''}
        <span className="text-yellow-500 font-bold">iniciando sesión en este formulario</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white shadow-2xl rounded-lg px-10 py-8 mb-6" // Shadow más significativo
        noValidate
      >
        {/* Campo Email */}
        <div className="mb-8">
          <label className="block text-gray-700 text-xl font-semibold mb-3" htmlFor="email">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <EnvelopeIcon className="h-6 w-6 text-gray-500" /> {/* Ícono de Email */}
            </div>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 pl-10 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Password */}
        <div className="mb-8">
          <label className="block text-gray-700 text-xl font-semibold mb-3">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="h-6 w-6 text-gray-500" /> {/* Ícono de Password */}
            </div>
            <input
              type="password"
              placeholder="Password de Registro"
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 pl-10 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        {/* Botón de Iniciar Sesión */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>

      {/* Enlaces adicionales */}
      <nav className="text-center space-y-4">
        <Link
          to="/auth/register"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          ¿No tienes cuenta? Crear una
        </Link>
        <br />
        <Link
          to="/auth/forgot-password"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          ¿Olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </div>
  );
}