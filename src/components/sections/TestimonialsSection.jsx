import React from 'react';
import { testimonials } from '../../data/testimonialsData';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-slate-800"> {/* Section remains white */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-slate-100">Trusted by Businesses Like Yours</h2>
        <p className="text-center text-lg text-gray-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">Hear what our satisfied clients have to say about their experience with SoftSell.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-8 rounded-xl shadow-lg flex flex-col"> {/* Cards are slate-50 */}
              <svg className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.46 5.372a.75.75 0 00-1.213-.806L7.08 7.586A3.25 3.25 0 004.5 10.25v.5A2.25 2.25 0 006.75 13H8V9.75A2.25 2.25 0 0110.25 7.5h.21zM15.46 5.372a.75.75 0 00-1.213-.806L12.08 7.586A3.25 3.25 0 009.5 10.25v.5A2.25 2.25 0 0011.75 13H13V9.75A2.25 2.25 0 0115.25 7.5h.21z"></path>
              </svg>
              <p className="text-gray-700 dark:text-slate-300 italic mb-6 flex-grow">"{testimonial.text}"</p> {/* Slightly darker testimonial text */}
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-slate-100">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;