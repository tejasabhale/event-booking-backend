import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/user/verify-otp",
        {
          email,
          otp,
        }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Verification failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-xl p-6 sm:p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Verify Account
          </h1>

          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-6">
            Enter the OTP sent to
          </p>

          <p className="text-indigo-400 font-medium break-all mt-1">
            {email || "your email"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleVerify}
          className="space-y-5"
        >

          {/* OTP */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              6-Digit OTP
            </label>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              required
              onChange={(e) =>
                setOtp(e.target.value)
              }
              className="w-full px-4 py-3 rounded-2xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 outline-none focus:border-indigo-500 text-center tracking-[0.4em] text-lg"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-2xl font-medium transition"
          >
            Verify OTP
          </button>

        </form>

        {/* Bottom */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Back to{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default VerifyOtp;