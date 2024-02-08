import React, { useContext } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";

import ContextCalendar from "./context-calendar";

const CalendarHeader = () => {
  dayjs.locale("id");
  const { monthIndex, setMonthIndex } = useContext(ContextCalendar);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <header className="px-4 py-2 items-center">
      <h2 className="text-xl font-semibold col-span-2 my-5">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <div className="flex justify-between items-center mb-5">
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-xl font-bold border py-1 px-2  mx-2">
              &lt;
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-xl font-bold border py-1 px-2  mx-2">
              &gt;
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
