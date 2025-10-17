"use client";
import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";

const navLinks = ["Home", "Movies", "TV Shows", "My List"];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add background on scroll
  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900 bg-opacity-95 shadow-md"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img
            src="/zenithflix_logo.svg"
            alt="Streaming Logo"
            className="h-8 w-auto object-contain"
          />
          <nav className="hidden md:flex space-x-4 text-white font-medium">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-red-600 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Right section: Search, Notifications, Profile */}
        <div className="flex items-center space-x-4 text-white">
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <FaSearch />
          </button>
          <button className="p-2 rounded hover:bg-gray-700 transition-colors">
            <FaBell />
          </button>
          <img
            src="/user_profile_icon.svg"
            alt="User Profile"
            className="h-8 w-8 rounded-full object-cover cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
