import React from 'react';

const Logo = ({
  className = "h-8 w-auto text-blue-600 dark:text-blue-400",
  textClassName = "text-2xl font-bold text-blue-600 dark:text-blue-400",
  spanClassName = "text-gray-800 dark:text-slate-100" // Changed for better dark contrast
}) => {
  return (
    <a href="#" className="flex items-center space-x-2">
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 11.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L13.4142 14L17.7071 18.2929C18.0976 18.6834 18.0976 19.3166 17.7071 19.7071C17.3166 20.0976 16.6834 20.0976 16.2929 19.7071L12 15.4142L7.70711 19.7071C7.31658 20.0976 6.68342 20.0976 6.29289 19.7071C5.90237 19.3166 5.90237 18.6834 6.29289 18.2929L10.5858 14L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L11 11.5858V7H13V11.5858Z" />
      </svg>
      <span className={textClassName}>Soft<span className={spanClassName}>Sell</span></span>
    </a>
  );
};

export default Logo;