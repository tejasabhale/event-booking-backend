import express from 'express'
import userRouter from './routes/user.routes.js';
import eventRouter from './routes/event.routes.js'
import { bookEvent } from './controllers/booking.controller.js';
import bookingRouter from './routes/booking.routes.js'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/events", eventRouter)
app.use('/api/v1/bookings', bookingRouter)

export { app }