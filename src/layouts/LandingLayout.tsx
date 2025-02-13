import Footer from "../components/Footer";
import HomePageView from "../views/landingApp/HomePageView";

export default function LandingLayout() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col"
      style={{ backgroundImage: "url('/deporte.webp')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Contenido principal (puedes agregar más contenido aquí) */}
      <div className="flex-grow relative z-10">
       <HomePageView />
      </div>

      {/* Footer al pie de página */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}