import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon issue
const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ reports }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Reports for map:', reports);
    }
  }, [reports]);

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        />

        {reports
          .filter(r => r.latitude && r.longitude)
          .map((report, idx) => (
            <Marker key={idx} position={[report.latitude, report.longitude]}>
              <Popup>
                <strong>{report.type}</strong>
                <br />
                {report.location}
                <br />
                {new Date(report.createdAt).toLocaleString()}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

