import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { sendBookingEmail } from "../utils/email.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const bookEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { tickets } = req.body;

  if (!tickets || tickets <= 0) {
    throw new ApiError(400, "Please specify atleast 1 ticket to book");
  }

  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.availableSeats < tickets) {
    throw new ApiError(400, `Only ${event.availableSeats} seats available`);
  }

  const totalAmount = tickets * event.price;
  const booking = await Booking.create({
    user: req.user._id,
    event: eventId,
    tickets,
    totalAmount,
  });

  event.availableSeats -= tickets;
  await event.save();

  try {
    await sendBookingEmail(
      req.user.email,
      req.user.fullName,
      event.title,
      event.date.toDateString(),
    );
  } catch (error) {
    console.log("Email error, but booked successfully!");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Event booked successfully!"));
});

const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("event");
  return res.status(200).json(new ApiResponse(200, bookings))
});

export { bookEvent, getMyBookings };
