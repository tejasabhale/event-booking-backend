import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-indigo-400">
              EventZone
            </h2>

            <p className="text-slate-400 mt-4 leading-6 text-sm max-w-sm mx-auto sm:mx-0">
              Book tickets for the best events, concerts, workshops,
              hackathons, and experiences around you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              <Link
                to="/my-bookings"
                className="hover:text-white transition"
              >
                My Bookings
              </Link>

              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-white transition"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">
              Connect With Me
            </h3>

            <div className="space-y-3 text-slate-400 text-sm">

              <a
                href="https://www.linkedin.com/in/tejas-abhale-50743128a/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>

              <a
                href="https://github.com/tejasabhale"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                <FaGithub size={18} />
                GitHub
              </a>

              <a
                href="https://x.com/Tejas55451"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition flex items-center justify-center sm:justify-start gap-2"
              >
                <FaXTwitter size={18} />
                Twitter
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-5 text-center text-sm text-slate-500">
          © 2026 EventZone. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;