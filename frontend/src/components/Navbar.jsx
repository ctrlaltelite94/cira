import React, { useState } from 'react';
import { useAppContext } from '../contexts/appContext';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../apiClient';
import { Menu, X } from 'lucide-react'; // optional icons library (install via npm install lucide-react)

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, userType } = useAppContext();
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      showToast({ message: "Signed Out Successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleLogout = () => {
    setMenuOpen(false);
    mutation.mutate();
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-gray-100 shadow-md py-4">
      <div className="w-[90%] md:w-[70%] mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-blue-600 font-bold text-3xl">CIRA</Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 font-medium">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/about" className="hover:underline">About</Link></li>
          <li><Link to="/incidents" className="hover:underline">Incidents</Link></li>
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to={userType === 'responder' ? '/responder/dashboard' : '/user/profile'}
                  className="hover:underline"
                >
                  {userType === 'responder' ? 'Dashboard' : 'Profile'}
                </Link>
              </li>
              <li className="cursor-pointer hover:underline" onClick={handleLogout}>Logout</li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md text-white">
                <Link to="/signup">Get Started</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-100 shadow-md mt-2 px-4 py-4 space-y-3 font-medium">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/incidents" className="block hover:underline" onClick={() => setMenuOpen(false)}>Incidents</Link>
          {isLoggedIn ? (
            <>
              <Link
                to={userType === 'responder' ? '/responder/dashboard' : '/user/profile'}
                className="block hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                {userType === 'responder' ? 'Dashboard' : 'Profile'}
              </Link>
              <span className="block cursor-pointer hover:underline" onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:underline" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link
                to="/signup"
                className="block bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md text-white w-fit"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
