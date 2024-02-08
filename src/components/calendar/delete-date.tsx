"use client";
import { useState } from "react";
import { FormInput, FormSelect, ToggleButton } from "../form-components";
import { CloseIcon, LoadingSpinner } from "../buttons-icons";
import { getDateRange } from "@/utils/date";
import { API_URL, TOKEN } from "@/utils/api";

type DeleteEventProps = {
  status: boolean;
  onClose: () => void;
};

export const DeleteEvent: React.FC<DeleteEventProps> = ({
  status,
  onClose,
}) => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleSwitch = () => {
    setChecked(!checked);
  };
  //   const [code, setCode] = useState("CLS202307");
  //   const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [untilDate, setUntilDate] = useState("");
  const [eventName, setEventName] = useState("");

  const hasEmptyValue = (...values: string[]) => {
    return values.some((value) => value.trim() === "");
  };
  const isButtonDisabled = hasEmptyValue(startDate);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(checked);
    try {
      setIsLoading(true);
      if (untilDate) {
        const dateRange = getDateRange(startDate, untilDate);
        for (let index = 0; index < dateRange.length; index++) {
          const element = dateRange[index];
          console.log(element);
          const response = await fetch(`${API_URL}/kalendar/${element}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "School-Code": "SBBSALAM",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              event_name: eventName,
              is_national_holiday: false,
            }),
          });
          if (response.ok) {
            if (dateRange[dateRange.length - 1] == dateRange[index]) {
              location.reload();
            }
          }
        }
      } else {
        const tanggal = new Date(startDate);
        const hariKeBerapa: number = Math.ceil(
          (tanggal.getTime() -
            new Date(new Date(tanggal).getFullYear(), 0, 1).getTime()) /
            86400000
        );
        const response = await fetch(`${API_URL}/kalendar/${hariKeBerapa}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "School-Code": "SBBSALAM",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_name: "",
            date: startDate,
            is_national_holiday: checked,
          }),
        });
        if (response.ok) {
          location.reload();
        }
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
      location.reload();
    }
  };

  return (
    <div className={`${status ? "flex" : "hidden"}`}>
      <div
        className={`${
          isLoading ? "hidden" : ""
        } flex flex-col gap-2 absolute w-[816px] h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-20 box-border p-6 rounded-[20px] bg-white `}
      >
        <div className="flex justify-between w-full">
          <h1 className="font-semibold text-xl">Hapus Jadwal Dan Acara</h1>
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="h-full relative">
          <div className="grid grid-cols-2 gap-5 mt-6">
            {/* <div className="col-span-2">
              <FormSelect
                value={name}
                onChange={setName}  
                label="Kategori"
                option={["Libur", "Asasmen", "Event Sekolah", "Perkiraan Libur"]}
              />
            </div> */}

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs">
                Dari Tanggal
              </label>
              <input
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
                type="date"
                className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs">
                Sampai Tanggal
              </label>
              <input
                onChange={(e) => setUntilDate(e.target.value)}
                value={untilDate}
                type="date"
                className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
              />
            </div>
          </div>

          <div className="w-full absolute bottom-0 justify-end justify-self-end flex gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`${
                isButtonDisabled
                  ? "bg-[#E6E6E6] text-[#A1A0A3]"
                  : "bg-primary text-white"
              } px-8 py-3 rounded-full box-border w-[120px] h-[45px] text-sm font-semibold`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
      <div
        className={`${
          isLoading ? "block" : "hidden"
        }z-50 fixed top-0 w-full h-screen opacity-25 bg-black`}
      ></div>
      <div
        className={`${
          isLoading ? "block" : "hidden"
        } fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 `}
      >
        <LoadingSpinner />
      </div>
    </div>
  );
};
