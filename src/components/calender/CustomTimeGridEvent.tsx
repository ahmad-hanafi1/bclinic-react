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
        // position: "absolute",
        position: "relative",
        height: "100%",
        width: "100%",
        background: "#797d86",
        color: "#fff",
        padding: 8,
        borderRadius: 0,
        fontSize: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: 25,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: "bold" }}>{title}</p>
        <p style={{ fontSize: 14 }}>
          Doctor:
          <span style={{ fontWeight: "bold", color: color }}>
            {capitalize(doctor.name)}
          </span>
        </p>
        <p style={{ fontSize: 14 }}>
          Patient:
          <span style={{ fontWeight: "bold" }}>{capitalize(patient.name)}</span>
        </p>{" "}
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "25px",
            backgroundColor: statusColors[status],
            right: 0,
            top: 0,
          }}
        />
      </div>
    </div>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function truncate(text: string, max = 40): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}
