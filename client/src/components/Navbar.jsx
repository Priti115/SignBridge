import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white sticky top-0 z-50">

      <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between">

        {/* Left Side */}
        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="SignBridge Logo"
            className="w-18 h-12 md:w-18 md:h-14 object-contain"
          />


        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-7">

          <button className="hidden md:block text-zinc-600 hover:text-black">

            Features

          </button>

          <button className="hidden md:block text-zinc-600 hover:text-black">

            About

          </button>

          <Link to="/join">

            <button className="gradient-button text-sm md:text-base px-4 py-2 md:px-5 md:py-2.5 font-medium">

              Join Room

            </button>

          </Link>

        </div>
      </div>
    </nav>
  );
}