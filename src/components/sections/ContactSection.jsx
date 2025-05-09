import React from 'react';
import { ChevronDown } from 'lucide-react';

const ContactSection = ({ formData, handleChange, handleSubmit, errors, formSubmitted }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950"> {/* Light gradient */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-slate-100">Ready to Sell Your Licenses?</h2>
          <p className="text-lg text-gray-600 dark:text-slate-400 mb-12">Fill out the form below to get a fast, no-obligation quote from our team.</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl dark:shadow-slate-700/50"> {/* Form on white bg */}
          {formSubmitted && (
            <div className="bg-green-100 dark:bg-green-700/80 border-l-4 border-green-500 dark:border-green-400 text-green-700 dark:text-green-100 p-4 mb-6 rounded-md">
              <p className="font-medium">Success! Your quote request has been submitted.</p>
              <p>We'll contact you within 24 business hours. Thank you!</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 ${errors.name ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'}`}
                placeholder="e.g., Jane Doe" />
              {errors.name && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
            </div>
            {/* ... other form fields similarly ensure light mode bg-white or bg-gray-50 for inputs if needed ... */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 ${errors.email ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'}`}
                placeholder="you@company.com" />
              {errors.email && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
            </div>
             <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Company Name</label>
              <input type="text" id="company" name="company" value={formData.company} onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 ${errors.company ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'}`}
                placeholder="e.g., Acme Corp" />
              {errors.company && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">License Type</label>
              <div className="relative">
                <select id="licenseType" name="licenseType" value={formData.licenseType} onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-md appearance-none focus:outline-none focus:ring-2 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 ${errors.licenseType ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-400'}`}>
                  <option value="">-- Select License Type --</option>
                  {/* ... options ... */}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none" size={20} />
              </div>
              {errors.licenseType && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.licenseType}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Message (Optional)</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-blue-400"
                placeholder="Provide details about your licenses (e.g., specific product, version, quantity, perpetual/subscription) or ask any questions." />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                           dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-offset-slate-800 dark:focus:ring-blue-400 text-lg">
              Get My Free Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;