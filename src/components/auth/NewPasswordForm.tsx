import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePasswordWithToken } from "../../api/AuthAPI";
import { LockClosedIcon } from "@heroicons/react/24/solid"; // Importar ícono de Heroicons

type NewPasswordFormProps = {
  token: ConfirmToken['token'];
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();
  const initialValues: NewPasswordForm = {
    password: '',
    password_confirmation: '',
  };

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate('/auth/login');
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  const password = watch('password');

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="bg-white shadow-2xl rounded-lg px-10 py-8 mb-6" // Shadow más significativo
        noValidate
      >
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
                minLength: {
                  value: 8,
                  message: 'El Password debe ser mínimo de 8 caracteres',
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
          )}
        </div>

        {/* Campo Confirmar Password */}
        <div className="mb-8">
          <label className="block text-gray-700 text-xl font-semibold mb-3">Repetir Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LockClosedIcon className="h-6 w-6 text-gray-500" /> {/* Ícono de Confirmar Password */}
            </div>
            <input
              id="password_confirmation"
              type="password"
              placeholder="Repite Password de Registro"
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 pl-10 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline ${
                errors.password_confirmation ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password_confirmation", {
                required: "Repetir Password es obligatorio",
                validate: (value) => value === password || 'Los Passwords no son iguales',
              })}
            />
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-2">{errors.password_confirmation.message}</p>
          )}
        </div>

        {/* Botón de Establecer Password */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-xl py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Establecer Password
          </button>
        </div>
      </form>
    </div>
  );
}