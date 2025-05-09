import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 dark:from-slate-900 dark:to-blue-900 py-24 md:py-32 text-white overflow-hidden"> {/* Slightly adjusted light gradient */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="heroPattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(2) rotate(45)"><rect width="40" height="40" fill="none"/><path d="M20 0L0 20L20 40L40 20z" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100%" height="100%" fill="url(#heroPattern)"/></svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white dark:text-transparent bg-clip-text bg-gradient-to-r dark:from-blue-300 dark:to-purple-400">
            Unlock Value from Your Unused Software Licenses
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 dark:text-slate-300 mb-10">
            SoftSell provides a fast, secure, and profitable way for businesses to sell their surplus software licenses. Get fair valuations and quick payments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="#contact"
               className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg transform hover:scale-105
                          dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400">
              Sell My Licenses
            </a>
            <a href="#how-it-works"
               className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold py-3 px-8 rounded-lg transition-all text-lg transform hover:scale-105
                          dark:border-slate-300 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:border-slate-100">
              Learn How
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;