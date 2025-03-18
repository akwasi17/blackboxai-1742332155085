import React from 'react';

const ReportsFeed = ({ reports = [] }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'investigating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  };

  if (reports.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <i className="fas fa-clipboard-list text-2xl text-gray-400"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No Reports Yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Reports submitted will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report, index) => (
        <div
          key={report.id || index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  {formatDate(report.timestamp)}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {report.crimeType}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-gray-400 mt-1"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">{report.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <i className="fas fa-align-left text-gray-400 mt-1"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <i className="fas fa-share-alt mr-2"></i>
                Share
              </button>
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <i className="fas fa-file-alt mr-2"></i>
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsFeed;