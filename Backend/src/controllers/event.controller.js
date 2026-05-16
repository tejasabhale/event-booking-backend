import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, venue, price, totalSeats } = req.body;
  if (!title?.trim() || !description?.trim() || !venue?.trim() || !date) {
    throw new ApiError(400, "Title, Description, Date and Venue are required");
  }

  if (!totalSeats || totalSeats <= 0) {
    throw new ApiError(400, "Total seats must be greater than 0");
  }

  const event = await Event.create({
    title,
    description,
    date,
    venue,
    price: price || 0,
    totalSeats,
    availableSeats: totalSeats,
    organizer: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().populate("organizer", "fullName email");
  if (events.length === 0) {
    throw new ApiError(404, "Events not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const getEventById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id).populate(
    "organizer",
    "fullName email",
  );
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully."));
});

const getMyEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizer: req.user._id }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  if (event.organizer.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  await event.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Event deleted successfully!"));
});

export { createEvent, getEventById, getAllEvents, getMyEvents, deleteEvent };
