import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    axios.get('/api/alerts')
      .then(res => {
        setAlerts(res.data);
        setFilteredAlerts(res.data);
      })
      .catch(err => console.error('Failed to fetch alerts', err));
  }, []);

  useEffect(() => {
    let filtered = [...alerts];

    if (search) {
      filtered = filtered.filter(alert =>
        alert.location?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(alert => alert.disasterType === typeFilter);
    }

    if (sortOption === 'time') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'severity') {
      const severityOrder = { High: 3, Moderate: 2, Low: 1 };
      filtered.sort((a, b) =>
        (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0)
      );
    }

    setFilteredAlerts(filtered);
  }, [search, typeFilter, sortOption, alerts]);

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="">All Types</option>
          <option value="Flood">Flood</option>
          <option value="Earthquake">Earthquake</option>
          <option value="Fire">Fire</option>
          <option value="Cyclone">Cyclone</option>
          <option value="Landslide">Landslide</option>
     
        </select>
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="">Sort By</option>
          <option value="time">Time</option>
          <option value="severity">Severity</option>
        </select>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredAlerts.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            No alerts found.
          </p>
        ) : (
          filteredAlerts.map((alert, index) => (
            <div key={index} className="border p-4 rounded shadow bg-white">
              <h2 className="text-lg font-bold text-red-600">{alert.disasterType}</h2>
              <p className="text-gray-600">{alert.location}</p>
              <p className="text-sm text-gray-500">
                {new Date(alert.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700 mt-2">Severity: {alert.severity}</p>
              <p className="mt-2">{alert.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Map with Markers */}
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={4}
        scrollWheelZoom={false}
        className="w-full h-96 rounded shadow z-10"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {filteredAlerts.map((alert, index) =>
          alert.latitude && alert.longitude ? (
            <Marker key={index} position={[alert.latitude, alert.longitude]}>
              <Popup>
                <strong>{alert.disasterType}</strong><br />
                {alert.location}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
