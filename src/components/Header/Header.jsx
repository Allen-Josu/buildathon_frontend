import { useState } from 'react'; // Import useState for handling menu toggle

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the menu on small screens

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  return (
    <div>
      <header className=" flex justify-between items-center p-4 border-b-2 border-gray-400 bg-[#27272a]">
        <h1 className="text-white text-2xl font-medium">
          <a
            href="/"
            className="text-gray-300 no-underline hover:text-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Edubuddy
          </a>
        </h1>

        {/* Mobile Hamburger Menu Icon */}
        <button
          onClick={handleMenuToggle}
          className="block lg:hidden text-white text-3xl"
        >
          &#9776;
        </button>

        {/* Navigation Menu */}
        <nav className={`lg:block ${isMenuOpen ? "block" : "hidden"} lg:flex`}>
          <ul className="flex flex-col lg:flex-row gap-6 lg:gap-24">
            <li>
              <a
                href="/notes"
                className="no-underline text-gray-300 hover:text-blue-800 font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Notes
              </a>
            </li>
            <li>
              <a
                href="/grade"
                className="no-underline text-gray-300 hover:text-blue-800 font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Grade Predictor
              </a>
            </li>
            <li>
              <a
                href="/model-question-generator"
                className="no-underline text-gray-300 hover:text-blue-800 font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Model Question Paper
              </a>
            </li>
            <li>
              <a
                href="/pyq"
                className="no-underline text-gray-300 hover:text-blue-800 font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                PYQ
              </a>
            </li>
            <li>
              <a
                href="/attendance"
                className="no-underline text-gray-300 hover:text-blue-800 font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Attendance Calculator
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="no-underline text-gray-300 hover:text-blue-800 font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                About
              </a>
            </li>
          </ul>
        </nav>

        {/* Sign In Button */}
        <button className="px-4 py-2 text-gray-300 font-medium text-lg border border-gray-300 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-800 hover:border-blue-800 transform hover:scale-105">
          Sign In
        </button>
      </header>
    </div>
  );
}
