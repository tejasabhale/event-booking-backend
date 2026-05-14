import React, { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/events/get-my-events")
      .then((res) => {
        setEvents(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error Fetching Events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-lg sm:text-xl px-4 text-center">
        Loading your events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-10 py-10">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">
          My Events
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          All events created by you.
        </p>
      </div>

      {/* No Events */}
      {events.length === 0 ? (
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">
            No Events Found
          </h2>
          <p className="text-slate-400">
            You haven’t created any events yet.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;