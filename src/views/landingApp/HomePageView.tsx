
export default function HomePageView() {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full"
      style={{ backgroundImage: "url('/deporte.webp')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

    </div>
  );
}
