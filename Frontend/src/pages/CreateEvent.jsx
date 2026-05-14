import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    price: "",
    totalSeats: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/events", formData);
      alert("Event Created Successfully!");
      navigate("/my-events");
    } catch (error) {
      alert(error.response?.data.message || "Failed to create event");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">Create Event</h1>
          <p className="text-slate-400 mt-2">
            Fill in the details to publish your event
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="Enter event title"
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              required
              placeholder="Write event description..."
              className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-indigo-500"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Date + Venue */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Event Date
              </label>
              <input
                type="date"
                required
                className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-indigo-500"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Venue
              </label>
              <input
                type="text"
                required
                placeholder="Enter venue"
                className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-indigo-500"
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
              />
            </div>
          </div>

          {/* Price + Seats */}
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                required
                placeholder="Enter price"
                className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-indigo-500"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Total Seats
              </label>
              <input
                type="number"
                required
                placeholder="Enter total seats"
                className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none border border-slate-700 focus:border-indigo-500"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalSeats: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg transition duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;