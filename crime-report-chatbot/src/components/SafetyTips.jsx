import React, { useState } from 'react';

const safetyTips = [
  {
    category: "Personal Safety",
    tips: [
      "Stay alert and aware of your surroundings at all times",
      "Avoid walking alone in poorly lit or isolated areas",
      "Keep emergency numbers saved on speed dial",
      "Share your location with trusted friends when traveling",
      "Trust your instincts - if something feels wrong, leave the area"
    ]
  },
  {
    category: "Home Security",
    tips: [
      "Install quality locks on all doors and windows",
      "Keep your home well-lit, especially entrances",
      "Don't advertise when you're away on social media",
      "Get to know your neighbors and join community watch programs",
      "Install security cameras or doorbell cameras if possible"
    ]
  },
  {
    category: "Digital Safety",
    tips: [
      "Use strong, unique passwords for all accounts",
      "Be cautious with personal information shared online",
      "Verify the identity of anyone requesting sensitive information",
      "Keep your devices and software updated",
      "Enable two-factor authentication when available"
    ]
  }
];

const alerts = [
  {
    id: 1,
    type: "warning",
    area: "Kilimani",
    message: "Recent increase in car theft incidents. Please ensure your vehicle is properly secured.",
    timestamp: "2024-01-20T10:30:00Z"
  },
  {
    id: 2,
    type: "alert",
    area: "CBD",
    message: "Be vigilant of phone snatching during peak hours.",
    timestamp: "2024-01-19T15:45:00Z"
  }
];

const SafetyTips = () => {
  const [selectedCategory, setSelectedCategory] = useState("Personal Safety");

  return (
    <div className="space-y-6">
      {/* Safety Alerts Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <i className="fas fa-bell text-yellow-500 mr-2"></i>
          Recent Safety Alerts
        </h2>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <i
                    className={`fas fa-exclamation-triangle text-lg ${
                      alert.type === 'warning' ? 'text-yellow-500' : 'text-red-500'
                    }`}
                  ></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">
                    {alert.area} Area Alert
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <i className="fas fa-shield-alt text-blue-500 mr-2"></i>
          Safety Tips
        </h2>
        
        <div className="flex space-x-2 mb-6">
          {safetyTips.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                selectedCategory === category.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {safetyTips
            .find((cat) => cat.category === selectedCategory)
            ?.tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start p-3 bg-blue-50 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <i className="fas fa-check-circle text-blue-500 mt-1"></i>
                </div>
                <p className="ml-3 text-gray-700">{tip}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <i className="fas fa-phone-alt text-green-500 mr-2"></i>
          Emergency Contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="tel:999"
            className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-150"
          >
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <i className="fas fa-phone-alt text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Emergency</h3>
              <p className="text-red-600 font-bold">999</p>
            </div>
          </a>
          <a
            href="tel:112"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-150"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="fas fa-ambulance text-white text-xl"></i>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Ambulance</h3>
              <p className="text-blue-600 font-bold">112</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;