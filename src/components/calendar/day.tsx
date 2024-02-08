import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
// import GlobalContext from "../context/GlobalContext";

export default function Day({
  day,
  rowIndex,
  events,
}: {
  day: any;
  rowIndex: number;
  events: any[];
}) {
  const [dayEvents, setDayEvents] = useState<any[] | DateProps[]>([]);

  useEffect(() => {
    // Filter events for the current day
    const eventsForDay = events.filter(
      (evt: DateProps) => evt.date === day.format("YYYY-MM-DD")
    );
    setDayEvents(eventsForDay);
  }, [events, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full h-fit w-fit"
      : "";
  }
  return (
    <div className="border w-full h-[150px] border-gray-200 flex flex-col">
      <header>
        {rowIndex === 0 && (
          <p className="border-b text-center">
            {day.format("dddd").toUpperCase()}
          </p>
        )}
      </header>

      {dayEvents.length != 0 ? (
        dayEvents.map((event, index) => (
          <p
            key={index}
            className={`${
              event.is_national_holiday ? "text-[#E21C1C]" : ""
            } font-bold  p-1 px-2 m-2 ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        ))
      ) : (
        <p className={` font-bold  p-1 px-2 m-2 ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      )}
      {dayEvents.map((event, index) => (
        <div
        key={index}
          className={`overflow-hidden w-4/5 flex-col rounded-full  mx-auto  ${
            event.is_national_holiday ? "bg-[#FFF0F0] text-[#E21C1C] font-semibold" : ""
          }`}
        >
          <p className="p-1 text-center text-sm rounded-full" key={index}>
            {typeof event.event_name == "string" && event.event_name.length > 12
              ? `${event.event_name.slice(0, 12)}...`
              : event.event_name}
          </p>
        </div>
      ))}
    </div>
  );
}
