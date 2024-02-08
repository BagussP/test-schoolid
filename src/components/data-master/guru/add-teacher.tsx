"use client";
import { CloseIcon, ImageIcon } from "../../buttons-icons";
import { useEffect, useState } from "react";
import {
  FormInput,
  FormInputFile,
  FormSelect,
  RadioButton,
} from "../../form-components";
import { API_URL, TOKEN } from "@/utils/api";

type AddTeacherProps = {
  onClose: () => void;
  isDataModified: boolean;
  data: TableTeacher | {};
  display: boolean;
};

export const AddTeacher: React.FC<AddTeacherProps> = ({
  display,
  onClose,
  isDataModified,
  data,
}) => {
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [nip, setNip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [lastEducation, setLastEducation] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [pathImage, setPathImage] = useState("");

  const [optionProvince, setOptionProvince] = useState<string[]>([]);

  // hit api untuk bagian alamat
  // useEffect(() => {
  //   const fetchProvince = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bagussp.github.io/api-wilayah-indonesia/api/provinces.json"
  //       );
  //       const responseData: FormAddress[] = await response.json();

  //       // setOptionProvince(responseData)
  //       setOptionProvince(responseData.map((data: FormAddress) => data.name));
  //       console.log(responseData);
  //     } catch {
  //       console.log("error");
  //     }
  //   };
  //   if (display) {
  //     fetchProvince();
  //   }
  // }, [display, province]);

  // console.log(optionProvince);

  // menginisiasi state jika ingin update guru
  const initializeState = (teacherData: TableTeacher) => {
    setName(teacherData.name || "");
    setNik(teacherData.id_number || "");
    setNip(teacherData.nip || "");
    setEmail("user" in teacherData ? (teacherData.user as users).email : "");
    setPhoneNumber(
      "user" in teacherData ? (teacherData.user as users).phone_number : ""
    );
    setGender(teacherData.gender || "");
    setPosition(teacherData.position || "");
    setStatus(teacherData.status || "");
    setBirthPlace(teacherData.birth_place || "");
    setBirthDate(teacherData.birth_date || "");
    setLastEducation(teacherData.last_education || "");
    setProvince(teacherData.province || "");
    setCity(teacherData.city || "");
    setDistrict(teacherData.district || "");
    setSubDistrict(teacherData.subdistrict || "");
    setAddress(teacherData.address || "");
    setPathImage(teacherData.image || "");
  };

  useEffect(() => {
    if (isDataModified) {
      initializeState(data as TableTeacher);
    } else if (!display) {
      initializeState({} as TableTeacher);
    } else {
      // Reset semua state ke nilai awal
      initializeState({} as TableTeacher);
    }
  }, [isDataModified, data, display]);

  // validasi form apakah sudah sesuai ketentuan
  const hasEmptyValue = (...values: string[]) => {
    return values.some((value) => value.trim() === "");
  };
  const isButtonDisabled = hasEmptyValue(name, email);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date();
    if (!isButtonDisabled) {
      try {
        const response = await fetch(`${API_URL}/gurus`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "School-Code": "SBBSALAM",
          },
          body: JSON.stringify({
            nip: nip,
            id_number: nik,
            name: name,
            position: position,
            birth_date: birthDate,
            birth_place: birthPlace,
            last_education: lastEducation,
            province: province,
            city: city,
            district: district,
            subdistrict: subDistrict,
            address: address,
            join_date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
            status: status,
            gender: gender,
            image: pathImage,
            email: email,
            phone_number: phoneNumber,
          }),
        });
        location.reload();
      } catch (err) {
        console.log("err");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      try {
        const response = await fetch(
          `${API_URL}/gurus/${(data as TableTeacher).id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
              "School-Code": "SBBSALAM",
            },
            body: JSON.stringify({
              nip: nip,
              id_number: nik,
              name: name,
              position: position,
              birth_date: birthDate,
              birth_place: birthPlace,
              last_education: lastEducation,
              province: province,
              city: city,
              district: district,
              subdistrict: subDistrict,
              address: address,
              join_date: (data as TableTeacher).join_date,
              status: status,
              gender: gender,
              image: pathImage,
              email: email,
              phone_number: phoneNumber,
              active: (data as TableTeacher).active,
            }),
          }
        );
        console.log("Berhasil");
        location.reload();

        if (!response.ok) {
          alert("Network response was not ok");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className={`${display ? "flex" : "hidden"}`}>
      <div className="flex flex-col gap-2 absolute w-[816px] h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-20 box-border p-6 rounded-[20px] bg-white ">
        <div className="flex justify-between w-full">
          {isDataModified ? (
            <h1 className="font-semibold text-xl">Edit Guru</h1>
          ) : (
            <h1 className="font-semibold text-xl">Tambah Guru</h1>
          )}
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={isDataModified ? handleUpdate : handlePost}>
          <div className="grid grid-cols-2 gap-5 mt-6">
            <FormInputFile
              setPathImage={setPathImage}
              pathImage={pathImage}
              display={display}
              isDataModified={isDataModified}
              to="guru"
            />
            <div className="col-span-2">
              <FormInput
                input="text"
                value={name}
                onChange={setName}
                label="Nama Guru"
                placeholder="ex: Muhammad Jauhari S.Pd"
              />
            </div>
            <FormInput
              input="number"
              value={nip}
              onChange={setNip}
              label="NIP"
              placeholder="0"
            />
            <FormInput
              input="number"
              value={nik}
              onChange={setNik}
              label="Nomor KTP"
              placeholder="0"
            />
            {isDataModified ? (
              <div className="pointer-events-none">
                <FormInput
                  input="text"
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="ex: guru@sabilussalam.com"
                />
              </div>
            ) : (
              <div>
                <FormInput
                  input="text"
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="ex: guru@sabilussalam.com"
                />
              </div>
            )}
            {isDataModified ? (
              <div className="pointer-events-none">
                <FormInput
                  input="number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  label="Nomor HP"
                  placeholder="0"
                />
              </div>
            ) : (
              <div>
                <FormInput
                  input="number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  label="Nomor HP"
                  placeholder="0"
                />
              </div>
            )}
            <div className="col-span-2">
              <RadioButton
                value={gender}
                label="Jenis Kelamin"
                option={["Laki-laki", "Perempuan"]}
                onChange={setGender}
              />
            </div>
            <FormSelect
              onChange={setPosition}
              value={position}
              label="Jabatan"
              option={[
                "Guru Pengajar",
                "Guru Pratikum",
                "Operasional",
                "Guru Kelas",
                "Guru Mata Pelajaran",
                "Guru Tahfidz",
                "Tenaga Pendidik",
                "Staff Kebersihan",
              ]}
            />
            <FormSelect
              onChange={setStatus}
              value={status}
              label="Status Kependidikan"
              option={[
                "Guru Honor",
                "Guru PNS",
                "Guru Sertifikasi",
                "Tenaga Kependidikan",
                "Staff Kebersihan",
              ]}
            />
            <FormInput
              input="text"
              label="Tempat Lahir"
              value={birthPlace}
              onChange={setBirthPlace}
              placeholder="Masukkan Tempat Lahir"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-xs">
                Tanggal Lahir
              </label>
              <input
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                type="date"
                className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
              />
            </div>
            <div className="col-span-2">
              <FormSelect
                value={lastEducation}
                label="Pendidikan Terakhir"
                onChange={setLastEducation}
                option={["SMK / SMA", "S1", "S2", "S3"]}
              />
            </div>

            <h1 className="col-span-2 text-lg font-semibold">Alamat</h1>
            <FormInput
              input="text"
              value={province}
              onChange={setProvince}
              label="Provinsi"
              placeholder="Masukkan Provinsi"
            />
            <FormInput
              input="text"
              value={city}
              onChange={setCity}
              label="Kabupaten/Kota"
              placeholder="Masukkan Kabupaten/Kota"
            />
            <FormInput
              input="text"
              value={district}
              onChange={setDistrict}
              label="Kecamatan"
              placeholder="Masukkan Kecamatan"
            />
            <FormInput
              input="text"
              value={subDistrict}
              onChange={setSubDistrict}
              label="Kelurahan"
              placeholder="Masukkan Kelurahan/Desa"
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

          <div className="mt-5 w-full justify-end bottom-6 right-6 flex gap-2">
            <div
              onClick={onClose}
              className="px-10 py-3 cursor-pointer rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </div>
            <button
              disabled={isButtonDisabled}
              className={`${
                !isButtonDisabled
                  ? "bg-primary text-white cursor-pointer"
                  : "bg-[#E6E6E6] text-[#A1A0A3]"
              } px-8 py-3 rounded-full box-border w-[120px] h-[45px]  text-sm font-semibold`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
      <div className="fixed z-10 top-0 w-full h-screen opacity-25 bg-black"></div>
    </div>
  );
};
