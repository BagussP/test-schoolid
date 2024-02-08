"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { API_URL, ID, ROLE, TOKEN } from "@/utils/api";
import Image from "next/image";
import  { LogoutIcons, NotificationGreenIcon, PWAHistoryIcon, PWAHomeIcon, PWAInIcon, PWAOtherIcon } from "@/components/buttons-icons";
import { useRouter } from "next/navigation";

function PwaAbsensi() {
  const [profile, setProfile] = useState<any | null>(null);
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
          console.log("get profile in use Effect");
          const responseData = await response.json();
          setProfile(responseData.data);
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
    <main className="max-sm:text-sm max-sm:relative max-sm:w-full max-sm:h-screen max-sm:bg-white overflow-hidden flex flex-col gap-5 px-5 py-10">
      <article className="pt-14">
        <div className="flex gap-5">
          <Image
            src={`https://staging.nutshells.id/${
              profile != null ? profile.profile.image : ""
            }`}
            width={50}
            height={50}
            alt={profile != null ? profile.name : ""}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <div>
            <h1 className="text-lg font-medium">
              {profile != null ? profile.name : ""}
            </h1>
            <h1 className="">{profile != null ? profile.email : ""}</h1>
          </div>
        </div>
      </article>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("id");
          location.reload();
        }}
        className="flex gap-5 items-center w-full mt-5 box-border"
      >
        <LogoutIcons />
        <p className="font-medium text-lg border-y-2 w-full text-left py-2">
          Log out
        </p>
      </button>
      <nav className="max-sm:fixed max-sm:bottom-0 left-0 z-50 max-sm:bg-white max-sm:shadow-2xl text-black max-sm:py-3 max-sm:w-full max-sm:flex max-sm:justify-around max-sm:items-center">
        <Link className="flex flex-col items-center" href={"/pwa-absensi/"}>
          <PWAHomeIcon stroke="#A1A0A3" fill="none" />
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
          <PWAOtherIcon fill="#179778" />
          <h1>Lainnya</h1>
        </Link>
      </nav>
    </main>
  );
}

export default PwaAbsensi;
