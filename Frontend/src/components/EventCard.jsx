import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-md hover:shadow-xl hover:bg-slate-800 transition duration-300 h-full flex flex-col">

      {/* Event Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 line-clamp-2 min-h-[64px]">
        {event.title}
      </h3>

      {/* Event Details */}
      <div className="space-y-3 text-sm sm:text-base text-slate-300 flex-grow">
        <p>
          <span className="font-semibold text-white">Venue:</span>{" "}
          {event.venue}
        </p>

        <p>
          <span className="font-semibold text-white">Price:</span>{" "}
          ₹{event.price}
        </p>

        <p>
          <span className="font-semibold text-white">
            Available Seats:
          </span>{" "}
          {event.availableSeats}
        </p>
      </div>

      {/* Fixed Bottom Button */}
      <Link to={`/event/${event._id}`} className="mt-6">
        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-2xl font-medium transition cursor-pointer">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default EventCard;