import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="py-10 lg:py-2 mx-auto w-full max-w-md">
          <Logo/>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      {<Footer />}
    </>
  );
}
