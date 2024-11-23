import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Function to generate random date between two dates
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const startDate = new Date(2023, 0, 1); // 1st January 2023
const endDate = new Date(); // Today

export default function OnlineBooking() {
  const [date, setDate] = useState(new Date());
  const [showBookingForm, setShowBookingForm] = useState(false);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: randomDate(startDate, endDate).toISOString().slice(0, 10),
      name: "John Doe",
      service: "Restoration",
    },
    {
      id: 2,
      date: randomDate(startDate, endDate).toISOString().slice(0, 10),
      name: "Jane Smith",
      service: "Cleaning",
    },
  ]);

  const onChange = (date) => {
    setDate(date);
    setShowBookingForm(true); // Show booking form when a date is selected
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBooking = {
      id:
        bookings.length > 0
          ? Math.max(...bookings.map((booking) => booking.id)) + 1
          : 1,
      date: date.toISOString().slice(0, 10),
      name: formData.get("name"),
      service: formData.get("service"),
    };
    setBookings([newBooking, ...bookings]);
    setShowBookingForm(false); // Hide the form after submission
    event.target.reset(); // Reset the form fields
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Online Booking</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Calendar
          onChange={onChange}
          value={date}
          className="p-2 rounded-md border border-gray-300 text-gray-800"
          prev2Label={null}
          next2Label={null}
          showNeighboringMonth={false}
        />

        {showBookingForm && ( // Conditionally render the booking form
          <form onSubmit={handleBookingSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="service"
                className="block text-gray-700 font-bold mb-2"
              >
                Service:
              </label>
              <select
                id="service"
                name="service"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a service</option>
                <option value="Restoration">Restoration</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Damage Repair">Damage Repair</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Now
            </button>
          </form>
        )}

        <h2 className="text-xl font-bold mt-6 mb-4">Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {booking.name} - {booking.service}
                </span>
                <span className="text-gray-500 text-sm">{booking.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
