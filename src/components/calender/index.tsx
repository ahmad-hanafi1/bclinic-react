import { useMemo, useEffect } from "react";
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
import { updateEvent } from "../../data/features/calender/calenderSlice";
import dayjs from "dayjs";

const today = new Date().toISOString().split("T")[0];

const customComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
};

function Calendar() {
  const eventsServicePlugin = useMemo(() => createEventsServicePlugin(), []);
  const eventModal = createEventModalPlugin();
  const { appointments } = useAppSelector((state) => state.calender);
  const dispatch = useAppDispatch();

  const calendar = useCalendarApp({
    locale: "en-US",
    selectedDate: today,
    defaultView: viewWeek.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    plugins: [createDragAndDropPlugin(60), eventsServicePlugin, eventModal],
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
        dispatch(
          updateEvent({
            id: Number(updatedEvent.id),
            appointment_start: dayjs(updatedEvent.start).format(
              "YYYY-MM-DD HH:mm"
            ),
            appointment_end: dayjs(updatedEvent.end).format("YYYY-MM-DD HH:mm"),
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
            title: "Create an Appointment",
            type: "add-appointment",
            props: { dateTime: dateTime },
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
