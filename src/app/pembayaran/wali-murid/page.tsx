"use client";
import { DateIcon } from "@/components/buttons-icons";
import { TableWithToggle } from "@/components/table";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

import {
  DashboardIcon,
  GreaterThanIcon,
  RefreshIcon,
} from "@/components/buttons-icons";
const table = {
  head: [
    "Tanggal",
    "Nama Siswa",
    "Orang Tua",
    "Pembayaran",
    "Keterangan",
    "Status",
  ],
  body: [
    {
      tanggal: "03 Jul, 2023",
      name: "Ichsan Saputra M.Pd",
      nip: "2200716728",
      orang_tua: "Yanuar Muhidin",
      pembayaran: "Pembayaran SPP",
      keterangan: false,
      status: "Lunas",
    },
    {
      tanggal: "03 Jul, 2023",
      name: "Ichsan Saputra M.Pd",
      nip: "2200716728",
      orang_tua: "Yanuar Muhidin",
      pembayaran: "Pembayaran SPP",
      keterangan: false,
      status: "Lunas",
    },
    {
      tanggal: "03 Jul, 2023",
      name: "Ichsan Saputra M.Pd",
      nip: "2200716728",
      orang_tua: "Yanuar Muhidin",
      pembayaran: "Pembayaran SPP",
      keterangan: false,
      status: "Belum Lunas",
    },
    {
      tanggal: "03 Jul, 2023",
      name: "Ichsan Saputra M.Pd",
      nip: "2200716728",
      orang_tua: "Yanuar Muhidin",
      pembayaran: "Pembayaran SPP",
      keterangan: false,
      status: "Belum Lunas",
    },
    {
      tanggal: "03 Jul, 2023",
      name: "Ichsan Saputra M.Pd",
      nip: "2200716728",
      orang_tua: "Yanuar Muhidin",
      pembayaran: "Pembayaran SPP",
      keterangan: false,
      status: "Menunggu Proses",
    },
    {
      tanggal: "03 Jul, 2023",
      name: "Ichsan Saputra M.Pd",
      nip: "2200716728",
      orang_tua: "Yanuar Muhidin",
      pembayaran: "Pembayaran SPP",
      keterangan: false,
      status: "Menunggu Proses",
    },
  ],
};

const filteredData = (e:string) => {
  return table.body.filter((student) => student.status == e).length;
  
};

  const getDetailData = async (id: number) => {};


const Pembayaran = () => {
  const [status, setStatus] = useState(false);

  const toggle = () => {
    setStatus(!status);
  };

  const handlePagination = () => {};

  return (
    <div className="flex flex-col">
      <div className="flex h-52 bg-primary text-font_color text-[18px] justify-between ">
        <div className="flex gap-2 ml-25 mt-9 h-fit">
          <Link href="/">
            <DashboardIcon />
          </Link>
          <Link className="" href={`/pembayaran`}>
            Pembayaran
          </Link>
          <p> &gt;</p>
          <p className="text-white font-medium ">Pembayaran Wali Murid</p>
        </div>
        <div className="flex mt-6 mr-25 items-center gap-2 h-fit text-white text-sm">
          <div className="py-3 px-4 flex gap-10 rounded-[8px] bg-white bg-opacity-[.16]">
            <p>Semua Jenis Pembayaran</p>
            <GreaterThanIcon />
          </div>
          <div className="w-[164px] flex justify-between items-center cursor-pointer h-[44px] rounded-[9px] box-border px-4 py-3 bg-white bg-opacity-[.16] text-white">
            <p>Bulan ini</p>
            <DateIcon />
          </div>
          <button className="p-3 rounded-[8px] bg-white bg-opacity-[.16]">
            <RefreshIcon />
          </button>
        </div>
      </div>

      <div className="flex-grow mx-25 flex justify-between -mt-[89px]">
        <div className="bg-white box-border w-[392px] h-[178px] p-6 rounded-[20px] flex flex-col justify-center gap-8">
          <div className="flex gap-4 text-xl text-[#A1A0A3] items-center">
            <Image
              src="/icons/absensi/ontime.png"
              width={52}
              height={52}
              alt="ontime"
            />
            <p>LUNAS</p>
          </div>
          <h1 className="text-[38px] font-semibold">{filteredData("Lunas")} Siswa</h1>
        </div>
        <div className="bg-white box-border w-[392px] h-[178px] p-6 rounded-[20px] flex flex-col justify-center gap-8">
          <div className="flex gap-4 text-xl text-[#A1A0A3] items-center">
            <Image
              src="/icons/absensi/late.png"
              width={52}
              height={52}
              alt="ontime"
            />
            <p>MENUNGGU KONFIRMASI</p>
          </div>
          <h1 className="text-[38px] font-semibold">{filteredData("Menunggu Proses")} Siswa</h1>
        </div>
        <div className="bg-white box-border w-[392px] h-[178px] p-6 rounded-[20px] flex flex-col justify-center gap-8">
          <div className="flex gap-4 text-xl text-[#A1A0A3] items-center">
            <Image
              src="/icons/absensi/absent.png"
              width={52}
              height={52}
              alt="ontime"
            />
            <p>BELUM LUNAS</p>
          </div>
          <h1 className="text-[38px] font-semibold">{filteredData("Belum Lunas")} Siswa</h1>
        </div>
      </div>

      <div className="mt-[136px]">
        <TableWithToggle
        toggleDetail={getDetailData}
          head={table.head}
          body={table.body}
          from="Pembayaran Wali Murid"
          title="Daftar Pembayaran"
          toggleEdit={toggle}
          handlePagination={handlePagination}
          toggleDelete={toggle}
        />
      </div>
    </div>
  );
};

export default Pembayaran;
