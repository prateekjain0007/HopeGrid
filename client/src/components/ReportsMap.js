import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icon for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

export default function ReportsMap() {
  const [reports, setReports] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch(`${API_BASE}/reports`);
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      }
    }

    fetchReports();
  }, [API_BASE]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Reported Disaster Locations</h2>

      <div className="h-[600px] w-full">
        <MapContainer
          center={[20.5937, 78.9629]} // Centered on India
          zoom={5}
          scrollWheelZoom={true}
          className="h-full w-full rounded"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reports.map((report) => (
            <Marker
              key={report._id}
              position={[report.latitude, report.longitude]}
            >
              <Popup>
                <strong>{report.title || report.type}</strong><br />
                {report.location}<br />
                Severity: {report.severity}<br />
                Date: {new Date(report.date).toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

