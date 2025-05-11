import { useMemo, useEffect, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  viewWeek,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import CustomTimeGridEvent from "./CustomTimeGridEvent";
import CustomDateGridEvent from "./CustomDateGridEvent";
import "@schedule-x/theme-default/dist/index.css";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { showModal } from "../../data/features/modal/modalSlice";
import {
  CalendarEvent,
  createEvent,
  updateEvent,
} from "../../data/features/calender/calenderSlice";
import dayjs from "dayjs";
import { showSnackbar } from "../../data/features/snackbar/snackbarSlice";

const today = new Date().toISOString().split("T")[0];

const customComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
};

function Calendar() {
  const eventsServicePlugin = useMemo(() => createEventsServicePlugin(), []);
  const eventModal = createEventModalPlugin();
  const { appointments } = useAppSelector((state) => state.calender);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [updatedEventId, setUpdatedEventId] = useState<number | null>(null);
  const [doctorAppointments, setDoctorAppointments] = useState<CalendarEvent[]>(
    []
  );
  console.log("doctorAppointments from outside component:", doctorAppointments);
  const dispatch = useAppDispatch();
  const calendar = useCalendarApp({
    locale: "en-US",
    selectedDate: today,
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [createDragAndDropPlugin(1), eventsServicePlugin, eventModal],

    weekOptions: {
      eventOverlap: false,
      gridHeight: 1000,
     
    },
    dayBoundaries: {
      start: "06:00",
      end: "18:00",
    },
    callbacks: {
      onRangeUpdate(range) {
        console.log("new calendar range start date", range.start);
        console.log("new calendar range end date", range.end);
      },

      onEventUpdate(updatedEvent) {
        console.log("onEventUpdate", updatedEvent);
        const newStart = dayjs(updatedEvent.start);
        const newEnd = dayjs(updatedEvent.end);

        // Extract doctor ID from the updated event
        const doctorId =
          typeof updatedEvent.doctor === "object"
            ? updatedEvent.doctor?.id
            : updatedEvent.doctor;

        // Get current appointments from Redux store
        const currentDoctorAppointments = appointments.filter((appt) => {
          const apptDoctorId =
            typeof appt.doctor === "object" ? appt.doctor.id : appt.doctor;
          return (
            apptDoctorId === doctorId && appt.id !== Number(updatedEvent.id)
          );
        });
        console.log("currentDoctorAppointments", currentDoctorAppointments);
        // Check for overlapping appointments
        const isOverlapping = currentDoctorAppointments.some((appt) => {
          const apptStart = dayjs(appt.start);
          const apptEnd = dayjs(appt.end);

          return newStart.isBefore(apptEnd) && newEnd.isAfter(apptStart);
        });

        if (isOverlapping) {
          dispatch(
            showSnackbar({
              message: "This doctor has overlapping appointments.",
              severity: "error",
            })
          );
          return false; // Prevent the update
        }

        dispatch(
          updateEvent({
            id: Number(updatedEvent.id),
            values: {
              appointment_start: newStart.format("YYYY-MM-DD HH:mm"),
              appointment_end: newEnd.format("YYYY-MM-DD HH:mm"),
              doctor: updatedEvent.doctor,
              patient: updatedEvent.patient,
              method: updatedEvent.method,
              status: updatedEvent.status,
              remarks: updatedEvent.remarks,
              comments: updatedEvent.comments,
            },
          })
        );
      },

      onEventClick(calendarEvent) {
        console.log("onEventClick", calendarEvent);
      },

      onDoubleClickEvent(calendarEvent) {
        console.log("onDoubleClickEvent", calendarEvent);
      },

      onClickDate(date) {
        console.log("onClickDate", date); // e.g. 2024-01-01
      },

      onClickDateTime(dateTime) {
        console.log("onClickDateTime", dateTime);
        // setDialogOpen(true);
        dispatch(
          showModal({
            title: "Add Appointment",
            type: "appointment",
            onSubmit: (data) => {
              const dateStr = dayjs(data.date).format("YYYY-MM-DD");
              const startStr = dayjs(data.startTime).format("HH:mm:ss");
              const endStr = dayjs(data.endTime).format("HH:mm:ss");

              dispatch(
                createEvent({
                  name: data.name,
                  appointment_start: `${dateStr} ${startStr}`,
                  appointment_end: `${dateStr} ${endStr}`,
                  method: data.method,
                  status: data.status,
                  remarks: data.remarks,
                  comments: data.comments,
                  doctor: data.doctor,
                  patient: data.patient,
                })
              );
            },
            props: {
              dateTime,
            },
          })
        );
      },

      /**
       * Is called when selecting a day in the month agenda
       * */
      onClickAgendaDate(date) {
        console.log("onClickAgendaDate", date); // e.g. 2024-01-01
      },

      /**
       * Is called when double clicking a day in the month agenda
       * */
      onDoubleClickAgendaDate(date) {
        console.log("onDoubleClickAgendaDate", date); // e.g. 2024-01-01
      },

      onDoubleClickDate(date) {
        console.log("onClickDate", date); // e.g. 2024-01-01
      },

      /**
       * Is called when double clicking somewhere in the time grid of a week or day view
       * */
      onDoubleClickDateTime(dateTime) {
        console.log("onDoubleClickDateTime", dateTime); // e.g. 2024-01-01 12:37
      },

      /**
       * Is called when clicking the "+ N events" button of a month grid-day
       * */
      onClickPlusEvents(date) {
        console.log("onClickPlusEvents", date); // e.g. 2024-01-01
      },

      /**
       * Is called when the selected date is updated
       * */
      onSelectedDateUpdate(date) {
        console.log("onSelectedDateUpdate", date);
      },
    },
    events: [],
  });

  useEffect(() => {
    if (eventsServicePlugin?.set) {
      eventsServicePlugin.set(appointments);
    }
  }, [appointments, eventsServicePlugin]);

  useEffect(() => {
    const filteredAppointments = appointments.filter(
      (entry) => entry.doctor.id === doctorId && entry.id !== updatedEventId
    );
    setDoctorAppointments(filteredAppointments);
  }, [appointments, doctorId, updatedEventId]);
  return (
    <>
      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={customComponents}
      />
    </>
  );
}

export default Calendar;
