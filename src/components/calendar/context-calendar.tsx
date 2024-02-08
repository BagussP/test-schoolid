    import React from "react";

    type ContextCalendarProps = {
      monthIndex: number;
      setMonthIndex: (index: number) => void;
    };

    const ContextCalendar = React.createContext<ContextCalendarProps>({
        monthIndex: 0,
        setMonthIndex: (index) => {}
    });

    export default ContextCalendar;
