"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  LogoutIcons,
  EditIcon,
  GreaterThanIcon,
  NotificationIcon,
  SearchIcon,
} from "../buttons-icons";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ROLE, TOKEN } from "@/utils/api";

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  const currentRoute = usePathname();
  const params = useParams();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (TOKEN != null && (ROLE == "4" || ROLE == "3")) {
    } else {
      router.push("/login");
    }

    return () => {};
  }, [router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="flex w-full h-24 bg-primary text-white items-center justify-between">
      <div className="flex gap-10 ml-25">
        <Link href="/" className="flex gap-4">
          <Image src="/icons/app/logo.png" width={36} height={32} alt="logo" />
          <h1 className="font-semibold">AdminPanel</h1>
        </Link>
        <div className="flex gap-8">
          <Link
            className={`${
              currentRoute === "/"
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className={`${
              currentRoute === `/data-master` ||
              currentRoute === `/data-master/guru` ||
              currentRoute === `/data-master/jenis-pembayaran` ||
              currentRoute === `/data-master/kategori-libur` ||
              currentRoute === `/data-master/kelas` ||
              currentRoute === `/data-master/pembayaran` ||
              currentRoute === `/data-master/siswa` ||
              currentRoute === `/data-master/jabatan`
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/data-master"
          >
            Data Master
          </Link>
          <Link
            className={`${
              currentRoute === "/absensi" ||
              currentRoute === `/absensi/${params.slug}/`
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/absensi"
          >
            Absensi
          </Link>
          <Link
            className={`${
              currentRoute === "/pembayaran" ||
              currentRoute === `/pembayaran/guru` ||
              currentRoute === `/pembayaran/wali-murid`
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/pembayaran"
          >
            Pembayaran
          </Link>
          <Link
            className={`${
              currentRoute === "/kalender-akademik" ||
              currentRoute === `/kalender-akademik/${params.slug}`
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/kalender-akademik"
          >
            Kalender Akademik
          </Link>
          <Link
            className={`${
              currentRoute === "/karir" ||
              currentRoute === `/karir/${params.slug}`
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/karir"
          >
            Karir
          </Link>
          <Link
            className={`${
              currentRoute === "/berita" ||
              currentRoute === `/berita/berita` ||
              currentRoute === `/berita/buletin` ||
              currentRoute === `/berita/quote`
                ? "text-white font-medium"
                : "text-font_color"
            }`}
            href="/berita"
          >
            Berita
          </Link>
        </div>
      </div>
      <div className="flex gap-8 mr-25">
        <NotificationIcon />
        <div className="flex items-center gap-2">
          <Image
            src="/images/avatars/user-avatars.png"
            width={32}
            height={32}
            alt="user avatar"
          />
          <div
            ref={ref}
            className="w-fit h-fit "
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className="p-1 flex cursor-pointer">
              <div className=" w-4 h-1 rotate-45  rounded-full bg-white"></div>
              <div className=" w-4 h-1 -rotate-45 -ml-[5px] rounded-full bg-white"></div>
            </div>
            {open && (
              <div
                className={`flex flex-col z-50 items-center justify-center absolute w-[320px] h-[290px] box-border py-2 px-5  bg-white top-20 right-[100px] border-solid border-black border-2 `}
              >
                <div className="w-[280px] h-[210px] items-center flex flex-col gap-3">
                  <Image
                    src={"/images/avatars/user-avatars.png"}
                    width={80}
                    height={80}
                    alt="avatars"
                    unoptimized={true}
                  />
                  <h1 className="font-medium text-black text-lg ">
                    Muhammad Kasim
                  </h1>
                  <Link href={"/ubah-profil"} className="flex gap-2">
                    <EditIcon />
                    <p className="text-primary">Ubah Profil</p>
                  </Link>
                </div>
                <div className="text-black w-full items-center h-fit">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      localStorage.removeItem("id");
                    location.reload()
                    }}
                    className="flex gap-2"
                  >
                    <LogoutIcons />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
