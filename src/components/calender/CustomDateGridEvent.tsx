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

export default function CustomDateGridEvent({ calendarEvent }: props) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: calendarEvent.color,
        color: "white",
        padding: "2px",
        borderRadius: 5,
        border: "1px solid white",
      }}
    >
      {calendarEvent.patientName}
    </div>
  );
}
