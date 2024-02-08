import React from "react";
import Day from "./day";
export default function Month({
  month,
  events,
}: {
  month: any[];
  events: any[];
}) {

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-6">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day: any, index: number) => (
            <Day day={day} key={index} rowIndex={i} events={events}/>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
