import React from "react";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
