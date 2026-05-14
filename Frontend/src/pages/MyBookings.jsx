import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/bookings/my-bookings")
      .then((res) => {
        setBookings(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-lg sm:text-xl px-4 text-center">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">My Bookings</h1>

            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              All your booked events in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-2xl transition w-full sm:w-auto"
          >
            Explore Events
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <div className="bg-slate-900 p-6 rounded-3xl shadow">
            <p className="text-slate-400 text-sm">Total Bookings</p>
            <h2 className="text-3xl font-bold mt-2">{bookings.length}</h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow">
            <p className="text-slate-400 text-sm">Confirmed</p>
            <h2 className="text-3xl font-bold mt-2">
              {
                bookings.filter((item) => item.paymentStatus === "Completed")
                  .length
              }
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow">
            <p className="text-slate-400 text-sm">Pending</p>
            <h2 className="text-3xl font-bold mt-2">
              {
                bookings.filter((item) => item.paymentStatus === "Pending")
                  .length
              }
            </h2>
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-center">
            <p className="text-slate-400 text-base sm:text-lg">
              You haven't booked any events yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow hover:bg-slate-800 transition flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              >
                {/* Left Side */}
                <div className="min-w-0">
                  <p className="text-sm text-slate-400 break-all">
                    Booking ID: {booking._id.slice(-6)}
                  </p>

                  <h2 className="text-xl sm:text-2xl font-semibold mt-2 break-words">
                    {booking.event?.title || "Event Deleted"}
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-3 text-slate-300 text-sm">
                    <p>🎟 Tickets: {booking.tickets}</p>
                    <p>💰 ₹{booking.totalAmount}</p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium text-center ${
                      booking.paymentStatus === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : booking.paymentStatus === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>

                  {booking.event ? (
                    <Link
                      to={`/event/${booking.event._id}`}
                      className="px-4 py-2 bg-white text-black rounded-xl font-medium hover:bg-slate-200 transition w-full sm:w-auto"
                    >
                      View
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-slate-700 text-slate-500 rounded-xl font-medium cursor-not-allowed w-full sm:w-auto"
                    >
                      Event Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
