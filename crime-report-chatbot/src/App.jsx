import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ChatBot from './components/ChatBot';
import ReportForm from './components/ReportForm';
import NearbyPolice from './components/NearbyPolice';
import ReportsFeed from './components/ReportsFeed';
import SafetyTips from './components/SafetyTips';

function App() {
  const [reports, setReports] = useState([]);

  const handleReportSubmit = (report) => {
    setReports(prevReports => [
      {
        ...report,
        status: 'pending',
        id: Date.now()
      },
      ...prevReports
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img src="/shield.svg" className="h-8 w-8 text-blue-600" alt="Logo" />
                <h1 className="ml-2 text-xl font-bold text-gray-800">
                  Nairobi Crime Reporter
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/reports"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  Reports
                </NavLink>
                <NavLink
                  to="/police-stations"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  Police Stations
                </NavLink>
                <NavLink
                  to="/safety-tips"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-blue-50'
                    }`
                  }
                >
                  Safety Tips
                </NavLink>
              </div>
            </div>
            <div className="flex items-center">
              <a
                href="tel:999"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                Emergency: 999
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Report an Incident
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Use our AI-powered chatbot to report criminal activities or fill out the form below.
                      </p>
                      <ChatBot onReportSubmit={handleReportSubmit} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Manual Report Form
                      </h2>
                      <ReportForm onSubmit={handleReportSubmit} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Recent Reports
                      </h2>
                      <ReportsFeed reports={reports.slice(0, 5)} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Nearest Police Station
                      </h2>
                      <NearbyPolice />
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/reports"
              element={
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    All Reports
                  </h2>
                  <ReportsFeed reports={reports} />
                </div>
              }
            />
            <Route
              path="/police-stations"
              element={
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Nearby Police Stations
                  </h2>
                  <NearbyPolice />
                </div>
              }
            />
            <Route
              path="/safety-tips"
              element={
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Safety Tips & Alerts
                  </h2>
                  <SafetyTips />
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 Nairobi Crime Reporter. For emergencies, always dial 999.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
