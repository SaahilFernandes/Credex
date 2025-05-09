import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-950 py-16"> {/* Lighter footer for light mode */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo 
              className="h-8 w-auto text-blue-600 dark:text-blue-400"
              textClassName="text-2xl font-bold text-blue-600 dark:text-blue-400" 
              spanClassName="text-gray-800 dark:text-slate-100" 
            />
            <p className="text-sm text-gray-600 dark:text-slate-500 max-w-xs mt-4">Maximizing value from your surplus software assets with trust and efficiency.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">How It Works</a></li>
              <li><a href="#why-choose-us" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">Get a Quote</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 dark:text-slate-500">123 Software Lane, Tech City, TX 75001</li>
              <li className="text-gray-600 dark:text-slate-500">Email: <a href="mailto:info@softsell.com" className="hover:text-blue-600 dark:hover:text-blue-300">info@softsell.com</a></li>
              <li className="text-gray-600 dark:text-slate-500">Phone: <a href="tel:+18001234567" className="hover:text-blue-600 dark:hover:text-blue-300">(800) 123-4567</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 dark:border-slate-800 pt-8 text-center text-sm text-gray-500 dark:text-slate-600">
          © {new Date().getFullYear()} SoftSell. All rights reserved. Fictional company for assignment purposes.
        </div>
      </div>
    </footer>
  );
};

export default Footer;