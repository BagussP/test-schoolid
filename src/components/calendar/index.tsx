"use client";
import React, { useState, useContext, useEffect, useMemo } from "react";
import { getMonth } from "@/utils/date";
import Month from "@/components/calendar/month";
import CalendarHeader from "@/components/calendar/calendar-header";
import ContextCalendar from "@/components/calendar/context-calendar";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { API_URL, TOKEN } from "@/utils/api";

function IndexCalendar() {
  dayjs.locale("id");
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(ContextCalendar);
  const [events, setEvents] = useState<any[]>([]);
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${TOKEN}`,
      "School-Code": "SBBSALAM",
      "Content-Type": "application/json",
    }),
    []
  );

  useEffect(() => {
      setCurrentMonth(getMonth(monthIndex));

      // Call your API to fetch events based on the current month
      // Update the URL with your actual API endpoint
    const getDate = async () => {
      try {
        const response = await fetch(
          `${API_URL}/kalendar?month=${dayjs(
            new Date(dayjs().month(), monthIndex)
          ).format("M")}&year=${dayjs(
            new Date(dayjs().year(), monthIndex)
          ).format("YYYY")}&item_per_page=31`,
          {
            method: "GET",
            headers,
          }
        );
        const responseData = await response.json();
        setEvents(responseData.data.data); // Assuming data is an array of events
        console.log(responseData.data.data)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getDate()
  }, [monthIndex, headers]);

  return (
    <div>
      <CalendarHeader />
      <div className="flex flex-1">
        <Month month={currenMonth} events={events}/>
      </div>
    </div>
  );
}

export default IndexCalendar;
