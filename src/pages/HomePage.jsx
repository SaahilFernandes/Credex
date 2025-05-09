// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

import Navbar from '../components/Navbar';
import HeroSection from '../components/sections/HeroSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import WhyChooseUsSection from '../components/sections/WhyChooseUsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// console.log("Gemini API Key Loaded:", API_KEY ? 'Yes, value is: ' + API_KEY.substring(0,5) + "..." : "No/Empty");

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am SoftSell AI. How can I help you with selling your software licenses today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', company: '', licenseType: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

   useEffect(() => {
    // console.log("Dark mode state in useEffect:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      // console.log("Applied 'dark' class to HTML.");
    } else {
      document.documentElement.classList.remove('dark');
      // console.log("Removed 'dark' class from HTML.");
    }
  }, [darkMode]);

  // Optional: Load dark mode preference from localStorage on initial load
  // useEffect(() => {
  //   const savedMode = localStorage.getItem('darkMode');
  //   if (savedMode) {
  //     setDarkMode(JSON.parse(savedMode));
  //   }
  // }, []);

  const validateForm = () => { /* ... your validation logic ... */
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.licenseType) newErrors.licenseType = "Please select a license type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => { /* ... your submit logic ... */
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data Submitted:", formData);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', company: '', licenseType: '', message: '' });
      setErrors({});
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  const handleChange = (e) => { /* ... your change logic ... */
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Gemini Chat Model Setup
  let chatSession; // Define chatSession outside to be accessible by handleChatSubmit
  if (API_KEY) {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
         safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
      });
      chatSession = model.startChat({ history: [ /* ... your history ... */] });
  } else {
      console.warn("Gemini API Key is missing. Chatbot functionality will be limited or disabled.");
  }


  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatLoading || !chatSession) {
        if (!chatSession) {
            setMessages(prev => [...prev, {role: 'assistant', content: "Chat initialization failed. API key might be missing."}]);
        }
        return;
    }

    const userMsgContent = inputMessage;
    const userMessage = { role: 'user', content: userMsgContent };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsChatLoading(true);

    try {
      const result = await chatSession.sendMessage(userMsgContent);
      const response = result.response;
      const text = response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-slate-200 transition-colors duration-300 font-sans`}> {/* Changed light bg to slate-50 */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          formSubmitted={formSubmitted}
        />
      </main>
      <Footer />
      <ChatWidget
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleChatSubmit={handleChatSubmit}
        isChatLoading={isChatLoading}
      />
    </div>
  );
}
