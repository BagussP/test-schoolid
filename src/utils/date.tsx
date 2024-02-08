import dayjs from "dayjs";
import "dayjs/locale/id";

export function getMonth(month = dayjs().month()) {
  dayjs.locale("id");
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getFormattedDateToday(): string {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1; // Months are zero-based
  const day: number = today.getDate();

  // Format tanggal
  const formattedDate: string = `${year}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  // Buat objek Date dari string yang diformat
  const dateObj: Date = new Date(formattedDate);

  return dateObj.toISOString().slice(0, 10);
}

export function getDatesOfWeekContainingDate(date: string) {
  const targetDate = dayjs(`${date}`);
  const startOfWeek = targetDate.startOf("week");

  const datesOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.add(i, "day");
    datesOfWeek.push(currentDate.format("YYYY-MM-DD"));
  }

  return datesOfWeek;
}

export function getDatesOfMonthContainingDate(date: string) {
  const targetDate = dayjs(date);
  const startOfMonth = targetDate.startOf("month");
  const endOfMonth = targetDate.endOf("month");

  const datesOfMonth = [];
  let currentDate = startOfMonth;

  while (currentDate.isBefore(endOfMonth)) {
    datesOfMonth.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }

  return datesOfMonth;
}

export function getDateRange(start: string, end: string) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const dateRange = [];

  let currentDate = startDate;
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    dateRange.push(
      Math.ceil(
        (new Date(currentDate.format("YYYY-MM-DD")).getTime() -
          new Date(
            new Date(currentDate.format("YYYY-MM-DD")).getFullYear(),
            0,
            1
          ).getTime()) /
          86400000
      )
    );
    currentDate = currentDate.add(1, "day");
  }

  return dateRange;
}

const startDate = "2023-01-01";
const endDate = "2023-01-05";

const result = getDateRange(startDate, endDate);
console.log(result);
