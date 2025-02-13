import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRegistrationForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthAPI";
import AccountCreatedMessage from "../../components/auth/AccountCreatedMessage";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid"; // Importar íconos de Heroicons
import { useState } from "react";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    rol: '', // Valor inicial vacío
  };

  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation<{ message: string }, Error, UserRegistrationForm>({
    mutationFn: createAccount,
    onError: (error) => {
      console.error("Error en la mutación:", error);
      toast.error(error.message || "Ocurrió un error inesperado.");
    },
    onSuccess: (data) => {
      console.log("Cuenta creada correctamente:", data);
      toast.success(data.message); // Ahora `data` tiene el campo `message`
      reset();
      setIsAccountCreated(true);
    },
  });

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

  // Renderizado condicional
  if (isAccountCreated) {
    return <AccountCreatedMessage />; // Mostrar el mensaje de éxito
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center text-yellow-300 mb-8">Crear Cuenta</h1>
      <p className="text-center text-gray-600 text-xl mb-10">
        Llena el formulario para{" "}
        <span className="text-yellow-500 font-bold">crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white shadow-2xl rounded-lg px-10 py-8 mb-6"
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

        {/* Campo Nombre */}
        <div className="mb-8">
          <label className="block text-gray-700 text-xl font-semibold mb-3">Nombre</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <UserIcon className="h-6 w-6 text-gray-500" /> {/* Ícono de Nombre */}
            </div>
            <input
              type="text"
              placeholder="Nombre de Registro"
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 pl-10 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              {...register("name", {
                required: "El Nombre de usuario es obligatorio",
              })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
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
          <label className="block text-gray-700 text-xl font-semibold mb-3">
            Repetir Password
          </label>
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

        {/* Campo Rol */}
        <div className="mb-8">
          <label className="block text-gray-700 text-xl font-semibold mb-3">Rol</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <UserGroupIcon className="h-6 w-6 text-gray-500" /> {/* Ícono de Rol */}
            </div>
            <select
              className={`shadow appearance-none border-2 rounded w-full py-3 px-4 pl-10 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline ${
                errors.rol ? "border-red-500" : "border-gray-300"
              }`}
              {...register("rol", {
                required: "El Rol es obligatorio",
              })}
            >
              <option value="" disabled>Selecciona tu rol</option>
              <option value="jugador">Jugador</option>
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.rol && (
            <p className="text-red-500 text-sm mt-2">{errors.rol.message}</p>
          )}
        </div>

        {/* Botón de Registro */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Registrarme
          </button>
        </div>
      </form>

      {/* Enlaces adicionales */}
      <nav className="text-center space-y-4">
        <Link
          to="/auth/login"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          ¿Ya tienes cuenta? Iniciar sesión
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