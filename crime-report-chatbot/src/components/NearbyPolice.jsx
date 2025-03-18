import React, { useState, useEffect } from 'react';

const policeStations = [
  {
    id: 1,
    name: "Central Police Station",
    location: [-1.2864, 36.8172],
    phone: "+254 20 2222222",
    address: "Nairobi CBD, Kenya",
    services: ["General Crime Reporting", "Traffic Services", "Public Relations"],
    operatingHours: "24/7"
  },
  {
    id: 2,
    name: "Kilimani Police Station",
    location: [-1.2897, 36.7989],
    phone: "+254 20 3333333",
    address: "Kilimani, Nairobi, Kenya",
    services: ["Crime Reporting", "Gender Desk", "Community Policing"],
    operatingHours: "24/7"
  },
  {
    id: 3,
    name: "Parklands Police Station",
    location: [-1.2633, 36.8172],
    phone: "+254 20 4444444",
    address: "Parklands, Nairobi, Kenya",
    services: ["Crime Reporting", "Traffic Services", "Community Outreach"],
    operatingHours: "24/7"
  }
];

const NearbyPolice = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-circle text-red-500"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
          Police Stations Near You
        </h2>
        <div className="h-[400px] rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-600">
              <i className="fas fa-map text-4xl mb-2 block"></i>
              Interactive map will be integrated here
            </p>
          </div>
        </div>
      </div>

      {/* Station List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Police Stations</h3>
        <div className="space-y-4">
          {policeStations.map((station) => (
            <div
              key={station.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedStation?.id === station.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedStation(station)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 text-lg">{station.name}</h4>
                  <p className="text-gray-600 mt-1">
                    <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                    {station.address}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <i className="fas fa-clock text-gray-400 mr-2"></i>
                    {station.operatingHours}
                  </p>
                  {selectedStation?.id === station.id && (
                    <div className="mt-3">
                      <h5 className="font-medium text-gray-700 mb-2">Available Services:</h5>
                      <ul className="space-y-1">
                        {station.services.map((service, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <a
                  href={`tel:${station.phone}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-phone-alt mr-2"></i>
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-red-800">Emergency?</h3>
            <p className="text-red-600">
              For immediate assistance, dial <a href="tel:999" className="font-bold">999</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyPolice;