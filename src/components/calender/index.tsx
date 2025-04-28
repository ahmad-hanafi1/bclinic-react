import { useMemo, useState, useEffect } from "react";
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
import calenderEvents from "../../utils/dummy.json";
import CustomTimeGridEvent from "./CustomTimeGridEvent";
import CustomDateGridEvent from "./CustomDateGridEvent";
import "@schedule-x/theme-default/dist/index.css";
import { useAppDispatch } from "../../utils/hooks";
import { showModal } from "../../data/features/modal/modalSlice";
import dayjs from "dayjs";

const today = new Date().toISOString().split("T")[0];

const customComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
};

interface CalendarProps {
  person: string;
}

function Calendar({ person }: CalendarProps) {
  const eventsServicePlugin = useMemo(() => createEventsServicePlugin(), []);
  const eventModal = createEventModalPlugin();
  const dispatch = useAppDispatch();

  const allEvents = useMemo(
    () =>
      calenderEvents.flatMap((person) =>
        person.events.map((event) => ({
          ...event,
          owner: person.name,
        }))
      ),
    []
  );

  const [calEvents, setCalEvents] = useState(allEvents);

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
            onSubmit: handleSubmit,
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

  const handleSubmit = (data: any) => {
    console.log("data", data);
    const color = (() => {
      switch (data?.doctor) {
        case "alice":
          return "#a02920";
        case "bob":
          return "#5D576B";
        case "charlie":
          return "#202b90";
        case "diana":
          return "#7067CF";
        case "ethan":
          return "#7B287D";
        default:
          return "";
      }
    })();

    const date = dayjs(data.date).format("YYYY-MM-DD");
    const startTime = dayjs(data.startTime).format("HH:mm");
    const endTime = dayjs(data.endTime).format("HH:mm");
    setCalEvents((prev) => {
      const newEvent = {
        id: Date.now(),
        start: date + " " + startTime,
        end: date + " " + endTime,
        patientName: data?.patientName,
        phoneNumber: data?.phoneNumber,
        doctor: data?.doctor,
        title: data?.patientName,
        color,
        owner: person, // Add the owner property
        _customContent: {
          monthGrid: "",
          monthAgenda: "",
          timeGrid: "",
          dateGrid: "",
        }, // Add the _customContent property
      };
      return [...prev, newEvent];
    });
  };

  useEffect(() => {
    if (person === "all") {
      setCalEvents(allEvents);
    } else {
      setCalEvents(allEvents.filter((event) => event.owner === person));
    }
  }, [person, allEvents]);

  useEffect(() => {
    if (eventsServicePlugin?.set) {
      eventsServicePlugin.set(calEvents);
    }
  }, [calEvents, eventsServicePlugin]);

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
