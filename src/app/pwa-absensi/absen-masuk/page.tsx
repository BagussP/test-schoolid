"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_URL, ID, ROLE, TOKEN } from "@/utils/api";
import { useRouter } from "next/navigation";
import { PWARefreshIcon, Pinpoint } from "@/components/buttons-icons";

const AbsensiMasuk = () => {
  const [description, setDescription] = useState("");
  const [locationPoint, setLocationPoint] = useState("");
  const [lunch, setlunch] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const router = useRouter();
  const time = new Date();
  const api_key_location = "22ce6497fe9b446d8c96280d90bd8cda";
  let latitude = useRef<number | null>(null);
  let longitude = useRef<number | null>(null);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // Pastikan hanya memilih pilihan yang diizinkan
    setDescription(event.target.value);
  };

  const handleChangelunch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Pastikan hanya memilih pilihan yang diizinkan
    if (event.target.value === "ya") {
      setlunch(true);
    } else {
      setlunch(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/absens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "School-Code": "SBBSALAM",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          location: locationPoint,
          user_id: ID,
          latitude: latitude.current,
          longitude: longitude.current,
          message: description,
          lunch: lunch,
        }),
      });
      const responseData = await response.json();
      router.push("/pwa-absensi");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (TOKEN && (ROLE == "1" || ROLE == "2")) {
      const getProfile = async () => {
        try {
          const response = await fetch(`${API_URL}/getProfile/${ID}`, {
            headers: {
              "School-Code": "SBBSALAM",
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          const responseData = await response.json();
          setProfile(responseData.data);
        } catch (error) {
          console.log(error);
        }
      };

      getProfile();

      const checkGeolocationPermission = async () => {
        const geolocationPermission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            latitude.current = position.coords.latitude;
            longitude.current = position.coords.longitude;
            console.log(latitude, longitude);
            await reverseGeolocation();
          });
        } else {
          console.log("Geolocation permission denied or not yet requested.");
        }
      };

      checkGeolocationPermission();

      const reverseGeolocation = async () => {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?key=${api_key_location}&q=${latitude.current},${longitude.current}&pretty=1&no_annotations=1`
          );
          const responseData = await response.json();
          setLocationPoint(responseData.results[0].formatted);
        } catch (err) {
          console.log("error:", err); // Perlu mencetak pesan kesalahan yang sebenarnya
        }
      };
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="max-sm:relative max-sm:w-full max-sm:h-screen max-sm:bg-primary max-sm:text-white text-sm">
      <article className="max-sm:h-1/4 pt-5">
        <div className="max-sm:p-5 flex">
          <Link href={"/pwa-absensi"}>{"<-"}</Link>
          <p className="inline m-auto">Absensi Guru</p>
        </div>
        <div className="px-5 py-2 flex justify-between">
          <div>
            <p className="text-[#96DAC9] mb-2">
              {profile != null ? profile.role_name : ""}
            </p>
            <p>{profile != null ? profile.name : ""}</p>
          </div>
          <Image
            src={`https://staging.nutshells.id/${
              profile != null ? profile.profile.image : ""
            }`}
            width={50}
            height={50}
            alt={profile != null ? profile.name : ""}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
        </div>
      </article>
      <form
        onSubmit={handleSubmit}
        className="max-sm:absolute max-sm:bg-white max-sm:w-full max-sm:h-screen max-sm:top-1/4 max-sm:rounded-t-xl text-black"
      >
        <div className="flex flex-col items-center my-8">
          <p suppressHydrationWarning={true} className="text-3xl font-medium">
            {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
          </p>
          <p suppressHydrationWarning={true} className="text-[#A1A0A3]">
            {time.toLocaleDateString("id-ID", { weekday: "long" }).slice(0, 3)},{" "}
            {time.getDate()} {time.toLocaleString("id-ID", { month: "long" })}{" "}
            {time.getFullYear()}
          </p>
        </div>
        <div
          className={`flex w-11/12 py-2 items-center rounded-full m-auto gap-3 text-sm my-8`}
        >
          <Pinpoint />
          {locationPoint ? (
            <div className="max-sm:w-full text-center overflow-hidden">
              <div className=" overflow-hidden h-fit">
                {locationPoint.replace(/unnamed road, /i, "")}
              </div>
            </div>
          ) : (
            <div className="max-sm:w-full text-center overflow-hidden ">
              <div className=" overflow-hidden h-fit">
                Lokasi tidak terdeteksi
              </div>
            </div>
          )}
          <div onClick={() => location.reload()} className="cursor-pointer">
            <PWARefreshIcon />
          </div>
        </div>
        <div className="w-11/12 m-auto my-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Makan siang ?</label>
            <div className=" flex gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="ya"
                  value="ya"
                  onChange={handleChangelunch}
                  className="peer sr-only hidden"
                />
                <div className="w-[100px] text-sm h-[30px] box-border  rounded-full border-2 border-[#F7F6F9] peer-checked:border-primary peer-checked:border-[1px] flex items-center justify-center">
                  Ya
                </div>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="tidak"
                  value="tidak"
                  onChange={handleChangelunch}
                  className="peer sr-only hidden"
                />
                <div className="w-[100px] text-sm h-[30px] box-border  rounded-full border-2 border-[#F7F6F9] peer-checked:border-primary peer-checked:border-[1px] flex items-center justify-center">
                  Tidak
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="w-11/12 m-auto">
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="Keterangan">
              Keterangan
            </label>
            <textarea
              onChange={handleChangeDescription}
              value={description}
              name="Keterangan"
              id="Keterangan"
              placeholder="Ketik keterangan"
              cols={30}
              rows={10}
              className="border-2 border-[#F7F6F9] border-solid text-sm h-[220px] box-border py-3 px-4 remove-scroll"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-semibold w-11/12 absolute left-1/2 -translate-x-1/2 text-center py-4 rounded-full my-8"
        >
          Masuk
        </button>
      </form>
    </main>
  );
};

export default AbsensiMasuk;
