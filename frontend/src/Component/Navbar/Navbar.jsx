import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CONTACT US', path: '/contacts' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/">
            <h2 className="font-bold tracking-wide">
              <span className="text-pink-600">URBANEDGE</span>{' '}
              <span className="text-black">CONSTRUCTIONS</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold tracking-wide ${
                  location.pathname === link.path
                    ? 'text-pink-600'
                    : 'text-black hover:text-pink-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden border p-2 rounded cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <RxHamburgerMenu size={22} />
          </button>

        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-semibold ${
                  location.pathname === link.path
                    ? 'text-pink-600'
                    : 'text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;