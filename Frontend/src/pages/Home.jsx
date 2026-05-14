import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/events")
      .then((res) => {
        const data = res.data.data || res.data;
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-base sm:text-xl px-4 text-center">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Discover Amazing <span className="text-indigo-400">Events</span>
          </h1>

          <p className="text-slate-400 mt-4 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Book tickets for tech meetups, concerts, workshops, hackathons, and
            many more exciting experiences near you.
          </p>

          <button
            onClick={() => {
              document
                .getElementById("upcomingEvents")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-6 cursor-pointer px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-500 hover:bg-indigo-600 rounded-2xl font-medium transition text-sm sm:text-base"
          >
            Explore Now
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl shadow">
            <p className="text-slate-400 text-sm">Total Events</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              {events.length}
            </h2>
          </div>

          <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl shadow">
            <p className="text-slate-400 text-sm">Categories</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">10+</h2>
          </div>

          <div className="bg-slate-900 p-5 sm:p-6 rounded-3xl shadow sm:col-span-2 lg:col-span-1">
            <p className="text-slate-400 text-sm">Cities Covered</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">25+</h2>
          </div>
        </div>

        {/* Events Section */}
        <div id="upcomingEvents" className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Upcoming Events
          </h2>

          <p className="text-slate-400 text-sm sm:text-base">
            {events.length} Events Found
          </p>
        </div>

        {events.length === 0 ? (
          <div className="bg-slate-900 p-8 sm:p-10 rounded-3xl text-center">
            <p className="text-slate-400 text-base sm:text-lg">
              No events available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-slate-900 rounded-3xl p-4 hover:bg-slate-800 transition shadow"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
