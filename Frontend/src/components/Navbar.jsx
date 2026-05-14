import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-white bg-slate-800 px-4 py-2 rounded-xl font-medium block"
      : "text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-xl transition block";

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Top Bar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold text-indigo-400 hover:text-indigo-300 transition"
          >
            EventZone
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">

            <NavLink to="/" className={linkStyle}>
              Home
            </NavLink>

            {!user ? (
              <>
                <NavLink to="/login" className={linkStyle}>
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium transition"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/create-event" className={linkStyle}>
                  Create Event
                </NavLink>

                <NavLink to="/my-events" className={linkStyle}>
                  My Events
                </NavLink>

                <NavLink to="/my-bookings" className={linkStyle}>
                  My Bookings
                </NavLink>

                <span className="text-slate-400 text-sm">
                  Hi,{" "}
                  <span className="text-white font-semibold">
                    {user.fullName}
                  </span>
                </span>

                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white font-medium transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 bg-slate-900 p-4 rounded-2xl">

            <NavLink
              to="/"
              className={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium transition text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/create-event"
                  className={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  Create Event
                </NavLink>

                <NavLink
                  to="/my-events"
                  className={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  My Events
                </NavLink>

                <NavLink
                  to="/my-bookings"
                  className={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  My Bookings
                </NavLink>

                <span className="text-slate-400 text-sm px-2">
                  Hi,{" "}
                  <span className="text-white font-semibold">
                    {user.fullName}
                  </span>
                </span>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl text-white font-medium transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;