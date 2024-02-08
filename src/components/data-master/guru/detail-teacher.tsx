import { CloseIcon } from "@/components/buttons-icons";
import React from "react";
import { API_URL } from "@/utils/api";
import Image from "next/image";

type DetailTeacher = {
  status: boolean;
  handleClose: (e: boolean) => void;
  data: TableTeacher | {};
};

const DetailTeacher: React.FC<DetailTeacher> = ({
  status,
  handleClose,
  data,
}) => {
  return (
    <div className={`${!status ? "hidden" : "block "}`}>
      <div className="flex flex-col gap-2 fixed w-[816px] z-30 h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 box-border p-6 rounded-[20px] bg-white ">
        <div className="flex justify-between w-full">
          <h1>Detail Guru</h1>
          <button
            className="h-fit w-fit"
            onClick={() => {
              handleClose(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="">
            <Image
              src={`https://staging.nutshells.id/${
                (data as TableTeacher).image
              }`}
              width={90}
              height={90}
              alt={(data as TableTeacher).name}
            />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 ">
            <div className="col-span-2">
              <h1 className="text-sm">Name</h1>
              <h1 className="font-medium">{(data as TableTeacher).name}</h1>
            </div>
            <div>
              <h1 className="text-sm">Nip</h1>
              <h1 className="font-medium">{(data as TableTeacher).nip}</h1>
            </div>
            <div>
              <h1 className="text-sm">Nomor KTP</h1>
              <h1 className="font-medium">
                {(data as TableTeacher).id_number}
              </h1>
            </div>
            <div>
              <h1 className="text-sm">Email</h1>
              <h1 className="font-medium">
                {"user" in data ? (data.user as users).email : ""}
              </h1>
            </div>
            <div>
              <h1 className="text-sm">Nomor Hp</h1>
              <h1 className="font-medium">
                {"user" in data ? (data.user as users).phone_number : ""}
              </h1>
            </div>
            <div className="col-span-2">
              <h1 className="text-sm">Jenis Kelamin</h1>
              <h1 className="font-medium">{(data as TableTeacher).gender}</h1>
            </div>
            <div>
              <h1 className="text-sm">Jabatan</h1>
              <h1 className="font-medium">{(data as TableTeacher).position}</h1>
            </div>
            <div>
              <h1 className="text-sm">Status Kepegawaian</h1>
              <h1 className="font-medium">{(data as TableTeacher).status}</h1>
            </div>
            <div>
              <h1 className="text-sm">Tempat Lahir</h1>
              <h1 className="font-medium">
                {(data as TableTeacher).birth_place}
              </h1>
            </div>
            <div>
              <h1 className="text-sm">Tanggal Lahir</h1>
              <h1 className="font-medium">
                {(data as TableTeacher).birth_date}
              </h1>
            </div>
            <div>
              <h1 className="text-sm">Pendidikan Terakhir</h1>
              <h1 className="font-medium">
                {(data as TableTeacher).last_education}
              </h1>
            </div>
            <div className="col-span-2 my-2">
              <h1 className="text-xl font-semibold">Alamat</h1>
            </div>
            <div>
              <h1 className="text-sm">Provinsi</h1>
              <h1 className="font-medium">{(data as TableTeacher).province}</h1>
            </div>
            <div>
              <h1 className="text-sm">Kota / Kabupaten</h1>
              <h1 className="font-medium">{(data as TableTeacher).city}</h1>
            </div>
            <div>
              <h1 className="text-sm">Kecamatan</h1>
              <h1 className="font-medium">{(data as TableTeacher).district}</h1>
            </div>
            <div>
              <h1 className="text-sm">Kelurahan</h1>
              <h1 className="font-medium">
                {(data as TableTeacher).subdistrict}
              </h1>
            </div>
            <div className="col-span-2">
              <h1 className="text-sm">Alamat</h1>
              <h1 className="font-medium">{(data as TableTeacher).address}</h1>
            </div>
          </div>
          <button
            className="h-[45px] w-[120px] box-border py-3 px-6 border-primary border-2 text-primary rounded-full mt-5 self-end"
            onClick={() => {
              handleClose(false);
            }}
          >
            Tutup
          </button>
        </div>
      </div>
      <div className="fixed z-10 top-0 w-full h-screen opacity-25 bg-black"></div>
    </div>
  );
};

export default DetailTeacher;
