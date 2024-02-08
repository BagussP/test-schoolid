"use client";
import { useState,useEffect } from "react";
import { FormInput } from "@/components/form-components";
import Image from "next/image";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [color, setcolor] = useState<string>("#FFFFFF"); 

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     console.log("cek");
     const files = event.target.files;
     if (files && files[0]) {
       setFileName(files[0].name);
       setImage(URL.createObjectURL(files[0]));
     }
   };

    //  useEffect(() => {
    //    const divElement = document.getElementById("color"); 
    //    if (divElement) {
    //      divElement.style.backgroundColor = color;
    //    }
    //  }, [color]);

    // const handleRightClick = (
    //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
    // ) => {
    //   e.preventDefault(); // Mencegah tampilan konteks bawaan muncul
    //   // Tambahkan aksi yang ingin Anda lakukan saat klik kanan di sini
    //   console.log("Klik kanan terdeteksi!");
    // };

  return (
    <div className="bg-white">
      <div className="flex px-25 gap-6 pt-5 pl-[100px] h-36 bg-primary text-white ">
        <Image
          src={"/images/avatars/user-avatars.png"}
          width={60}
          height={60}
          alt="avatars"
          unoptimized={true}
          className="h-fit"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">Muhammad Kasim</h1>
          <p className="text-sm text-[#96DAC9]">
            Sesuaikan informasi profil Anda supaya lebih mudah dikenali
          </p>
        </div>
      </div>


      <form className="w-[604px]  m-auto box-border mt-14">
        <div className="flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              width={80}
              height={80}
              key={image}
              alt="avatars"
              unoptimized={true}
              className="h-[80px] w-[80px] rounded-full"
            />
          ) : (
            <Image
              src={"/images/avatars/user-avatars.png"}
              width={80}
              height={80}
              alt="avatars"
              unoptimized={true}
              className="h-[80px] w-[80px] rounded-full"
            />
          )}
          <div
            onClick={() => {
              const chooseImageInput =
                document.querySelector<HTMLInputElement>("#chooseImage");
              if (chooseImageInput) {
                chooseImageInput.click();
              }
            }}
            className={`w-[176px] h-[45px] cursor-pointer relative flex flex-col gap-2 items-center justify-center font-semibold text-sm bg-white border-primary text-primary border-2 rounded-full `}
          >
            <input
              type="file"
              key={image}
              name=""
              accept="image/*"
              id="chooseImage"
              className="hidden"
              onChange={handleFileChange}
            />
            Unggah Foto Baru
          </div>
          <h1
            onClick={() => {
              setFileName("");
              setImage(null);
            }}
            className={`cursor-pointer w-[176px] h-[45px]  relative flex flex-col gap-2 items-center justify-center font-semibold text-sm bg-[#ececec] rounded-full `}
          >
            Hapus Foto
          </h1>
        </div>
        <div className="mt-10">
          <FormInput
            input="text"
            label="Nama Lengkap"
            placeholder="ex: Muhammad Kasim"
            value={name}
            onChange={setName}
          />
        </div>
        <div className="mt-5">
          <FormInput
            input="text"
            label="Email"
            placeholder="ex: Muhammad Kasim@gmail.com"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className="mt-5">
          <FormInput
            input="number"
            label="Nomor HP"
            placeholder="+62254123212"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <div className="flex gap-5 mt-5">
          <div className="w-full">
            <FormInput
              input="text"
              label="Tempat Lahir"
              placeholder="Tangerang"
              value={birthPlace}
              onChange={setBirthPlace}
            />
          </div>
          <div 
          // onContextMenu={handleRightClick}
           className="flex w-full flex-col gap-2">
            <label htmlFor="" className="text-xs">
              Tanggal Lahir
            </label>
            <input
              onChange={(e) => setBirthDate(e.target.value)}
              type="date"
              className="border-2  border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
            />
          </div>
          {/* <div className="relative">
            <div id="color" className={`w-4 h-4 z-50 absolute`}></div>
            <FormInput
              input="text"
              label="Provinsi"
              placeholder="Banten"
              value={color}
              onChange={setcolor}
            />
          </div> */}
        </div>

        <div className="grid grid-cols-2 gap-5 mt-25">
          <h1 className="text-lg font-medium col-span-2">Alamat</h1>

          <FormInput
            input="text"
            label="Provinsi"
            placeholder="Banten"
            value={province}
            onChange={setProvince}
          />
          <FormInput
            input="text"
            label="Kota/Kabupaten"
            placeholder="Tangerang"
            value={city}
            onChange={setCity}
          />
          <FormInput
            input="text"
            label="Kecamatan"
            placeholder="Rajeg"
            value={district}
            onChange={setDistrict}
          />
          <FormInput
            input="text"
            label="Kelurahan"
            placeholder="Rajeg"
            value={subDistrict}
            onChange={setSubDistrict}
          />
          <div className="col-span-2">
            <FormInput
              input="text"
              label="Alamat"
              placeholder="Masukkan Alamat Disini"
              value={address}
              onChange={setAddress}
            />
          </div>
        </div>

        <div className="w-full justify-start mt-10 flex gap-2">
          <button
            className={`
                 bg-primary text-white cursor-pointer
                 px-8 py-3 rounded-full box-border w-[120px] h-[45px]  text-sm font-semibold`}
          >
            Simpan
          </button>
          <button className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold">
            Tutup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
