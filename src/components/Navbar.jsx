import React from 'react';
import { Sun, Moon } from 'lucide-react';
import Logo from './Logo';

const Navbar = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-sm dark:shadow-slate-700/50 z-50"> {/* Slightly more opaque */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center space-x-2 sm:space-x-4">
          <nav className="hidden md:flex space-x-6">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">How It Works</a> {/* Slightly darker nav text */}
            <a href="#why-choose-us" className="text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Why Us</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">Contact</a>
          </nav>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;