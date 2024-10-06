// pages/booking/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BookingDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchBooking = async () => {
        const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`);
        const data = await res.json();
        setBooking(data);
      };

      fetchBooking();
    }
  }, [id]);

  if (!booking) return <p>Loading...</p>;

  return (
    <div>
      <h1>This Booking is with {booking.doctor_name}</h1>
      <p>For {booking.service}</p>
      <p>It ends on {booking.end_time}</p>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
};

export default BookingDetail;
