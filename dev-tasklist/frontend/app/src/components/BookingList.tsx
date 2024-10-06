// components/BookingList.tsx
import Link from "next/link";


interface Booking {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  return (
    <div >
      {bookings.map((booking) => (
        <div key={booking.id} >
          <Link href={`/booking/${booking.id}`}>
            <h2>A Booking on {new Date(booking.date).toLocaleDateString()}</h2>
            <p>Starting at {booking.start_time}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookingList;
