import React, { useEffect, useRef } from 'react';
import { Send, X, MessageSquare, Loader2 } from 'lucide-react';

const ChatWidget = ({
  chatOpen,
  setChatOpen,
  messages,
  inputMessage,
  setInputMessage,
  handleChatSubmit,
  isChatLoading
}) => {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-400 dark:focus:ring-offset-slate-900"
          aria-label="Open chat"
        >
          <MessageSquare size={28} />
        </button>
      )}

      {chatOpen && (
        <div className="bg-white dark:bg-slate-800 w-80 sm:w-96 h-[28rem] sm:h-[32rem] rounded-lg shadow-2xl flex flex-col border border-gray-300 dark:border-slate-700">
          <div className="bg-blue-600 dark:bg-blue-700 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-semibold text-lg">SoftSell Support</h3>
            <button onClick={() => setChatOpen(false)} className="text-blue-100 hover:text-white dark:text-blue-200 dark:hover:text-blue-50" aria-label="Close chat">
              <X size={24} />
            </button>
          </div>

          <div ref={chatMessagesRef} id="chat-messages" className="flex-1 p-4 space-y-3 overflow-y-auto scrolling-touch dark:scrollbar-thin dark:scrollbar-thumb-slate-600 dark:scrollbar-track-slate-800">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-xl ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none dark:bg-blue-600'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-bl-none'
                  }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isChatLoading && (
              <div className="flex justify-start">
                 <div className="max-w-[75%] p-3 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-bl-none">
                    <Loader2 size={20} className="animate-spin text-blue-500 dark:text-blue-400" />
                 </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask a question..."
                disabled={isChatLoading}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-blue-400 text-sm"
              />
              <button type="submit"
                disabled={isChatLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
                           dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-400 dark:focus:ring-offset-slate-800 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;