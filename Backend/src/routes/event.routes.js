import express, { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../controllers/event.controller.js";

const router = Router();

// Public Routes

router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Protected Routes

router.post("/", verifyJWT, createEvent);

export default router;
