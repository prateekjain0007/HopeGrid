import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function ReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reports:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-6">Loading reports...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-800 mb-6">
          📋 All Submitted Reports
        </h2>

        {reports.length === 0 ? (
          <p className="text-center text-gray-500">No reports found.</p>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="border border-blue-200 p-4 rounded-xl bg-blue-50 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-blue-700 mb-1">
                  {report.disasterType || 'Unknown Disaster'} in {report.location}
                </h3>
                {report.description && (
                  <p className="text-sm text-gray-700 mb-2">{report.description}</p>
                )}
                <p className="text-sm text-gray-600">
                  📅 {moment(report.date).format('LL')} <br />
                  ⚠️ <span className="font-medium">Severity:</span> {report.severity}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  📍 Coordinates: {report.latitude}, {report.longitude}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


