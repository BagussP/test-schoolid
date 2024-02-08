"use client";

import { useState } from "react";
import { CloseIcon, MoneyIcon } from "@/components/buttons-icons";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import { API_URL } from "@/utils/api";

type DetailTeacherPayment = {
  status: boolean;
  handleClose: () => void;
  dataPayment: any
  dataUser: any;
};

export const DetailTeacherPayment: React.FC<DetailTeacherPayment> = ({
  status,
  handleClose,
  dataPayment,
  dataUser
}) => { 
  const [navigation, setNavigation] = useState(0);
console.log(dataUser, "detail")
  if (status) {
    return (
      <article className="block">
        <div className="flex flex-col gap-8 absolute w-[816px] h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-20 box-border p-6 rounded-[20px] bg-white ">
          <div className="flex justify-between w-full">
            <h1 className="font-semibold text-xl">Detail Penggajian</h1>
            <button className="h-fit w-fit" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex gap-3">
            <Image
              src={`https://staging.nutshells.id/ ${dataUser.image}`}
              width={80}
              height={80}
              alt="profile"
              unoptimized={true}
            />
            <div className="flex flex-col justify-around items-start">
              <h1 className="font-medium text-xl">{dataUser.name}</h1>
              <p className="bg-[#EEFBEF] font-medium py-1 px-3 text-primary max-w-[111px] h-fit rounded-full  ">
                Lunas
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-1">
            <div
              className={`py-4 px-5 rounded-full cursor-pointer ${
                navigation === 0
                  ? `border-2 font-semibold text-primary border-primary`
                  : `font-medium text-[#A1A0A3]`
              }`}
              onClick={() => setNavigation(0)}
            >
              Umum
            </div>
            <div
              className={`py-4 px-5 rounded-full cursor-pointer ${
                navigation === 1
                  ? `border-2 font-semibold text-primary border-primary`
                  : `font-medium text-[#A1A0A3]`
              }`}
              onClick={() => setNavigation(1)}
            >
              Data Orang Tua
            </div>
          </div>

          <General
            status=""
            navigation={navigation}
            dataUser={dataUser}
            dataPayment={dataPayment}
          />
          <KomponenGaji
            status=""
            navigation={navigation}
            dataUser={dataUser}
            dataPayment={dataPayment}
          />

          <div className="w-full justify-end right-6 flex gap-2">
            <button
              onClick={handleClose}
              className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>

        <div className="fixed z-10 top-0 w-full h-screen opacity-25 bg-black"></div>
      </article>
    );
  }
  return <div className="hidden"></div>;
};

type General = {
  status: string;
  navigation: number;
  dataUser: any
  dataPayment: any
};

const General: React.FC<General> = ({ status, navigation, dataUser,
  dataPayment}) => {
  if (navigation == 0) {
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 flex flex-col gap-2">
          <h1 className="font-medium text-xs">NIP</h1>
          <h1 className="font-medium text-sm">{dataUser.nip}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xs">Jabatan Guru</h1>
          <h1 className="font-medium text-sm">{dataUser.position}</h1>{" "}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xs">Tanggal Penggajian</h1>
          <h1 className="font-medium text-sm">
            {dayjs().month(dataPayment.bulan - 1).format("MMMM")} {dataPayment.tahun}
          </h1>
        </div>
        {/* <div className="col-span-2 flex flex-col gap-2">
          <h1 className="font-medium text-xs">Bukti Transfer</h1>
          <Image src={"/images/thumbnail/bukti.png"} width={180} height={100} alt="bukti"/>
        </div> */}
      </div>
    );
  }
};

const KomponenGaji: React.FC<General> = ({ status, navigation, dataPayment, dataUser }) => {
  if (navigation == 1) {
    return (
      <div className="flex flex-col gap-5">
        <div className="text-xs">
          <h1 className="mb-3">Keterangan</h1>
          <p>{dataPayment.keterangan}</p>
        </div>

        <h1 className="text-lg font-semibold">Komponen Gaji</h1>

        <div>
          <div className="flex items-center justify-between p-4 text-sm font-semibold">
            <h1>Gaji Pokok</h1>
            <MoneyIcon />
          </div>
          <div>
            <div className="flex justify-between p-4 text-sm font-medium text-[#A1A0A3]">
              <h1>Gaji Pokok</h1>
              <p>{dataPayment.total_gaji}</p>
            </div>
            <div className="flex justify-between p-4 text-sm font-semibold bg-[#F8F8F8]">
              <h1>Total Gaji Pokok</h1>
              <p>{dataPayment.total_gaji}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between p-4">
            <h1 className="text-sm font-semibold">Tunjangan</h1>
            <MoneyIcon />
          </div>
          <div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Tunjangan Guru Kelas</h1>
              <p>{dataPayment.tunjangan_guru_kelas}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Jabatan tambahan</h1>
              <p>{dataPayment.jabatan_tambahan}</p>
            </div>
            {/* <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Jumlah hari</h1>
              <p>{dataPayment.hari_masuk}</p>
            </div> */}
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Libur Sekolah</h1>
              <p>{dataPayment.libur_sekolah}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Hari masuk</h1>
              <p>{dataPayment.hari_masuk}</p>
            </div>
            {/* <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Hari libur kebijakan sekolah/kementrian</h1>
              <p>1</p>
            </div> */}
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Izin sakit</h1>
              <p>{dataPayment.sakit}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Izin</h1>
              <p>{dataPayment.izin}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Transport per hari</h1>
              <p>{dataPayment.transport_perhari}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Transport 1 (100%)</h1>
              <p>{dataPayment.transport_1_100}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Transport 2 (70%)</h1>
              <p>{dataPayment.transport_2_70}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Transport 3 (70%)</h1>
              <p>{dataPayment.transport_3_70}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Transport 4 (50%)</h1>
              <p>Rp {dataPayment.transport_5_70}</p>
            </div>
            {/* <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Jumlah Transport</h1>
              <p>Rp 976,500</p>
            </div> */}
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Pulsa</h1>
              <p>Rp {dataPayment.pulsa}</p>
            </div>
          </div>
          <div className="flex justify-between p-4 bg-[#F8F8F8] mt-4">
            <h1 className="text-sm font-semibold">Total Penghasilan</h1>
            <p className="text-sm font-semibold">Rp {dataPayment.total_gaji}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between p-4 text-sm font-semibold">
            <h1>BSU</h1>
            <MoneyIcon />
          </div>
          <div>
            <div className="flex justify-between px-4 py-2 text-sm font-medium text-[#A1A0A3]">
              <h1>JTM BSU</h1>
              <p>{dataPayment.jtm_bsu}</p>
            </div>
            <div className="flex justify-between px-4 py-2 text-sm font-medium text-[#A1A0A3]">
              <h1>Nominal BSU</h1>
              <p>Rp {dataPayment.nominal_bsu}</p>
            </div>
            <div className="flex justify-between px-4 py-2 text-sm font-medium text-[#A1A0A3]">
              <h1>BSU yang dibayarkan</h1>
              <p>Rp {dataPayment.bsu_dibayar}</p>
            </div>
            <div className="flex justify-between px-4 py-2 text-sm font-medium text-[#A1A0A3]">
              <h1>Jumlah jam pengganti (dalam 1 bulan)</h1>
              <p>{dataPayment.jumlah_jam_pengganti}</p>
            </div>
            <div className="flex justify-between px-4 py-2 text-sm font-medium text-[#A1A0A3]">
              <h1>Guru pengganti</h1>
              <p>{dataPayment.guru_pengganti}</p>
            </div>
            {/* <div className="flex justify-between p-4 text-sm font-semibold bg-[#F8F8F8] mt-4">
              <h1>Total Potongan</h1>
              <p>Rp 310,000</p>
            </div> */}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between p-4">
            <h1 className="text-sm font-semibold">Lain - lain</h1>
            <MoneyIcon />
          </div>
          <div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Uang makan</h1>
              <p>Rp {dataPayment.uang_makan}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Tunjangan kesehatan</h1>
              <p>Rp {dataPayment.tunjangan_kesehatan}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Tunjangan keluarga</h1>
              <p>Rp {dataPayment.tunjangan_keluarga}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Ekskul (siswa)</h1>
              <p>Rp {dataPayment.eskul_siswa}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Ekskul</h1>
              <p>Rp {dataPayment.eskul}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>(PIKET)</h1>
              <p>Rp {dataPayment.piket}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Pelatiah upacara</h1>
              <p>Rp {dataPayment.pelatih_upacara}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Mentoring</h1>
              <p>Rp {dataPayment.mentoring}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Lain - lain 1</h1>
              <p>Rp {dataPayment.lain_1}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Lain - lain 2</h1>
              <p>Rp {dataPayment.lain_2}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Lain - lain 3</h1>
              <p>Rp {dataPayment.lain_3}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Lain - lain 4</h1>
              <p>Rp {dataPayment.lain_4}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Pot. Terlambat</h1>
              <p>Rp {dataPayment.potongan_terlambat}</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-sm text-[#A1A0A3] font-medium">
              <h1>Data keterlambatan</h1>
              <p>Rp {dataPayment.data_terlambat}</p>
            </div>
          </div>
          {/* <div className="flex justify-between p-4 bg-[#F8F8F8] mt-4">
            <h1 className="text-sm font-semibold">Total Penghasilan</h1>
            <p className="text-sm font-semibold">Rp 2,584,000</p>
          </div> */}
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-primary">Total yang Diterima</p>
          <h1 className="font-semibold text-3xl">Rp {dataPayment.total_gaji}</h1>
        </div>
      </div>
    );
  }
};
