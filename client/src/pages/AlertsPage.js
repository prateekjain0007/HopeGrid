import { useEffect, useState } from 'react';
import moment from 'moment';

export default function AlertsPage({ reports }) {
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    disasterType: '',
    sort: 'latest',
  });

  useEffect(() => {
    applyFilters();
  }, [filters, reports]);

  const applyFilters = () => {
    let data = [...reports];

    if (filters.location) {
      data = data.filter((r) =>
        r.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.disasterType) {
      data = data.filter((r) => r.disasterType === filters.disasterType);
    }

    if (filters.sort === 'severity') {
      data.sort((a, b) => (b.severity || '').localeCompare(a.severity || ''));
    } else {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredReports(data);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🌍 Disaster Alerts</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="border px-3 py-2 rounded w-full sm:w-1/3"
        />

        <select
          value={filters.disasterType}
          onChange={(e) =>
            setFilters({ ...filters, disasterType: e.target.value })
          }
          className="border px-3 py-2 rounded"
        >
          <option value="">All Disaster Types</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Fire">Fire</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Landslide">Landslide</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="latest">Latest</option>
          <option value="severity">Severity</option>
        </select>
      </div>

      {/* Alerts List */}
      {filteredReports.length === 0 ? (
        <p className="text-gray-600">No alerts found for the current filters.</p>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((alert) => (
            <div
              key={alert._id}
              className="bg-white p-5 rounded-lg shadow border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-semibold text-blue-700">
                  {alert.disasterType} in {alert.location}
                </h2>
                <span className="text-sm text-gray-500">
                  {moment(alert.createdAt).fromNow()}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Severity:</strong> {alert.severity || 'Medium'}
              </p>

              {alert.description && (
                <p className="text-gray-800">{alert.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


