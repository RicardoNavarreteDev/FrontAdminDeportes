import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { RequestConfirmationCodeForm } from "../../types";
import { toast } from "react-toastify";
import { requestConfirmationCode } from "../../api/AuthAPI";
import { EnvelopeIcon } from "@heroicons/react/24/solid"; // Importar ícono de Heroicons

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: '',
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-8">Solicitar Código de Confirmación</h1>
      <p className="text-center text-gray-600 text-xl mb-10">
        Coloca tu email para recibir {''}
        <span className="text-yellow-600 font-bold">un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
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
                required: "El Email de registro es obligatorio",
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

        {/* Botón de Enviar Código */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Enviar Código
          </button>
        </div>
      </form>

      {/* Enlaces adicionales */}
      <nav className="text-center space-y-4">
        <Link
          to="/auth/login"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <br />
        <Link
          to="/auth/forgot-password"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </div>
  );
}