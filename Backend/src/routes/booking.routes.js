import { Router } from "express";
import { bookEvent, getMyBookings} from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:eventId", verifyJWT, bookEvent);
router.get('/my-bookings', verifyJWT, getMyBookings)

export default router;
