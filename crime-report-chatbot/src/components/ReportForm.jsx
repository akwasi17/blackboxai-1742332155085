import React, { useState } from 'react';

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

const ReportForm = ({ onSubmit }) => {
  const [selectedCrime, setSelectedCrime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCrime || !description || !location || !date || !time) return;

    onSubmit({
      crimeType: selectedCrime,
      description,
      location,
      timestamp: new Date(`${date}T${time}`).toISOString(),
      status: 'pending'
    });

    // Reset form
    setSelectedCrime('');
    setDescription('');
    setLocation('');
    setDate('');
    setTime('');
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="crimeType" className="block text-sm font-medium text-gray-700">
            Type of Crime <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="crimeType"
              value={selectedCrime}
              onChange={(e) => setSelectedCrime(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              required
            >
              <option value="">Select a crime type</option>
              {crimeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <i className="fas fa-chevron-down text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter the location of the incident"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-map-marker-alt text-gray-400"></i>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please provide details about the incident..."
              required
            />
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <i className="fas fa-pencil-alt text-gray-400"></i>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Please provide as much detail as possible about the incident.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <i className="fas fa-paper-plane mr-2"></i>
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;