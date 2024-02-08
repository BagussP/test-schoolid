"use client";
import React, { useState } from "react";

import CalendarWraperContext from "@/components/calendar/calendar-wraper-context";
import IndexCalendar from "@/components/calendar";
import { AddEvent } from "@/components/calendar/form-kalendar";
import { DeleteEvent } from "@/components/calendar/delete-date";
function Page() {
  const [formDisplay, setformDisplay] = useState(false)
  const [deleteDisplay, setdeleteDisplay] = useState(false)


    const toggleFormDisplay = () => {
      setformDisplay(!formDisplay);
    };
    const toggleDeleteDisplay = () => {
      setdeleteDisplay(!deleteDisplay);
    };

  return (
    <div>
      <div className="flex px-25 gap-2 h-52 bg-primary text-white justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl ml-25 mt-7">Halo Admin!</h1>
          <p className="ml-25">
            Selamat datang di Portal Admin MI Sabilussalam
          </p>
        </div>
        <div className="w-fit flex gap-4 mr-25 ">
          <button
            onClick={toggleDeleteDisplay}
            className="font-medium text-[#E21C1C] bg-white w-fit h-fit px-6 py-2 rounded-full mt-12"
          >
            Hapus Jadwal & Acara +
          </button>
          <button
            onClick={toggleFormDisplay}
            className="font-medium text-primary bg-white w-fit h-fit px-6 py-2 rounded-full first-letter mt-12"
          >
            Tambah Jadwal & Acara +
          </button>
        </div>
      </div>
      <div className="relative flex-grow h-fit mx-25 -mt-[104px] bg-white flex flex-col box-border gap-6 p-6 rounded-t-[20px]">
        <CalendarWraperContext>
          <IndexCalendar />
        </CalendarWraperContext>
      </div>
      <AddEvent status={formDisplay} onClose={toggleFormDisplay} />
      <DeleteEvent status={deleteDisplay} onClose={toggleDeleteDisplay} />
    </div>
  );
}

export default Page;
