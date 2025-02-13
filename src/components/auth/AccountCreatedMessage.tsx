import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function AccountCreatedMessage() {
  return (
    <div className="w-full max-w-md mx-auto mt-10 text-center">

      <div className="flex justify-center mb-6">
        <CheckCircleIcon className="h-20 w-20 text-green-500" /> {/* Ícono de éxito */}
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">
        ¡Cuenta creada satisfactoriamente!
      </h1>

      <p className="text-xl text-white mb-8">
        Revisa tu correo electrónico para confirmar tu cuenta y comenzar a disfrutar de nuestros servicios.
      </p>

      <Link
        to="/auth/login"
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline"
      >
        Ir al Inicio de Sesión
      </Link>
    </div>
  );
}