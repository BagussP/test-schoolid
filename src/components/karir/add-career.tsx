"use client";
import { CloseIcon, ImageIcon } from "@/components/buttons-icons";
import { useState } from "react";
import {
  FormInput,
  FormInputFile,
  FormSelect,
  FormTextarea,
  RadioButton,
  ToggleButton,
} from "@/components/form-components";

type AddCareer = {
  status: boolean;
  onClose: () => void;
};

export const AddCareer: React.FC<AddCareer> = ({ status, onClose }) => {
  const [checked, setChecked] = useState(false);
  const [descriptionHiring, setDescriptionHiring] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [position, setPosition] = useState("")
  const [lastEducation, setLastEducation] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [description, setDescription] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  console.log(status);

  return (
    <div className={`${status ? "flex" : "hidden"}`}>
      <div className="flex flex-col gap-2 absolute w-[816px] h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-20 box-border p-6 rounded-[20px] bg-white ">
        <div className="flex justify-between mb-5 w-full">
          <h1 className="font-semibold text-xl">Tambah Berita</h1>
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form action="">
          <div className="grid grid-cols-2 gap-5 mt-6">
            <div className="col-span-2">
              <FormInput
                input="text"
                value={descriptionHiring}
                onChange={setDescriptionHiring}
                label="Keterangan"
                placeholder="ex: Lowongan Staff Tata Usaha"
              />
            </div>
            <FormInput
              input="number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              label="Nomor HP Informasi"
              placeholder="+62 8986453xxx"
            />
            <FormInput
              input="text"
              value={email}
              onChange={setEmail}
              label="Email Pengajuan Lamaran"
              placeholder="ex: guru@sabilussalam.com"
            />
            <div className="col-span-2">
              <RadioButton
              value={gender}
                label="Jenis Kelamin"
                onChange={setGender}
                option={["Semua", "Laki-laki", "Perempuan"]}
              />
            </div>

            <FormInput
              input="text"
              value={position}
              onChange={setPosition}
              label="Jabatan"
              placeholder="ex: Guru"
            />

            <FormSelect
            value={lastEducation}
              label="Pendidikan Terakhir"
              onChange={setLastEducation}
              option={["SMK / SMA", "S1", "S2", "S3"]}
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs">
                Tanggal Akhir Pengajuan Lamaran
              </label>
              <input
                onChange={(e) => setBirthDate(e.target.value)}
                type="date"
                className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
              />
            </div>

            <div className="col-span-2">
              <FormTextarea
                value={description}
                onChange={setDescription}
                label="Deskripsi"
                placeholder="Masukkan informasi lengkap seperti tugas yang akan mjd tanggungjawab, syarat, dll."
              />
            </div>

            <h1 className="col-span-2 text-lg mt-5 font-semibold">Zonasi</h1>
            <FormInput
              input="text"
              value={province}
              onChange={setProvince}
              label="Provinsi"
              placeholder="Masukkan alamat lengkap"
            />
            <FormInput
              input="text"
              value={city}
              onChange={setCity}
              label="Kabupaten/Kota"
              placeholder="Masukkan alamat lengkap"
            />
            <FormInput
              input="text"
              value={district}
              onChange={setDistrict}
              label="Kecamatan"
              placeholder="Masukkan alamat lengkap"
            />
            <FormInput
              input="text"
              value={subDistrict}
              onChange={setSubDistrict}
              label="Kelurahan"
              placeholder="Masukkan alamat lengkap"
            />
            <div className="col-span-2">
              <FormInput
                input="text"
                value={address}
                onChange={setAddress}
                label="Alamat"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
          </div>

          <ToggleButton toggleSwitch={toggleSwitch} checked={checked} />

          <div className="w-full justify-end right-6 flex gap-2">
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
