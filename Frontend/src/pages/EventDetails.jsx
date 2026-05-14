import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => {
      const data = res.data.data || res.data;
      setEvent(data);
    });
  }, [id]);

  const handleBooking = async () => {
    try {
      const res = await api.post(`/bookings/${id}`, { tickets });
      alert(res.data?.message || "Booking Successful!");

      const updated = await api.get(`/events/${id}`);
      setEvent(updated.data.data || updated.data);
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/events/delete/${id}`);
      alert(res.data.message || "Deleted successfully");
      navigate("/my-events");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Hero Card */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
          {/* Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-12">
            <h1 className="text-4xl sm:text-5xl font-bold mt-4">
              {event?.title}
            </h1>

            <p className="text-indigo-100 mt-4 max-w-3xl leading-7 text-lg">
              {event?.description}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition">
                <p className="text-sm text-slate-400">Date</p>
                <h3 className="font-semibold text-lg mt-2">
                  {new Date(event.date).toDateString()}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition">
                <p className="text-sm text-slate-400">Venue</p>
                <h3 className="font-semibold text-lg mt-2">{event?.venue}</h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition">
                <p className="text-sm text-slate-400">Ticket Price</p>
                <h3 className="font-semibold text-lg mt-2 text-green-400">
                  ₹{event?.price}
                </h3>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 transition">
                <p className="text-sm text-slate-400">Seats Left</p>
                <h3 className="font-semibold text-lg mt-2 text-yellow-400">
                  {event?.availableSeats}
                </h3>
              </div>
            </div>

            {/* Booking Section */}
            <div className="mt-10 border-t border-slate-800 pt-8">
              {user ? (
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                  {/* Left */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <input
                      type="number"
                      min="1"
                      value={tickets}
                      onChange={(e) =>
                        setTickets(parseInt(e.target.value) || 1)
                      }
                      className="w-full sm:w-32 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
                    />

                    <button
                      onClick={handleBooking}
                      className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 px-8 py-3 rounded-2xl font-semibold transition shadow-lg shadow-indigo-500/20"
                    >
                      Book Now
                    </button>
                  </div>

                  {/* Right */}
                  {user?._id === event?.organizer?._id?.toString() && (
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 px-8 py-3 rounded-2xl font-semibold transition shadow-lg shadow-red-500/20 active:scale-95"
                    >
                      Delete Event
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-slate-800 rounded-2xl p-5 text-slate-300">
                  Please{" "}
                  <Link
                    to="/login"
                    className="text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    Login
                  </Link>{" "}
                  to book tickets.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
