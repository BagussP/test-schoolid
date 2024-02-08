"use client";

import Image from "next/image";
import { ConfirmIcon, DetailIcon, DocumentIcon, Ellipsiscon, NotificationGreenIcon } from "../../buttons-icons";
import { useState, useEffect, useRef } from "react";

type PembayaranComponentsProps = {
  tanggal: string;
  name: string;
  nip: string;
  orang_tua: string;
  pembayaran: string;
  keterangan: boolean | string;
  status: string;
  toggle: (e:number) => void;
};

type Menu = {
  ellipsisStatus: boolean;
  status_payment: string;
};

export const Menu: React.FC<Menu> = ({ ellipsisStatus, status_payment }) => {
  return (
    <div
      className={`absolute flex-col bg-white p-4 right-0 top-9 z-10 shadow-[0_24px_80px_0_#21262D14] ${
        ellipsisStatus ? "inline" : "hidden"
      }`}
    >
      {status_payment.toLowerCase() === "belum lunas" ? (
        <div className=" p-4">
          <button className="flex gap-3 font-medium">
            <NotificationGreenIcon />
            <p>Kirim Pengingat</p>
          </button>
        </div>
      ) : status_payment.toLowerCase() === "menunggu proses" ? (
        <div className=" p-4">
          <button className="flex gap-3 font-medium">
            <ConfirmIcon />
            <p>Konfirmasi Pembayaran</p>
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="w-[240px] p-4">
        <button className="flex gap-3 font-medium">
          <DetailIcon />
          <p>Detail</p>
        </button>
      </div>
    </div>
  );
};

export const PembayaranComponents: React.FC<PembayaranComponentsProps> = ({
  tanggal,
  name,
  nip,
  orang_tua,
  pembayaran,
  keterangan,
  status,
  toggle,
}) => {
  const [ellipsisStatus, setEllipsisStatus] = useState(false);
  const menuRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    // Event handler to close the menu when clicking outside of it
    const handleMenuClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setEllipsisStatus(false);
      }
    };

    document.addEventListener("mousedown", handleMenuClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleMenuClickOutside);
    };
  }, []);

  const ellipsisHandle = () => {
    setEllipsisStatus(!ellipsisStatus);
  };

  return (
    <tr className="bg-white relative  h-[75px] font-medium border-b-2">
      <td className="px-5 text-[#A1A0A3]">{tanggal}</td>
      <td>
        <div className="flex gap-3">
          <Image
            src="/images/avatars/user-avatars.png"
            width={36}
            height={36}
            alt="user avatar"
          />
          <div>
            <h1>{name}</h1>
            <p className="text-[#A1A0A3] text-xs">NIP: {nip}</p>
          </div>
        </div>
      </td>
      <td>{orang_tua} </td>
      <td>{pembayaran}</td>
      {keterangan ? (
        <td>
          <div className="flex items-center text-[#A1A0A3] gap-[6px]">
            <DocumentIcon />
            <p>{keterangan}</p>
          </div>
        </td>
      ) : (
        <td className="text-[#A1A0A3]">N/A</td>
      )}

      {status.toLowerCase() === "lunas" ? (
        <td ref={menuRef}>
          <div className="flex items-center  w-full relative text-sm ">
            <p className="bg-[#EEFBEF]  py-1 px-3 text-primary max-w-[111px] h-fit rounded-full relative left-6  ">
              Lunas
            </p>
            <button
              className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center right-2 absolute"
              onClick={ellipsisHandle}
            >
              <Ellipsiscon />
            </button>
          </div>
          <Menu ellipsisStatus={ellipsisStatus} status_payment={status} />
        </td>
      ) : status.toLowerCase() === "belum lunas" ? (
        <td ref={menuRef}>
          <div className="flex items-center  w-full relative text-sm ">
            <p className="bg-[#FFF0F0]  text-center py-1 px-3 text-[#E21C1C] w-[114px] h-fit rounded-full relative  ">
              Belum Lunas
            </p>
            <button
              className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center right-2 absolute"
              onClick={ellipsisHandle}
            >
              <Ellipsiscon />
            </button>
          </div>
          <Menu ellipsisStatus={ellipsisStatus} status_payment={status} />
        </td>
      ) : (
        <td ref={menuRef}>
          <div className="flex items-center  w-full relative text-sm ">
            <p className="bg-[#FFF0F0]  text-center py-1 px-3 text-[#E2AB1C] max-w-[111px] h-fit rounded-full relative  ">
              Menunggu Proses
            </p>
            <button
              className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center right-2 absolute"
              onClick={ellipsisHandle}
            >
              <Ellipsiscon />
            </button>
          </div>
          <Menu ellipsisStatus={ellipsisStatus} status_payment={status} />
        </td>
      )}
    </tr>
  );
};
