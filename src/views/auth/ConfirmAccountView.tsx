import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { confirmAccount } from "../../api/AuthAPI";
import { ConfirmToken } from "../../types";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate('/auth/login');
    },
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken['token']) => {
    mutate({ token });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center text-yellow-600 mb-8">Confirma tu Cuenta</h1>
      <p className="text-center text-white text-xl mb-10">
        Ingresa el código que recibiste {''}
        <span className="text-yellow-600 font-bold">por email</span>
      </p>

      <form
        className="bg-white shadow-2xl rounded-lg px-10 py-8 mb-6" // Shadow más significativo
      >
        <label className="block text-gray-700 text-xl font-semibold mb-8 text-center">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField
              className={`w-12 h-12 p-3 rounded-lg border-2 text-center text-gray-700 text-lg focus:outline-none focus:shadow-outline ${
                !token ? "border-gray-300" : "border-fuchsia-500"
              }`}
            />
            <PinInputField
              className={`w-12 h-12 p-3 rounded-lg border-2 text-center text-gray-700 text-lg focus:outline-none focus:shadow-outline ${
                !token ? "border-gray-300" : "border-fuchsia-500"
              }`}
            />
            <PinInputField
              className={`w-12 h-12 p-3 rounded-lg border-2 text-center text-gray-700 text-lg focus:outline-none focus:shadow-outline ${
                !token ? "border-gray-300" : "border-fuchsia-500"
              }`}
            />
            <PinInputField
              className={`w-12 h-12 p-3 rounded-lg border-2 text-center text-gray-700 text-lg focus:outline-none focus:shadow-outline ${
                !token ? "border-gray-300" : "border-fuchsia-500"
              }`}
            />
            <PinInputField
              className={`w-12 h-12 p-3 rounded-lg border-2 text-center text-gray-700 text-lg focus:outline-none focus:shadow-outline ${
                !token ? "border-gray-300" : "border-fuchsia-500"
              }`}
            />
            <PinInputField
              className={`w-12 h-12 p-3 rounded-lg border-2 text-center text-gray-700 text-lg focus:outline-none focus:shadow-outline ${
                !token ? "border-gray-300" : "border-fuchsia-500"
              }`}
            />
          </PinInput>
        </div>
      </form>

      {/* Enlace para solicitar un nuevo código */}
      <nav className="text-center space-y-4">
        <Link
          to="/auth/request-code"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </div>
  );
}