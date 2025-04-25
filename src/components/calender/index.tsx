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
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   //
// } from "@mui/material";
// import dayjs, { Dayjs } from "dayjs";
// import { TimePicker, DatePicker } from "@mui/x-date-pickers";
import { useAppDispatch } from "../../utils/hooks";
import { showModal } from "../../data/features/modal/modalSlice";

const today = new Date().toISOString().split("T")[0];

const customComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
};

interface CalendarProps {
  person: string;
}

function Calendar({ person }: CalendarProps) {
  // const [doctor, setDoctor] = useState("");
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  // const [timeStartValue, setTimeStartValue] = useState<Dayjs | null>(null);
  // const [timeEndValue, setTimeEndValue] = useState<Dayjs | null>(null);
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
            // onSubmit: handleSumbit,
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

  // const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
  //   const formData = new FormData(event.currentTarget);
  //   const formJson = Object.fromEntries((formData as FormData).entries());
  //   console.log(formJson);
  //   const color = (() => {
  //     switch (doctor) {
  //       case "alice":
  //         return "#a02920";
  //       case "bob":
  //         return "#5D576B";
  //       case "charlie":
  //         return "#202b90";
  //       case "diana":
  //         return "#7067CF";
  //       case "ethan":
  //         return "#7B287D";
  //       default:
  //         return "#000000"; // Default color
  //     }
  //   })();
  //   setCalEvents((prev) => {
  //     const newEvent = {
  //       id: Date.now(),
  //       start:
  //         dateValue?.format("YYYY-MM-DD") +
  //         " " +
  //         timeStartValue?.format("HH:mm"),
  //       end:
  //         dateValue?.format("YYYY-MM-DD") + " " + timeEndValue?.format("HH:mm"),
  //       title: formJson.title as string,
  //       patientName: formJson.patientName as string,
  //       phoneNumber: formJson.phoneNumber as string,
  //       doctor,
  //       color,
  //       owner: person, // Add the owner property
  //       _customContent: {
  //         monthGrid: "",
  //         monthAgenda: "",
  //         timeGrid: "",
  //         dateGrid: "",
  //       }, // Add the _customContent property
  //     };
  //     return [...prev, newEvent];
  //   });
  // };

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
      {/* Kept here just in case */}
      {/* <Dialog
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(
                (formData as FormData).entries()
              );
              console.log(formJson);
              const color = (() => {
                switch (doctor) {
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
                    return "#000000"; // Default color
                }
              })();
              setCalEvents((prev) => {
                const newEvent = {
                  id: Date.now(),
                  start:
                    dateValue?.format("YYYY-MM-DD") +
                    " " +
                    timeStartValue?.format("HH:mm"),
                  end:
                    dateValue?.format("YYYY-MM-DD") +
                    " " +
                    timeEndValue?.format("HH:mm"),
                  title: formJson.title as string,
                  patientName: formJson.patientName as string,
                  phoneNumber: formJson.phoneNumber as string,
                  doctor,
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
              setDialogOpen(false);
            },
          },
        }}
      >
        <DialogTitle>Create an Appointment</DialogTitle>
        <DialogContent
          sx={{ padding: 2, display: "flex", gap: 2, flexDirection: "column" }}
        >
          <DatePicker
            name="date"
            label="Date"
            value={dateValue ? dateValue.toDate() : null}
            onChange={(newValue) =>
              setDateValue(newValue ? dayjs(newValue) : null)
            }
          />
          <TimePicker
            label="Start Time"
            name="startTime"
            value={timeStartValue ? timeStartValue.toDate() : null}
            onChange={(newValue) =>
              setTimeStartValue(newValue ? dayjs(newValue) : null)
            }
          />
          <TimePicker
            label="End Time"
            name="endTime"
            value={timeEndValue ? timeEndValue.toDate() : null}
            onChange={(newValue) =>
              setTimeEndValue(newValue ? dayjs(newValue) : null)
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="patientName"
            name="patientName"
            label="Patient Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            required
            margin="dense"
            id="phoneNumber"
            name="phoneNumber"
            label="Patient Phone Number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="doctor-label">Doctor</InputLabel>
            <Select
              labelId="doctor-label"
              id="doctor"
              value={doctor}
              label="Doctor"
              onChange={(event) => setDoctor(event.target.value as string)}
            >
              <MenuItem value={"alice"}>Alice</MenuItem>
              <MenuItem value={"bob"}>Bob</MenuItem>
              <MenuItem value={"charlie"}>Charlie</MenuItem>
              <MenuItem value={"diana"}>Diana</MenuItem>
              <MenuItem value={"ethan"}>Ethan</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default Calendar;
