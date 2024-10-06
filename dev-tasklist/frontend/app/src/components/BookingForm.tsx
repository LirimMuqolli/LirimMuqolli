import { useState } from "react";
import { useRouter } from "next/router";

const BookingForm: React.FC = () => {
  const router = useRouter();
  const [service, setService] = useState("");
  const [doctor_name, setDoctorName] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const bookingData = { service, doctor_name, start_time, end_time, date };
    console.log("Submitting booking data:", bookingData); // Log data

    try {
      const res = await fetch("http://host.docker.internal:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response from server:", errorData); // Log error response
        setError(errorData.message || "An error occurred.");
        return;
      }

      // Redirect on success
      router.push("/");
    } catch (error) {
      console.error("Unexpected error:", error); // Log unexpected errors
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="service">Service</label>
        <input
          id="service"
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Enter service name"
          required
        />
      </div>
      <div>
        <label htmlFor="doctor_name">Doctor Name</label>
        <input
          id="doctor_name"
          type="text"
          value={doctor_name}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Enter doctor's name"
          required
        />
      </div>
      <div>
        <label htmlFor="start_time">Start Time</label>
        <input
          id="start_time"
          type="time"
          value={start_time}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="end_time">End Time</label>
        <input
          id="end_time"
          type="time"
          value={end_time}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Booking</button>
      {error && <p>{error}</p>} {/* Display error messages */}
      <div>error</div>
    </form>
   
  );
};

export default BookingForm;
