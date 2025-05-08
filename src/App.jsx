import { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown, Send, X, MessageSquare } from 'lucide-react';

// Mock testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechVision",
    text: "SoftSell helped us recover over $50,000 from unused licenses. Their valuation was fair and the payment was processed within 48 hours."
  },
  {
    name: "Michael Chen",
    role: "IT Director",
    company: "Global Systems Inc.",
    text: "The process was incredibly smooth. I uploaded our excess licenses and had cash in our account by the end of the week. Highly recommended!"
  },
  {
    name: "Alex Rodriguez",
    role: "Procurement Manager",
    company: "Innovate Solutions",
    text: "Dealing with SoftSell was a breeze. Their team is professional, responsive, and transparent. We'll definitely use them again for future license divestment."
  }
];

// Mock FAQ data for the chat
const faqData = [
  {
    question: "How do I sell my license?",
    answer: "Simply fill out our contact form with your license details or upload them if there's an option. We'll evaluate them within 24 hours and provide you with a competitive offer."
  },
  {
    question: "What types of software licenses do you buy?",
    answer: "We purchase a wide range of enterprise software licenses including Microsoft, Adobe, Oracle, SAP, Autodesk, and many others. If you're unsure, just ask by detailing it in the contact form, and we'll let you know."
  },
  {
    question: "How long does the process take?",
    answer: "From submission to payment, our process typically takes 2-5 business days. The evaluation is completed within 24 hours, and once you accept our offer, payment is processed within 1-3 business days."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We employ bank-level encryption and security protocols for any data submitted. Your license information is only used for valuation purposes and is never shared with unauthorized parties."
  },
  {
    question: "What if my license type isn't listed?",
    answer: "No problem! Please select 'Other' in the license type dropdown on our contact form and provide details in the message. We'll assess it and get back to you."
  },
  {
    question: "Do you buy licenses in small quantities?",
    answer: "Yes, we evaluate licenses of all quantities, from single licenses to large bulk volumes. Feel free to submit whatever you have."
  }
];

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! How can I help you with selling your software licenses today? You can ask about our process, license types, or security.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Effect to apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Optional: Store preference in localStorage
    // localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Optional: Load dark mode preference from localStorage on initial load
  // useEffect(() => {
  //   const savedMode = localStorage.getItem('darkMode');
  //   if (savedMode) {
  //     setDarkMode(JSON.parse(savedMode));
  //   }
  // }, []);


  // Handle chat submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    
    const userQuery = inputMessage.toLowerCase().trim();
    let matchedFaq = null;

    // More robust FAQ matching
    for (const faq of faqData) {
        const faqQuestionLower = faq.question.toLowerCase();
        // Check for direct match or if user query is part of FAQ question or vice-versa (simplified)
        if (faqQuestionLower.includes(userQuery) || userQuery.includes(faqQuestionLower.replace(/how do i |what is |what types of |is my |how long does |do you /gi, "").replace(/\?$/,"").trim())) {
            matchedFaq = faq;
            break;
        }
        // Check keywords
        const keywords = faqQuestionLower.replace(/how do i |what is |what types of |is my |how long does |do you /gi, "").replace(/\?$/,"").trim().split(" ");
        if(keywords.some(keyword => userQuery.includes(keyword) && keyword.length > 3)){
            matchedFaq = faq;
            break;
        }
    }
    
    setInputMessage(''); // Clear input after sending

    setTimeout(() => {
      if (matchedFaq) {
        setMessages(prev => [...prev, { role: 'assistant', content: matchedFaq.answer }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "I'm sorry, I couldn't find a direct answer to that. Could you try rephrasing, or ask about how to sell licenses, types of licenses we buy, our process timeline, or data security measures?" 
        }]);
      }
    }, 700); // Simulate typing delay
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.licenseType) newErrors.licenseType = "Please select a license type";
    // Message is optional, so no validation for it unless required.
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData); // Log data for now
      setFormSubmitted(true);
      setFormData({ name: '', email: '', company: '', licenseType: '', message: '' });
      setErrors({}); // Clear errors on successful submission
      setTimeout(() => setFormSubmitted(false), 5000); // Hide success message after 5s
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Scroll chat to bottom
  useEffect(() => {
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 font-sans`}>
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            {/* Placeholder Logo SVG */}
            <svg className="h-8 w-auto text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 11.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L13.4142 14L17.7071 18.2929C18.0976 18.6834 18.0976 19.3166 17.7071 19.7071C17.3166 20.0976 16.6834 20.0976 16.2929 19.7071L12 15.4142L7.70711 19.7071C7.31658 20.0976 6.68342 20.0976 6.29289 19.7071C5.90237 19.3166 5.90237 18.6834 6.29289 18.2929L10.5858 14L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L11 11.5858V7H13V11.5858Z" />
            </svg>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Soft<span className="text-gray-800 dark:text-white">Sell</span></span>
          </a>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden md:flex space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">How It Works</a>
              <a href="#why-choose-us" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Why Us</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">Contact</a>
            </nav>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600 dark:text-gray-300" />}
            </button>
            {/* Mobile Menu Button (Optional, can be added later) */}
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 py-24 md:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {/* Decorative background pattern */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="heroPattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="scale(2) rotate(45)"><rect width="40" height="40" fill="none"/><path d="M20 0L0 20L20 40L40 20z" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100%" height="100%" fill="url(#heroPattern)"/></svg>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Unlock Value from Your Unused Software Licenses
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-10">
                SoftSell provides a fast, secure, and profitable way for businesses to sell their surplus software licenses. Get fair valuations and quick payments.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <a href="#contact" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl text-lg transform hover:scale-105">
                  Sell My Licenses
                </a>
                <a href="#how-it-works" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-all text-lg transform hover:scale-105">
                  Learn How
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">Simple Steps to Cash In</h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">Our streamlined process makes selling your surplus software licenses quick and easy.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                        { title: "Submit Your Licenses", description: "Fill out our secure online form with details of your surplus software licenses. It's quick and easy.", icon: <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> },
                        { title: "Receive Our Offer", description: "Our experts evaluate your licenses and provide a competitive, no-obligation quote within 24 business hours.", icon: <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
                        { title: "Get Paid Fast", description: "Once you accept our offer, we process your payment quickly. Funds are typically in your account within 1-3 business days.", icon: <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> }
                    ].map((step, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-200 dark:ring-blue-700">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">Why Partner with SoftSell?</h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">We provide a trusted, efficient, and rewarding solution for your unused software assets.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Fast Turnaround", description: "Valuations in 24 hours, payment within 1-3 days of offer acceptance.", icon: <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
                        { title: "Top Market Value", description: "Our extensive network ensures you get highly competitive offers for your licenses.", icon: <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
                        { title: "Secure & Confidential", description: "We use bank-grade security for all transactions and data handling. Your privacy is paramount.", icon: <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> },
                        { title: "Expert Support", description: "Our knowledgeable team guides you through every step, ensuring a smooth and transparent process.", icon: <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg> }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-opacity-20 dark:bg-opacity-20 rounded-full flex items-center justify-center 
                                ${index === 0 ? 'bg-green-100 dark:bg-green-900' : index === 1 ? 'bg-blue-100 dark:bg-blue-900' : index === 2 ? 'bg-purple-100 dark:bg-purple-900' : 'bg-yellow-100 dark:bg-yellow-900'}">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800 dark:text-white">Trusted by Businesses Like Yours</h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">Hear what our satisfied clients have to say about their experience with SoftSell.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-8 rounded-xl shadow-lg flex flex-col">
                            <svg className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.46 5.372a.75.75 0 00-1.213-.806L7.08 7.586A3.25 3.25 0 004.5 10.25v.5A2.25 2.25 0 006.75 13H8V9.75A2.25 2.25 0 0110.25 7.5h.21zM15.46 5.372a.75.75 0 00-1.213-.806L12.08 7.586A3.25 3.25 0 009.5 10.25v.5A2.25 2.25 0 0011.75 13H13V9.75A2.25 2.25 0 0115.25 7.5h.21z"></path>
                            </svg>
                            <p className="text-gray-600 dark:text-gray-300 italic mb-6 flex-grow">"{testimonial.text}"</p>
                            <div className="flex items-center mt-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4">
                                    {testimonial.name.split(" ").map(n=>n[0]).join("")}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Ready to Sell Your Licenses?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">Fill out the form below to get a fast, no-obligation quote from our team.</p>
            </div>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl">
              {formSubmitted && (
                <div className="bg-green-100 dark:bg-green-700 border-l-4 border-green-500 dark:border-green-400 text-green-700 dark:text-green-100 p-4 mb-6 rounded-md" role="alert">
                  <p className="font-medium">Success! Your quote request has been submitted.</p>
                  <p>We'll contact you within 24 business hours. Thank you!</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'}`}
                    placeholder="e.g., Jane Doe" />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'}`}
                    placeholder="you@company.com" />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.company ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'}`}
                    placeholder="e.g., Acme Corp" />
                  {errors.company && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.company}</p>}
                </div>
                <div>
                  <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">License Type</label>
                  <div className="relative">
                    <select id="licenseType" name="licenseType" value={formData.licenseType} onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-md appearance-none focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.licenseType ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'}`}>
                      <option value="">-- Select License Type --</option>
                      <option value="microsoft">Microsoft (Office, Windows Server, SQL Server, etc.)</option>
                      <option value="adobe">Adobe (Creative Cloud, Acrobat, etc.)</option>
                      <option value="oracle">Oracle (Database, Middleware, etc.)</option>
                      <option value="sap">SAP</option>
                      <option value="autodesk">Autodesk (AutoCAD, Revit, Maya, etc.)</option>
                      <option value="vmware">VMware</option>
                      <option value="other">Other (Please specify in message)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
                  </div>
                  {errors.licenseType && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.licenseType}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message (Optional)</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Provide details about your licenses (e.g., specific product, version, quantity, perpetual/subscription) or ask any questions." />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 text-lg">
                  Get My Free Quote
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                 <svg className="h-8 w-auto text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 11.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L13.4142 14L17.7071 18.2929C18.0976 18.6834 18.0976 19.3166 17.7071 19.7071C17.3166 20.0976 16.6834 20.0976 16.2929 19.7071L12 15.4142L7.70711 19.7071C7.31658 20.0976 6.68342 20.0976 6.29289 19.7071C5.90237 19.3166 5.90237 18.6834 6.29289 18.2929L10.5858 14L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L11 11.5858V7H13V11.5858Z" /></svg>
                <span className="text-2xl font-bold text-white">Soft<span className="text-blue-400">Sell</span></span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">Maximizing value from your surplus software assets with trust and efficiency.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a></li>
                <li><a href="#why-choose-us" className="hover:text-blue-400 transition-colors">Why Choose Us</a></li>
                <li><a href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Get a Quote</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
             <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">123 Software Lane, Tech City, TX 75001</li>
                <li className="text-gray-400">Email: <a href="mailto:info@softsell.com" className="hover:text-blue-400">info@softsell.com</a></li>
                <li className="text-gray-400">Phone: <a href="tel:+18001234567" className="hover:text-blue-400">(800) 123-4567</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SoftSell. All rights reserved. Fictional company for assignment purposes.
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Open chat"
          >
            <MessageSquare size={28} />
          </button>
        )}

        {chatOpen && (
          <div className="bg-white dark:bg-gray-800 w-80 sm:w-96 h-[28rem] sm:h-[32rem] rounded-lg shadow-2xl flex flex-col border border-gray-300 dark:border-gray-700">
            {/* Chat Header */}
            <div className="bg-blue-600 dark:bg-blue-700 text-white p-4 flex justify-between items-center rounded-t-lg">
              <h3 className="font-semibold text-lg">SoftSell Support</h3>
              <button onClick={() => setChatOpen(false)} className="text-blue-100 hover:text-white" aria-label="Close chat">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div id="chat-messages" className="flex-1 p-4 space-y-3 overflow-y-auto scrolling-touch">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] p-3 rounded-xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800" aria-label="Send message">
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}