import dayjs from "dayjs";

type CalendarEvent = {
  id: number | string;
  name: string;
  start: string;
  end: string;
  color: string;
  status: "scheduled" | "delayed" | "checked_in" | "running" | "checked_out";
  doctor: { id: number; name: string };
  patient: { id: number; name: string };
};

type Props = {
  calendarEvent: CalendarEvent;
};

const statusColors: Record<CalendarEvent["status"], string> = {
  scheduled: "#3B82F6", // blue
  delayed: "#F59E0B", // amber
  checked_in: "#10B981", // green
  running: "#6366F1", // indigo
  checked_out: "#6B7280", // gray
};

export default function CustomTimeGridEvent({ calendarEvent }: Props) {
  const { start, end, patient, doctor, color, status } = calendarEvent;
  const title = `${dayjs(start).format("hh:mm A")} - ${dayjs(end).format(
    "hh:mm A"
  )}`;

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        background: "#1F2937", // Tailwind slate-800
        color: "#F9FAFB", // Tailwind gray-50
        padding: "0px 12px",
        borderRadius: 8,
        fontSize: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {/* Status Indicator */}
      <div
        style={{
          position: "absolute",
          height: "60%",
          width: "6px",
          backgroundColor: statusColors[status],
          right: 6,
          top: "20%",
          borderRadius: 4,
        }}
        title={status.replace("_", " ")}
      />

      {/* Time */}
      <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>

      {/* Doctor */}
      <div>
        <span style={{ fontWeight: 500, opacity: 0.85 }}>Doctor: </span>
        <span style={{ fontWeight: 600, color: color }}>
          {capitalize(doctor.name)}
        </span>
      </div>

      {/* Patient */}
      <div>
        <span style={{ fontWeight: 500, opacity: 0.85 }}>Patient: </span>
        <span style={{ fontWeight: 600 }}>{capitalize(patient.name)}</span>
      </div>
    </div>
  );
}

// Helpers
function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
