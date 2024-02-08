import React, { useState } from "react";
import ContextCalendar from "./context-calendar";
import dayjs from "dayjs";
import "dayjs/locale/id";

const CalendarWraperContext = ({ children }: { children: React.ReactNode }) => {
  dayjs.locale("id");
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  return (
    <ContextCalendar.Provider value={{ monthIndex, setMonthIndex }}>
      {children}
    </ContextCalendar.Provider>
  );
};

export default CalendarWraperContext;
