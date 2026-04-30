import express from 'express'
import userRouter from './routes/user.routes.js';
import eventRouter from './routes/event.routes.js'
import { bookEvent } from './controllers/booking.controller.js';
import bookingRouter from './routes/booking.routes.js'

const app = express();

app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/events", eventRouter)
app.use('/api/v1/bookings', bookingRouter)

export { app }