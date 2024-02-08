"use client";
import { useState, useEffect, useMemo } from "react";
import { DateIcon } from "@/components/buttons-icons";
import { BasicTable } from "@/components/table";
import { API_URL, TOKEN } from "@/utils/api";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState<ApiResponseData | null>(null);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    }),
    [] // Tidak ada dependensi, karena inisialisasi hanya dilakukan sekali
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/absens?page=1&item_per_page=5`,
          { headers }
        );
        const responseData: ApiResponse = await response.json();
        console.log(responseData.data);
        setData(responseData.data as ApiResponseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [headers]);

  const handlePagination = async (
    e: string | null | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // try {
    //   const response = await fetch(`${e}&item_per_page=10`, {
    //     headers,
    //   });
    //   const responseData: ApiResponse = await response.json();
    //   console.log(responseData.data);
    //   setData(responseData.data as ApiResponseData);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

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

  if (data != null) {
    return (
      <div className="flex flex-col">
        <div className="flex px-25 gap-2 h-52 bg-primary text-white justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-2xl ml-25 mt-7">Halo Muhammad!</h1>
            <p className="ml-25">
              Selamat datang di Portal Admin MI Sabilussalam
            </p>
          </div>
          <div className="w-[164px] flex justify-between items-center cursor-pointer h-[44px] rounded-[9px] box-border px-4 py-3 bg-white bg-opacity-[.16] text-white mt-10 mx-25">
            <p>Bulan ini</p>
            <DateIcon />
          </div>
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
              {"data" in data
                ? (data.data as Attendance[]).filter(
                    (data) => data.status.toLowerCase() == "on time"
                  ).length
                : 0}{" "}
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
              {"data" in data
                ? (data.data as Attendance[]).filter(
                    (data) => data.status.toLowerCase() == "late"
                  ).length
                : 0}{" "}
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
              {"data" in data
                ? (data.data as Attendance[]).filter(
                    (data) => data.status.toLowerCase() == "absens"
                  ).length
                : 0}{" "}
              Guru
            </h1>
          </div>
        </div>

        <div className="mt-[136px]">
          <BasicTable
            head={table.head}
            body={data}
            from="dashboard"
            handlePagination={handlePagination}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <h1>Loading...</h1>
      </div>
    );
  }
}
