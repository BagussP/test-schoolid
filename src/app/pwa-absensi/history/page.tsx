"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, ID, ROLE, TOKEN } from "@/utils/api";
import { useRouter } from "next/navigation";
import {
  PWAHistoryIcon,
  PWAHomeIcon,
  PWAOtherIcon,
} from "@/components/buttons-icons";
import Image from "next/image";

type profile = {
  data: Attendance[];
};

function PwaAbsensi() {
  const [historyAbsens, setHistoryAbsens] = useState<profile | null>(null);
  const router = useRouter();

  const formattedDate = useEffect(() => {
    if (TOKEN && (ROLE == "1" || ROLE == "2")) {
      const getProfile = async () => {
        try {
          const response = await fetch(
            `${API_URL}/absens/getabsen?user_id=${ID}`,
            {
              method: "POST",
              headers: {
                "School-Code": "SBBSALAM",
                Authorization: `Bearer ${TOKEN}`,
              },
            }
          );
          const responseData = await response.json();
          console.log("data", responseData.data);
          setHistoryAbsens(responseData.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProfile();
    } else {
      router.push("/login");
    }
  }, [router]);

  // Pastikan Anda hanya menggunakan localStorage saat di sisi klien
  if (historyAbsens != null && historyAbsens.data.length > 0) {
    return (
      <main className="max-sm:text-sm max-sm:relative max-sm:w-full max-sm:h-screen pb-24 max-sm:bg-white max-sm:text-black">
        <h1 className="text-center pt-10 mb-5 font-medium text-base">
          Riwayat Absensi
        </h1>
        <article className="flex flex-col gap-5 px-3">
          {historyAbsens.data.map((data, index) => (
            <div
              key={index}
              className="flex justify-between items-center box-border p-4 rounded-lg border-2"
            >
              <div className="w-3/5 flex-col flex gap-[6px]">
                <h1
                  suppressHydrationWarning={true}
                  className="font-medium text-base"
                >
                  {new Intl.DateTimeFormat("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(data.date))}
                </h1>
                <h1 className="text-primary">
                  {data.in_time} - {data.out_time}
                </h1>
                <h1>Lokasi: {data.location}</h1>
                <h1>{data.lunch ? "Makan siang" : ""}</h1>
              </div>
              <div
                className={`text-center px-4 py-2 rounded-xl ${
                  data.status
                    ? "bg-[#EEFBEF] text-primary"
                    : "bg-[#FFF0F0] text-[#E21C1C]"
                }`}
              >
                <p className="w-[60px] break-words">
                  {data.status ? "Tepat Waktu" : "Terlambat"}
                </p>
              </div>
            </div>
          ))}
        </article>

        <nav className="max-sm:fixed max-sm:bottom-0 z-50 max-sm:bg-white max-sm:shadow-2xl text-black max-sm:py-3 max-sm:w-full max-sm:flex max-sm:justify-around max-sm:items-center">
          <Link className="flex flex-col items-center" href={"/pwa-absensi/"}>
            <PWAHomeIcon stroke="#A1A0A3" fill="none" />
            <h1>Home</h1>
          </Link>
          <Link
            className="flex flex-col items-center"
            href={"/pwa-absensi/history"}
          >
            <PWAHistoryIcon stroke="#179778" />
            Absensi
          </Link>
          <Link
            className="flex flex-col items-center"
            href={"/pwa-absensi/lainnya"}
          >
            <PWAOtherIcon fill="#A1A0A3" />
            <h1>Lainnya</h1>
          </Link>
        </nav>
      </main>
    );
  } else if (historyAbsens != null && historyAbsens.data.length == 0) {
    return (
      <div>
        <h1 className="left-1/2 -translate-x-1/2 font-medium absolute top-10">
          Riwayat Absensi
        </h1>
        <div className="w-full flex flex-col items-center justify-center h-screen">
          <Image
            src={"/images/thumbnail/pwaabsensi.png"}
            width={180}
            height={180}
            alt="Not Found"
          />
          <h1 className="w-9/12 text-center text-xl font-bold mt-5">
            Ups, data absensi Kamu Masih Kosong
          </h1>
          <nav className="max-sm:fixed max-sm:bottom-0 z-50 max-sm:bg-white max-sm:shadow-2xl text-black max-sm:py-3 max-sm:w-full max-sm:flex max-sm:justify-around max-sm:items-center">
            <Link className="flex flex-col items-center" href={"/pwa-absensi/"}>
              <PWAHomeIcon stroke="#A1A0A3" fill="none" />
              <h1>Home</h1>
            </Link>
            <Link
              className="flex flex-col items-center"
              href={"/pwa-absensi/history"}
            >
              <PWAHistoryIcon stroke="#179778" />
              Absensi
            </Link>
            <Link
              className="flex flex-col items-center"
              href={"/pwa-absensi/lainnya"}
            >
              <PWAOtherIcon fill="#A1A0A3" />
              <h1>Lainnya</h1>
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default PwaAbsensi;
