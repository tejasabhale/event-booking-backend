import express, { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getMyEvents,
} from "../controllers/event.controller.js";

const router = Router();

// Public Routes

router.get("/", getAllEvents);

// Protected Routes

router.get("/get-my-events", verifyJWT, getMyEvents);
router.post("/", verifyJWT, createEvent);

// Dynamic Routes

router.get("/:id", getEventById);
router.delete("/delete/:id", verifyJWT, deleteEvent);

export default router;
