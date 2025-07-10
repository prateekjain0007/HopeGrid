import React from 'react';
import { Link } from 'react-router-dom';
 // Optional: add a banner image in assets folder
import heroImage from '../assets/myhero.jpg'
const WelcomePage = () => {
  return (
    
    <div className="bg-gradient-to-b from-blue-100 via-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />

        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-800 relative z-10 mb-6">
          Welcome to <span className="text-green-600">HopeGrid</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto relative z-10">
          HopeGrid is a crowdsourced platform for real-time disaster alerts and essential aid coordination.
        </p>
        <div className="mt-8 space-x-4 relative z-10">
          <Link to="/alerts">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
              🚨 View Alerts
            </button>
          </Link>
          <Link to="/resources">
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all">
              🤝 Find Resources
            </button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          Helping communities respond faster and more effectively during disasters.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border">
            <img src="https://img.icons8.com/fluency/48/000000/sos.png" alt="SOS" className="mb-4 w-12 h-12" />
            <h3 className="text-xl font-semibold mb-2">Report a Disaster</h3>
            <p className="text-gray-600">Share real-time alerts to inform others and mobilize response quickly.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border">
            <img src="https://img.icons8.com/emoji/48/000000/package-emoji.png" alt="Help" className="mb-4 w-12 h-12" />
            <h3 className="text-xl font-semibold mb-2">Offer Help</h3>
            <p className="text-gray-600">Submit resources like shelter, food, or aid to support those in need.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border">
            <img src="https://img.icons8.com/color/48/000000/map--v1.png" alt="Map" className="mb-4 w-12 h-12" />
            <h3 className="text-xl font-semibold mb-2">View Disaster Map</h3>
            <p className="text-gray-600">Track affected areas and locate nearby resources on an interactive map.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-600 py-6 mt-10 text-sm border-t">
        © 2025 <span className="font-semibold">HopeGrid</span> — Empowering Relief Through Technology
      </footer>
    </div>
  );
};

export default WelcomePage;


