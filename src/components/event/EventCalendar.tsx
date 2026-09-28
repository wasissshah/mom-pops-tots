"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction";
import type { DayCellContentArg } from "@fullcalendar/core";
import { calendarEvents } from "@/data/home";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const marks: Record<string, "yellow" | "pink" | "green"> = {
  "2026-01-01": "yellow",
  "2026-01-14": "pink",
  "2026-01-18": "green",
};

const dateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export default function EventCalendar() {
  const [selectedKey, setSelectedKey] = useState("2026-01-18");
  const [year, month, day] = selectedKey.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const selectedTitle = `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${selectedDate.getFullYear()}`;

  return (
    <section className="event-calendar">
      <div className="container">
        <div className="text-center">
          <span className="section-eyebrow d-block">Upcoming Events</span>
          <h2 className="section-title section-title--center">Community Calendar</h2>
        </div>
      </div>
      <div className="calendar" data-calendar>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-0">
              <div className="calendar__wrapper">
                <div className="calendar__fc">
                  <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    initialDate={selectedKey}
                    firstDay={1}
                    height="auto"
                    showNonCurrentDates={false}
                    fixedWeekCount={false}
                    headerToolbar={{ left: "title", right: "prev,next" }}
                    dayHeaderFormat={{ weekday: "long" }}
                    dayCellClassNames={(arg) => (dateKey(arg.date) === selectedKey ? ["is-selected"] : [])}
                    dayCellContent={(arg: DayCellContentArg) => {
                      const mark = marks[dateKey(arg.date)];
                      return (
                        <>
                          {arg.dayNumberText}
                          {mark && <i className={`calendar__dot calendar__dot--${mark}`} />}
                        </>
                      );
                    }}
                    dateClick={(info: DateClickArg) => setSelectedKey(dateKey(info.date))}
                  />
                </div>
                <ul className="calendar__legend">
                  <li><i className="calendar__dot calendar__dot--yellow" /> Baby &amp; Toddler</li>
                  <li><i className="calendar__dot calendar__dot--green" /> Kids Parenting</li>
                  <li><i className="calendar__dot calendar__dot--pink" /> Family Outdoor</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="calendar__panel">
                <h3>{selectedTitle}</h3>
                <div className="calendar__list">
                  {calendarEvents.map((event, i) => (
                    <a className="calendar-event" href="#" key={i}>
                      <div className="calendar-event__thumb"><img src={event.img} alt="" /><span className="tag">Event</span></div>
                      <div className="calendar-event__body">
                        <span className="calendar-event__time">{event.time}</span>
                        <h4>{event.title}</h4>
                        <p><svg><use href="#i-pin" /></svg> {event.place}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
