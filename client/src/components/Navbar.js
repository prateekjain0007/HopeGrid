import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-hot-toast'; // 👈 Import toast

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('👋 Logged out successfully'); // 👈 Show toast
    navigate('/');
  };

  const baseLinkStyle = "transition-colors duration-200 hover:text-blue-300";
  const isActive = (path) =>
    location.pathname === path ? "underline text-blue-300" : "";

  const navLinks = (
    <>
      <Link to="/home" className={`${baseLinkStyle} ${isActive('/home')}`}>Home</Link>

      {isLoggedIn ? (
        <>
          <Link to="/alerts" className={`${baseLinkStyle} ${isActive('/alerts')}`}>Alerts</Link>
          <Link to="/resources" className={`${baseLinkStyle} ${isActive('/resources')}`}>Resources</Link>
          <Link to="/report" className={`${baseLinkStyle} ${isActive('/report')}`}>Report</Link>
          <Link to="/reports" className={`${baseLinkStyle} ${isActive('/reports')}`}>View Reports</Link>
          <Link to="/map" className={`${baseLinkStyle} ${isActive('/map')}`}>🗺️ Map</Link>
          <button
            onClick={handleLogout}
            className="transition-colors duration-200 text-red-200 hover:text-red-400"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <a href="#about" className={`${baseLinkStyle}`}>About</a>
          <a href="#features" className={`${baseLinkStyle}`}>Features</a>
          <a href="#contact" className={`${baseLinkStyle}`}>Contact</a>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-white">
          HopeGrid
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          {navLinks}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-3 bg-blue-600 transition-all duration-300">
          {navLinks}
        </div>
      )}
    </nav>
  );
}

export default Navbar;










