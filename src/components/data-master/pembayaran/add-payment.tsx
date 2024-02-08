"use client";
import { CloseIcon, ImageIcon } from "../../buttons-icons";
import { useState } from "react";
import { FormInput, FormSelect, ToggleButton } from "../../form-components";

type AddPaymentProps = {
  status: boolean;
  onClose: () => void;
};

export const AddPayment: React.FC<AddPaymentProps> = ({ status, onClose }) => {
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("CLS202307");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <div className={`${status ? "flex" : "hidden"}`}>
      <div className="flex flex-col gap-2 absolute w-[816px] h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-20 box-border p-6 rounded-[20px] bg-white ">
        <div className="flex justify-between w-full">
          <h1 className="font-semibold text-xl">Tambah Pembayaran</h1>
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form action="">
          <div className="grid grid-cols-2 gap-5 mt-6">
            <div className="col-span-2">
              <FormInput
                input="text"
                value={name}
                onChange={setName}
                label="Nama Pembayaran"
                placeholder="ex: Bayar Bulanan"
              />
            </div>
            <FormSelect
            value="type"
              onChange={setType}
              label="Jenis Pembayaran"
              option={["option"]}
            />
            <FormInput
              input="number"
              value={code}
              onChange={setCode}
              label="Kode"
              placeholder="0"
            />
            <div className="col-span-2">
              <FormInput
                input="text"
                value={desc}
                onChange={setDesc}
                label="Deskripsi"
                placeholder="Masukkan deskripsi disini"
              />
            </div>
          </div>

          <ToggleButton toggleSwitch={toggleSwitch} checked={checked} />

          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              onClick={onClose}
              className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </button>
            <button
              disabled={true}
              className="px-8 py-3 rounded-full box-border w-[120px] h-[45px] bg-[#E6E6E6] text-[#A1A0A3] text-sm font-semibold"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      <div className="fixed top-0 w-full z-10 h-screen opacity-25 bg-black"></div>
    </div>
  );
};
