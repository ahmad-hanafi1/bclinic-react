type props = {
  calendarEvent: {
    id: string | number;
    title: string;
    start: string;
    end: string;
    color: string;
    patientName: string;
    phoneNumber: string;
    doctor: string;
  };
};

export default function CustomTimeGridEvent({ calendarEvent }: props) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        background: calendarEvent.color,
        color: "white",
        padding: 10,
        borderRadius: 5,
        border: "1px solid white",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontSize: "14px",
      }}
    >
      <p>{`Doctor: ${
        calendarEvent.doctor.charAt(0).toUpperCase() +
        calendarEvent.doctor.slice(1)
      }`}</p>
      <p>{`Patient: ${calendarEvent.patientName}`}</p>
      <p>{`Phone: ${calendarEvent.phoneNumber}`}</p>
    </div>
  );
}
