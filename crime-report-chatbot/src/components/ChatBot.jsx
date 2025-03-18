import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const crimeTypes = [
  'Robbery',
  'Assault',
  'Burglary',
  'Car Theft',
  'Vandalism',
  'Drug-related Crime',
  'Fraud',
  'Other'
];

const initialMessage = {
  text: "Welcome to the Nairobi Crime Reporter! I'm here to help you report criminal activities. How can I assist you today?",
  isBot: true,
  options: ["Report a crime", "Find nearest police station", "View recent reports"]
};

const ChatBot = ({ onReportSubmit }) => {
  const [messages, setMessages] = useState([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionClick = (option) => {
    const newMessages = [...messages, { text: option, isBot: false }];
    setMessages(newMessages);

    setTimeout(() => {
      let botResponse = {
        text: "",
        isBot: true,
        options: []
      };

      switch (option) {
        case "Report a crime":
          botResponse.text = "Please select the type of crime you'd like to report:";
          botResponse.options = crimeTypes;
          break;
        case "Find nearest police station":
          botResponse.text = "I'll help you locate the nearest police station. Please allow access to your location when prompted.";
          navigate('/police-stations');
          break;
        case "View recent reports":
          botResponse.text = "You can view recent reports in the Reports section.";
          navigate('/reports');
          break;
        case "Yes, submit report":
          botResponse.text = "I'll help you submit a formal report. Please use the form below to provide all the necessary details.";
          break;
        case "No, I have more details":
          botResponse.text = "Please provide any additional details about the incident.";
          break;
        default:
          if (crimeTypes.includes(option)) {
            botResponse.text = "Please provide more details about the incident. When and where did it occur?";
            onReportSubmit && onReportSubmit({ crimeType: option });
          } else {
            botResponse.text = "Thank you for providing that information. Would you like to submit a formal report now?";
            botResponse.options = ["Yes, submit report", "No, I have more details"];
          }
      }

      setMessages([...newMessages, botResponse]);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { text: inputValue, isBot: false }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      setMessages([...newMessages, {
        text: "Thank you for sharing that information. Would you like to submit a formal report now?",
        isBot: true,
        options: ["Yes, submit report", "No, I have more details"]
      }]);
    }, 300);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-blue-600 rounded-t-lg">
        <div className="flex items-center">
          <i className="fas fa-robot text-white text-xl mr-2"></i>
          <h3 className="text-lg font-semibold text-white">Crime Report Assistant</h3>
        </div>
        <div className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
      </div>
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 messages-container bg-gray-50"
      >
        {messages.map((message, index) => (
          <div key={index} className={`animate-fade-in ${message.isBot ? '' : 'flex flex-col items-end'}`}>
            <div className={`flex items-start max-w-[85%] ${message.isBot ? '' : 'ml-auto'}`}>
              {message.isBot && (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-robot text-blue-600 text-lg"></i>
                </div>
              )}
              <div
                className={`p-4 rounded-xl ${
                  message.isBot
                    ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <p className={`text-base leading-relaxed ${message.isBot ? 'font-medium' : ''}`}>{message.text}</p>
              </div>
              {!message.isBot && (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center ml-3 flex-shrink-0">
                  <i className="fas fa-user text-white text-lg"></i>
                </div>
              )}
            </div>
            {message.options && message.options.length > 0 && (
              <div className="mt-4 space-y-2 ml-12 w-[80%]">
                {message.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleOptionClick(option)}
                    className="block w-full text-left px-4 py-3 text-base bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 rounded-lg transition-all duration-200 border-2 border-blue-200 hover:border-blue-300 shadow hover:shadow-md font-medium"
                  >
                    <div className="flex items-center">
                      <i className="fas fa-chevron-right text-blue-400 mr-3"></i>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="block w-full px-4 py-3 pl-12 text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-message text-gray-400"></i>
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow hover:shadow-md"
          >
            <i className="fas fa-paper-plane text-lg"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;