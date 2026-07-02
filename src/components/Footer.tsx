import flag from "../assets/tt-flag-01-XL.png";
import logo from "../assets/logo_nav.png";

export default function Footer() {
  return (
    <footer className="relative flex h-20 items-center justify-center overflow-hidden bg-[#041533] px-5 py-2 lg:justify-start">
      {/* Background image only on lg+ */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: `url(${flag})` }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center">
        <img className="h-24" src={logo} alt="Unity Sports Club Logo" />

        <div className="flex flex-col text-white">
          <p className="font-display text-2xl tracking-wider">
            Unity Sports Club
          </p>

          <p className="text-sm">Building Community Through Sports & Culture</p>

          <p className="hidden font-mono text-yellow-500 md:block">
            One Community • One Unity
          </p>
        </div>
      </div>
    </footer>
  );
}
