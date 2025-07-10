import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';

// Fix Leaflet marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ReportForm() {
  const [formData, setFormData] = useState({
    disasterType: '',
    description: '',
    location: '',
    date: '',
    severity: 'Moderate',
  });

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  function LocationSelector() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          if (data?.display_name) {
            setFormData((prev) => ({ ...prev, location: data.display_name }));
          }
        } catch (err) {
          console.error('Reverse geocoding error:', err);
        }
      },
    });
    return null;
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'location') {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        if (data?.length > 0) {
          setLatitude(parseFloat(data[0].lat));
          setLongitude(parseFloat(data[0].lon));
        }
      } catch (err) {
        console.error('Forward geocoding error:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      latitude,
      longitude,
    };

    const toastId = toast.loading('Submitting report...');

    try {
      const res = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      toast.success('✅ Report submitted successfully!', { id: toastId });

      setFormData({
        disasterType: '',
        description: '',
        location: '',
        date: '',
        severity: 'Moderate',
      });
      setLatitude(null);
      setLongitude(null);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to submit report.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-xl mx-auto space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <span>📍</span> Report a Disaster
        </h2>

        {/* Disaster Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Disaster Type</label>
          <select
            name="disasterType"
            value={formData.disasterType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select Type</option>
            <option value="Flood">Flood</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Fire">Fire</option>
            <option value="Cyclone">Cyclone</option>
            <option value="Landslide">Landslide</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what happened..."
            required
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter or select on map"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition"
          >
            Submit Report
          </button>
        </div>
      </form>

      {/* Map */}
      <div className="mt-12 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">🗺️ Select Location on Map</h3>
        <div className="rounded-xl overflow-hidden border border-gray-300 shadow">
          <MapContainer
            center={[latitude || 20.5937, longitude || 78.9629]}
            zoom={latitude && longitude ? 14 : 5}
            scrollWheelZoom
            className="h-96 w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationSelector />
            {latitude && longitude && <Marker position={[latitude, longitude]} />}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}






