import React from 'react';

const WhyChooseUsSection = () => {
  const features = [
    // ... (features data remains the same)
    { title: "Fast Turnaround", description: "Valuations in 24 hours, payment within 1-3 days.", icon: <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, colorClass: "bg-green-100 dark:bg-green-500/20" },
    { title: "Top Market Value", description: "Our extensive network ensures competitive offers.", icon: <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, colorClass: "bg-blue-100 dark:bg-blue-500/20" },
    { title: "Secure & Confidential", description: "Bank-grade security for all transactions.", icon: <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>, colorClass: "bg-purple-100 dark:bg-purple-500/20" },
    { title: "Expert Support", description: "Knowledgeable team to guide you smoothly.", icon: <svg className="w-8 h-8 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>, colorClass: "bg-yellow-100 dark:bg-yellow-500/20" }
  ];
  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-slate-100 dark:bg-slate-900"> {/* Changed to slate-100 for light */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-slate-100">Why Partner with SoftSell?</h2>
        <p className="text-center text-lg text-gray-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">We provide a trusted, efficient, and rewarding solution for your unused software assets.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-slate-700/50 transition-shadow duration-300 flex items-start space-x-4"> {/* Cards are white on slate-100 */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${feature.colorClass}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;