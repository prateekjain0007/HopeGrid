import { Link } from 'react-router-dom';
import heroImg from '../assets/myhero.jpg';
import { MapPinned, LifeBuoy, AlertTriangle } from 'lucide-react';

export default function Home() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="text-green-400">HopeGrid</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            HopeGrid is a crowdsourced platform for sharing real-time disaster alerts and locating or offering essential resources during emergencies.
          </p>

          {!isLoggedIn && (
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition">
                Login
              </Link>
              <Link to="/signup" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-white py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About HopeGrid</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          HopeGrid empowers communities during disasters by enabling people to report alerts, find help, and offer resources. It connects those in need with those who can help.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-100 py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Features</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Everything you need to stay informed and support others during emergencies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Report a Disaster</h3>
            <p className="text-gray-600">Submit real-time alerts to inform others of disasters in your area.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <LifeBuoy className="mx-auto text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Offer Help</h3>
            <p className="text-gray-600">List resources or services you can offer during emergencies.</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <MapPinned className="mx-auto text-yellow-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">Disaster Map</h3>
            <p className="text-gray-600">View affected areas and aid availability via an interactive map.</p>
          </div>
        </div>
      </section>

      {/* Join the Mission Section */}
      <section id="contact" className="bg-blue-50 py-16 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Join the Mission</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Passionate about disaster relief or have ideas to improve HopeGrid? We’d love to collaborate with you.
        </p>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 text-left">
          <p className="mb-2"><strong>Email:</strong> jainprateek2004@gmail.com</p>
          <p className="mb-2"><strong>Phone:</strong> +91 9027549849</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">HopeGrid</h4>
            <p className="text-gray-300">Empowering communities during disasters with real-time alerts and shared resources.</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/home" className="hover:underline">Home</Link></li>
              <li><Link to="/alerts" className="hover:underline">Alerts</Link></li>
              <li><Link to="/resources" className="hover:underline">Resources</Link></li>
              <li><Link to="/report" className="hover:underline">Report</Link></li>
              <li><Link to="/map" className="hover:underline">Map</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">Connect</h4>
            <p className="text-gray-300">jainprateek2004@gmail.com</p>
            <p className="text-gray-300">+91 9027549849</p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-300">
          © {new Date().getFullYear()} HopeGrid. All rights reserved.
        </div>
      </footer>
    </div>
  );
}





