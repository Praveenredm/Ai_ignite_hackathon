const BookingSuccess = ({ token }) => (
  <div className="text-center">
    <h2 className="text-xl font-bold">Appointment Confirmed</h2>
    <p className="mt-2">Your Token Number:</p>
    <div className="text-2xl font-mono mt-3">{token}</div>
    <p className="text-sm mt-2">
      Please save this token for hospital visit
    </p>
  </div>
);

export default BookingSuccess;
