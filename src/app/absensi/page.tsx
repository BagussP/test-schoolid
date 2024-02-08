"use client";
import { useState, useEffect, useMemo } from "react";
import { DateIcon } from "@/components/buttons-icons";
import { BasicTable } from "@/components/table";
import { API_URL, TOKEN } from "@/utils/api";
import Image from "next/image";
import {
  getDatesOfMonthContainingDate,
  getDatesOfWeekContainingDate,
  getFormattedDateToday,
} from "@/utils/date";
// import { tanggalHariIni, week } from "@/utils/formated";

export default function Absensi() {
  const [data, setData] = useState<ApiResponseData | {}>({});
  const [allOfData, setAllOfData] = useState<Attendance[] | []>([]);
  const [sortBy, setSortBy] = useState("day");

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    }),
    [] // Tidak ada dependensi, karena inisialisasi hanya dilakukan sekali
  );

  useEffect(() => {
    const fetchData = async () => {
      let shouldFetch: string | null = `${API_URL}/absens?page=1`;
      setAllOfData([]);
      do {
        try {
          const response = await fetch(`${shouldFetch}`, { headers });
          const responseData: ApiResponse = await response.json();
          setData(responseData.data as ApiResponseData);
          if (sortBy == "day") {
            if (
              (responseData.data.data as Attendance[]).find(
                (data) => data.date === getFormattedDateToday()
              )
            ) {
              setAllOfData((allOfData) => [
                ...allOfData,
                ...(responseData.data.data as Attendance[]).filter(
                  (data) => data.date == getFormattedDateToday()
                ),
              ]);
              shouldFetch = responseData.data.next_page_url;
            } else {
              shouldFetch = null;
            }
          } else if (sortBy == "week") {
            if (
              (responseData.data.data as Attendance[]).some((data) =>
                getDatesOfWeekContainingDate(getFormattedDateToday()).includes(
                  data.date
                )
              )
            ) {
              setAllOfData((allOfData) => [
                ...allOfData,
                ...(responseData.data.data as Attendance[]).filter((data) =>
                  getDatesOfWeekContainingDate(
                    getFormattedDateToday()
                  ).includes(data.date)
                ),
              ]);

              shouldFetch = responseData.data.next_page_url;
            } else {
              shouldFetch = null;
            }
          } else if (sortBy == "month") {
            if (
              (responseData.data.data as Attendance[]).some((data) =>
                getDatesOfMonthContainingDate(getFormattedDateToday()).includes(
                  data.date
                )
              )
            ) {
              setAllOfData((allOfData) => [
                ...allOfData,
                ...(responseData.data.data as Attendance[]).filter((data) =>
                  getDatesOfMonthContainingDate(
                    getFormattedDateToday()
                  ).includes(data.date)
                ),
              ]);
              shouldFetch = responseData.data.next_page_url;
            } else {
              shouldFetch = null;
            }
          }
        } catch (error) {
          shouldFetch = null;
          console.error("Error fetching data:", error);
        }
      } while (typeof shouldFetch === "string");
    };
    fetchData();
  }, [headers, sortBy]);

  const handlePagination = async (e: string | null) => {
    // try {
    //   const response = await fetch(`${e}`, {
    //     headers,
    //   });
    //   const responseData: ApiResponse = await response.json();
    //   console.log(responseData.data);
    //   setData(responseData.data as ApiResponseData);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Pastikan hanya memilih pilihan yang diizinkan
    setSortBy(event.target.value);
    console.log(sortBy);
  };
  console.log(data);
  console.log(allOfData);

  const table = {
    head: [
      "Tanggal",
      "Nama Guru",
      "Masuk",
      "",
      "Keluar",
      "Jam Kerja",
      "Keterangan",
      "Status",
    ],
  };

  return (
    <div className="flex flex-col">
      <div className="flex px-25 gap-2 h-52 bg-primary text-white justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl ml-25 mt-7">Halo Admin</h1>
          <p className="ml-25">
            Selamat datang di Portal Admin MI Sabilussalam
          </p>
        </div>
        {/* <select
          onChange={handleChange}
          className="w-[164px] flex justify-between items-center cursor-pointer h-[44px] rounded-[9px] box-border px-4 py-3 bg-white bg-opacity-[.16] text-white mt-10 mx-25"
        >
          <option className="text-black" value="day">
            Hari ini
          </option>
          <option className="text-black" value="week">
            Minggu ini
          </option>
          <option className="text-black" value="month">
            Bulan ini
          </option>
        </select> */}
      </div>

      <div className="flex-grow mx-25 flex justify-between -mt-[89px]">
        <div className="bg-white box-border w-[392px] h-[178px] p-6 rounded-[20px] flex flex-col justify-center gap-8">
          <div className="flex gap-4 text-xl text-[#A1A0A3] items-center">
            <Image
              src="/icons/absensi/ontime.png"
              width={52}
              height={52}
              alt="ontime"
            />
            <p>TEPAT WAKTU</p>
          </div>
          <h1 className="text-[38px] font-semibold">
            {
              allOfData.filter((data) => data.status.toLowerCase() == "on time")
                .length
            }{" "}
            Guru
          </h1>
        </div>
        <div className="bg-white box-border w-[392px] h-[178px] p-6 rounded-[20px] flex flex-col justify-center gap-8">
          <div className="flex gap-4 text-xl text-[#A1A0A3] items-center">
            <Image
              src="/icons/absensi/late.png"
              width={52}
              height={52}
              alt="ontime"
            />
            <p>MASUK TELAT</p>
          </div>
          <h1 className="text-[38px] font-semibold">
            {
              allOfData.filter((data) => data.status.toLowerCase() == "late")
                .length
            }{" "}
            Guru
          </h1>
        </div>
        <div className="bg-white box-border w-[392px] h-[178px] p-6 rounded-[20px] flex flex-col justify-center gap-8">
          <div className="flex gap-4 text-xl text-[#A1A0A3] items-center">
            <Image
              src="/icons/absensi/absent.png"
              width={52}
              height={52}
              alt="ontime"
            />
            <p>ABSEN</p>
          </div>
          <h1 className="text-[38px] font-semibold">
            {
              allOfData.filter((data) => data.status.toLowerCase() == "absens")
                .length
            }{" "}
            Guru
          </h1>
        </div>
      </div>

      <div className="mt-[136px]">
        <BasicTable
          head={table.head}
          body={allOfData}
          from="absensi"
          handlePagination={handleChange}
        />
      </div>
    </div>
  );
}
