import { useState } from "react";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import {
  Popover,
  Typography,
  Tooltip,
  Divider,
  // Box,
  Stack,
} from "@mui/material";
import { useAppDispatch } from "../../utils/hooks";
import { showModal } from "../../data/features/modal/modalSlice";
import { updateEvent } from "../../data/features/calender/calenderSlice";

type CalendarEvent = {
  id: number | string;
  name: string;
  start: string;
  end: string;
  color: string;
  status: "scheduled" | "delayed" | "checked_in" | "running" | "checked_out";
  doctor: { id: number; name: string };
  patient: { id: number; name: string };
  comments?: string;
  remarks?: string;
};

type Props = {
  calendarEvent: CalendarEvent;
};

const statusColors: Record<CalendarEvent["status"], string> = {
  scheduled: "#3B82F6",
  delayed: "#F59E0B",
  checked_in: "#10B981",
  running: "#6366F1",
  checked_out: "#6B7280",
};

export default function CustomTimeGridEvent({ calendarEvent }: Props) {
  const dispatch = useAppDispatch();
  const { start, end, patient, doctor, color, status, name } = calendarEvent;
  const title = `${dayjs(start).format("hh:mm A")} - ${dayjs(end).format(
    "hh:mm A"
  )}`;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
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
  };

  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <div
        className="group relative h-[97%] w-full m-auto border-1 border-gray-100 bg-gray-200 text-gray-200 rounded-lg p-1 pr-[1.1rem] flex flex-col justify-start gap-.5 shadow-md overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* Status Bar */}
        <Tooltip
          title={capitalize(status.replace("_", " "))}
          placement="top"
          arrow
        >
          <div
            style={{ backgroundColor: statusColors[status] }}
            className="absolute h-full w-4 top-0 right-0"
          />
        </Tooltip>

        {/* Optional hover icon */}
        <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out z-10">
          <EditIcon
            fontSize="small"
            sx={{ color: "#4b5563" }}
            onClick={handleEdit}
          />
        </div>

        {/* Info */}
        <h1 className="text-gray-600 font-semibold text-[1rem] md:text-[.7rem] xl:text-[.8rem]">
          {title}
        </h1>
        <h1
          style={{ color: color }}
          className="text-[.7rem] md:text-[.6rem] xl:text-[.75rem] truncate font-semibold"
        >
          {capitalize(doctor.name)}
        </h1>
        <h1 className="text-gray-500 text-[.7rem] md:text-[.6rem] xl:text-[.75rem] font-semibold truncate">
          {capitalize(patient.name)}
        </h1>
      </div>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: 320,
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            overflow: "auto",
            maxHeight: "60vh",
            m: 2,
          },
        }}
        marginThreshold={8}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Title
          </Typography>
          <Typography>{name}</Typography>

          <Divider />

          <Typography variant="subtitle2" color="text.secondary">
            Time
          </Typography>
          <Typography>
            {dayjs(start).format("YYYY-MM-DD HH:mm")} –{" "}
            {dayjs(end).format("HH:mm")}
          </Typography>

          <Divider />

          <Typography variant="subtitle2" color="text.secondary">
            Doctor
          </Typography>
          <Typography>{doctor.name}</Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Patient
          </Typography>
          <Typography>{patient.name}</Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Status
          </Typography>
          <Typography>{capitalize(status.replace("_", " "))}</Typography>
          <Divider />

          <Typography variant="subtitle2" color="text.secondary">
            Remarks
          </Typography>
          <Typography whiteSpace="pre-line">
            {calendarEvent.remarks || "–"}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
            Comments
          </Typography>
          <Typography whiteSpace="pre-line">
            {calendarEvent.comments || "–"}
          </Typography>
        </Stack>
      </Popover>
    </>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
