import { Link } from 'react-router-dom';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ConfirmToken } from '../../types';
import { validateToken } from '../../api/AuthAPI';

type NewPasswordTokenProps = {
  token: ConfirmToken['token'];
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({ token, setToken, setIsValidToken }: NewPasswordTokenProps) {
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true);
    },
  });

  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken['token']) => mutate({ token });

  return (
    <div className="w-full max-w-md mx-auto mt-10">
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
          to="/auth/forgot-password"
          className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </div>
  );
}