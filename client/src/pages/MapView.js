// src/pages/MapView.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const API_URL = process.env.REACT_APP_API_URL;

const MapView = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/reports`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Error fetching reports:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          🗺️ Disaster Reports Map
        </h2>

        <div className="rounded-xl overflow-hidden border border-gray-300 shadow">
          <MapContainer
            center={[20.5937, 78.9629]} // Default center: India
            zoom={5}
            scrollWheelZoom={true}
            className="h-[600px] w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {reports.map((report) => (
              <Marker
                key={report._id}
                position={[
                  parseFloat(report.latitude),
                  parseFloat(report.longitude)
                ]}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold text-blue-600">{report.disasterType}</p>
                    <p>{report.description}</p>
                    <p className="italic text-gray-600">Severity: {report.severity}</p>
                    <p className="text-xs text-gray-500 mt-1">📍 {report.location}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapView;


