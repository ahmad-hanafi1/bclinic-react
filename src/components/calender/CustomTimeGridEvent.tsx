import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { updateEvent } from "../../data/features/calender/calenderSlice";
import { showModal } from "../../data/features/modal/modalSlice";
import { useAppDispatch } from "../../utils/hooks";
import { Tooltip } from "@mui/material";

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
  calendarEvent: CalendarEvent; // optional callback
};

const statusColors: Record<CalendarEvent["status"], string> = {
  scheduled: "#3B82F6", // blue
  delayed: "#F59E0B", // amber
  checked_in: "#10B981", // green
  running: "#6366F1", // indigo
  checked_out: "#6B7280", // gray
};

export default function CustomTimeGridEvent({ calendarEvent }: Props) {
  const dispatch = useAppDispatch();
  const { start, end, patient, doctor, color, status } = calendarEvent;
  const title = `${dayjs(start).format("hh:mm A")} - ${dayjs(end).format(
    "hh:mm A"
  )}`;
  return (
    <div className="group relative h-[97%] w-full m-auto border-1 border-gray-100 bg-gray-200 text-gray-200 rounded-lg p-1 pr-[1.1rem] flex flex-col justify-start gap-.5  shadow-md overflow-hidden">
      {/* Status Bar */}
      <Tooltip
        title={capitalize(status.replace("_", " "))}
        placement="top"
        arrow
      >
        <div
          style={{
            backgroundColor: statusColors[status],
          }}
          className={`absolute h-full w-4 top-0 right-0`}
        />
      </Tooltip>
      {/* Edit Button (shown on hover) */}

      <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out z-10">
        <EditIcon
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              showModal({
                title: "Edit Appointment",
                type: "appointment",
                onSubmit: (data) => {
                  const dateStr = dayjs(data.date).format("YYYY-MM-DD");
                  const startStr = dayjs(data.startTime).format("HH:mm:ss");
                  const endStr = dayjs(data.endTime).format("HH:mm:ss");

                  dispatch(
                    updateEvent({
                      id: Number(calendarEvent.id),
                      values: {
                        name: data.name,
                        appointment_start: `${dateStr} ${startStr}`,
                        appointment_end: `${dateStr} ${endStr}`,
                        method: data.method,
                        status: data.status,
                        remarks: data.remarks,
                        comments: data.comments,
                        doctor: data.doctor,
                        patient: data.patient,
                      },
                    })
                  );
                },
                props: {
                  appointment: calendarEvent,
                },
              })
            );
          }}
          fontSize="small"
          sx={{ color: (theme) => theme.palette.primary.light }}
        />
      </div>

      {/* title */}
      <h1 className="text-gray-600 font-semibold text-[1rem] md:text-[.7rem] xl:text-[.8rem] ">
        {title}
      </h1>
      {/* Doctor */}
      <h1
        style={{ color: color }}
        className=" text-[.7rem] md:text-[.6rem] xl:text-[.75rem] truncate font-semibold "
      >
        {capitalize(doctor.name)}
      </h1>
      {/* Patient */}
      <h1 className="text-gray-500 text-[.7rem] md:text-[.6rem] xl:text-[.75rem] font-semibold truncate">
        {capitalize(patient.name)}
      </h1>
    </div>
  );
}

// Helpers
function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
