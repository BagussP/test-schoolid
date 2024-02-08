"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, ID, ROLE, TOKEN } from "@/utils/api";
import Image from "next/image";
import {
  NotificationGreenIcon,
  PWAHistoryIcon,
  PWAHomeIcon,
  PWAInIcon,
  PWAOtherIcon,
  PWAOutIcon,
} from "@/components/buttons-icons";
import { useRouter } from "next/navigation";

function PwaAbsensi() {
  const [profile, setProfile] = useState<any | null>(null);
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect start");
    if (TOKEN && (ROLE == "1" || ROLE == "2")) {
      const getProfile = async () => {
        try {
          const response = await fetch(`${API_URL}/getProfile/${ID}`, {
            headers: {
              "School-Code": "SBBSALAM",
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          const response2 = await fetch(`${API_URL}/quotes`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          const responseData = await response.json();
          const responseData2 = await response2.json();
          setImage(responseData2.data.data[0].image);
          setProfile(responseData.data);
          console.log(responseData2.data.data[0].image);
        } catch (error) {
          console.log(error);
        }
      };

      getProfile();
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="max-sm:text-sm max-sm:relative max-sm:w-full max-sm:h-screen max-sm:bg-[#3F3F3F] max-sm:text-white overflow-hidden">
      <article className="max-sm:h-[220px]">
        <div className="max-sm:px-5 pt-12 pb-5 flex justify-between items-center">
          <p className="text-base">Hallo {profile != null && profile.name}!</p>
          <NotificationGreenIcon />
        </div>
        <div>
          <Image
            src={`https://staging.nutshells.id/images/${image}`}
            width={260}
            height={150}
            alt="thumbnail"
            className="max-sm:m-auto"
          />
        </div>
      </article>
      <article className="max-sm:absolute bg-[#ffffff] max-sm:w-full max-sm:h-screen max-sm:top-[260px] max-sm:rounded-t-xl">
        <div className="w-full p-5 max-sm:flex justify-between text-black">
          {profile != null && profile.attendance.in == null ? (
            <Link
              href={"/pwa-absensi/absen-masuk"}
              className=" w-[156px] flex flex-col items-center justify-center h-[80px] text-white gap-1 bg-primary rounded-xl"
            >
              <PWAInIcon stroke="white" />
              Absen Masuk
            </Link>
          ) : (
            <div className=" w-[156px] flex flex-col justify-center box-border p-4 h-[80px] bg-[#f8f8f8] rounded-xl">
              <div className="font-medium text-xl flex justify-between w-full">
                <h1>{profile != null && profile.attendance.in}</h1>
                <PWAInIcon stroke="#A1A0A3" />
              </div>
              <h1 className="text-left text-[#A1A0A3]">Absen Masuk</h1>
            </div>
          )}
          {profile != null &&
          profile.attendance.in != null &&
          profile.attendance.out == null ? (
            <Link
              href={"/pwa-absensi/absen-keluar"}
              className=" w-[156px] flex flex-col items-center justify-center h-[80px] text-white gap-1 bg-primary rounded-xl"
            >
              <PWAOutIcon stroke="white" />
              Absen Keluar
            </Link>
          ) : (
            <div className=" w-[156px] flex flex-col justify-center box-border p-4 h-[80px] bg-[#f8f8f8] rounded-xl">
              <div className="font-medium text-xl flex justify-between w-full">
                <h1>{profile != null && profile.attendance.out}</h1>
                <PWAOutIcon stroke="#A1A0A3" />
              </div>
              <h1 className="text-left text-[#A1A0A3]">Absen Keluar</h1>
            </div>
          )}
        </div>
      </article>
      <nav className="max-sm:fixed max-sm:bottom-0 z-50 max-sm:bg-white max-sm:shadow-2xl text-black max-sm:py-3 max-sm:w-full max-sm:flex max-sm:justify-around max-sm:items-center">
        <Link className="flex flex-col items-center" href={"/pwa-absensi/"}>
          <PWAHomeIcon stroke="#179778" fill="#179778" />
          <h1>Home</h1>
        </Link>
        <Link
          className="flex flex-col items-center"
          href={"/pwa-absensi/history"}
        >
          <PWAHistoryIcon stroke="#A1A0A3" />
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
}

export default PwaAbsensi;
