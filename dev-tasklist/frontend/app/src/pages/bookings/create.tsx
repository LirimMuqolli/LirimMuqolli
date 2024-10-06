// pages/bookings/create.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateBooking: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    doctor_name: '',
    service: '',
    date: '',
    start_time: '',
    end_time: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/'); // Redirect back to the main page
      } else {
        const errorData = await res.json();
        setErrors(errorData.errors || ['An error occurred']);
      }
    } catch (err) {
      setErrors(['Network error: Unable to reach the server.']);
    }
  };

  return (
    <div>
      <h1>Create Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="doctor_name">Doctor Name:</label>
          <input
            type="text"
            name="doctor_name"
            id="doctor_name"  // Added ID
            placeholder="Enter doctor's name"  // Added placeholder
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="service">Service:</label>
          <input
            type="text"
            name="service"
            id="service"  // Added ID
            placeholder="Enter service"  // Added placeholder
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            id="date"  // Added ID
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start_time">Start Time:</label>
          <input
            type="time"
            name="start_time"
            id="start_time"  // Added ID
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_time">End Time:</label>
          <input
            type="time"
            name="end_time"
            id="end_time"  // Added ID
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h2>Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;
