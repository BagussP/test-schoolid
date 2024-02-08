"use client";

import { useState, useEffect } from "react";
import {
  EmailIcon,
  HidePasswordIcon,
  PasswordIcon,
  ShowPasswordIcon,
} from "@/components/buttons-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROLE, TOKEN } from "@/utils/api";

interface ResponseData {
  data: {
    created_at: string | null;
    email: string | null;
    email_verified_at: string | null;
    id: number;
    name: string | null;
    phone_number: string | null;
    role: number;
    role_name: string;
    school_code: string | null;
    updated_at: string;
  };
  token?: string;
  messsage: string;
}

export default function Page() {
  const [email, setEmail] = useState("wbaguspmks@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let token: string;
  let role: number;

  // response API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://staging.nutshells.id/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
            "Access-Control-Allow-Origin": "*",
            "School-Code": "SBBSALAM",
          },
          body: JSON.stringify({ email, password, device_id: "23x2waw" }),
        }
      );
      const responseData: ResponseData = await response.json();
      if (responseData.token !== undefined) {
        token = responseData.token;
        role = responseData.data.role;
        if (token == null) {
          alert("password salah");
          return false;
        }
      }
      localStorage.setItem("token", token);
      localStorage.setItem("role", JSON.stringify(role));
      localStorage.setItem("id", JSON.stringify(responseData.data.id));
      location.reload();
    } catch (error) {
      console.log("Email ini tidak terdaftar", error);
    }
  };

  useEffect(() => {
    console.log("jalan");
    if (TOKEN && TOKEN !== "null" && (ROLE == "3" || ROLE == "4")) {
      router.push("/");
    } else if (TOKEN && TOKEN !== "null" && (ROLE == "1" || ROLE == "2")) {
      router.push("/pwa-absensi");
    }
  }, [router]);

  return (
    <div className="w-full flex h-screen ">
      <div className="w-1/2 px-[100px] box-border max-sm:px-0">
        <div className="font-semibold text-xl my-10 flex gap-4 items-center max-sm:hidden">
          <Image
            src="/icons/app/colored-logo.png"
            width={32}
            height={32}
            alt="Sabillussalam"
          />
          <h1 className="max-sm:hidden">Admin Panel</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 max-sm:max-w-[324px] max-sm:w-4/5 max-sm:left-1/2 max-sm:-translate-x-1/2 ">
            <div className="mb-3">
              <h1 className="font-semibold text-xl mb-3">
                Selamat datang di Portal Admin
              </h1>
              <p className="font-medium text-[#A1A0A3] max-sm:hidden">
                Silahkan isi email dan password untuk masuk ke Aplikasi.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Email">Email</label>
              <div className="w-full h-fit relative">
                <input
                  type="email"
                  className="pl-12 pr-8 py-3 w-full"
                  id="Email"
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="absolute top-3 left-3">
                  <EmailIcon />
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Password">Password</label>
              <div className="w-full h-fit relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="pl-12 pr-8 py-3 w-full"
                  id="Password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="absolute top-3 left-3">
                  <PasswordIcon />
                </p>
                <div
                  onClick={handleShowPassword}
                  className="absolute top-3 right-3 cursor-pointer"
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </div>
              </div>
            </div>

            <Link href={"/"} className="text-primary">
              Lupa Pasword?
            </Link>
            {email == "" || password == "" ? (
              <button
                disabled
                className="bg-[#E6E6E6] text-[#A1A0A3] font-semibold mt-3 py-3 rounded-full"
              >
                Masuk
              </button>
            ) : (
              <button
                type="submit"
                className="bg-primary text-white font-semibold mt-3 py-3 rounded-full"
              >
                Masuk
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="w-1/2 max-sm:hidden">
        <Image
          src="/images/thumbnail/login.png"
          width={720}
          height={1024}
          alt="thumbnail"
          className="w-full h-screen"
        />
      </div>
    </div>
  );
}

  