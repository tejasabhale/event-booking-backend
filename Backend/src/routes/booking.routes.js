import { Router } from "express";
import { bookEvent } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:eventId", verifyJWT, bookEvent);

export default router;
