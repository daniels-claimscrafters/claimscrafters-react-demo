// CardActivityTracker.jsx

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendarStyles.css"; // Import your custom styles

const localizer = momentLocalizer(moment);

const styles = {
  calendarContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none", // Remove border for the entire calendar
    padding: "3px",
  },
  calendar: {
    border: "none", // Remove border for the calendar component
  },
  highlightedDate: {
    backgroundColor: "#2a84ea", // Customize the color for highlighted date cells
  },
};

const CardActivityTracker = ({ events }) => {
  const [date, setDate] = useState(new Date());
  console.log("Events2.1:", events);

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    console.log("Events2:", events);
  }, []);

  const eventDates = events.map((event) =>
    moment(event.start).format("YYYY-MM-DD")
  );

  const dayPropGetter = (date) => {
    const dateString = moment(date).format("YYYY-MM-DD");
    // Loop through all events and check if the current date is within any event's range
    for (const event of events) {
      const eventStartDate = moment(event.start).startOf("day"); // Start date of the event
      const eventEndDate = moment(event.end).startOf("day"); // End date of the event
      if (
        moment(dateString).isBetween(eventStartDate, eventEndDate, null, "[]")
      ) {
        return {
          className: "custom-date-cell highlighted-cell", // Apply custom CSS class
          style: styles.highlightedDate, // Apply custom styles
        };
      }
    }
    return {};
  };

  console.log("Events2.5:", events);

  return (
    <div className="calendarCard">
      <div className="rbc-calendar" style={styles.calendarContainer}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={styles.calendar}
          dayPropGetter={dayPropGetter}
        />
      </div>
    </div>
  );
};

export default CardActivityTracker;
