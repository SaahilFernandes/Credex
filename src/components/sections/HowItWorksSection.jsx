import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    // ... (steps data remains the same)
     { title: "Submit Your Licenses", description: "Fill out our secure online form with details of your surplus software licenses. It's quick and easy.", icon: <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> },
    { title: "Receive Our Offer", description: "Our experts evaluate your licenses and provide a competitive, no-obligation quote within 24 business hours.", icon: <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
    { title: "Get Paid Fast", description: "Once you accept our offer, we process your payment quickly. Funds are typically in your account within 1-3 business days.", icon: <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-slate-800"> {/* Section remains white in light mode */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-slate-100">Simple Steps to Cash In</h2> {/* Darker heading text */}
        <p className="text-center text-lg text-gray-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">Our streamlined process makes selling your surplus software licenses quick and easy.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-700/60 p-8 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-slate-600/50 transition-shadow duration-300 flex flex-col items-center text-center"> {/* Card bg slightly different */}
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-200 dark:ring-blue-500/30">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-slate-100">{step.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;