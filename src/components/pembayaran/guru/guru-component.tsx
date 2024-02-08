"use client";

import Image from "next/image";
import { DetailIcon, DocumentIcon, Ellipsiscon } from "../../buttons-icons";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

type PembayaranComponentsProps = {
  date: string;
  name: string;
  nip: string;
  status: string;
  total_received: boolean | string;
  active: string | boolean;
  toggle: (e: string, s?: any) => void;
  id: any;
};

type Menu = {
  ellipsisStatus: boolean;
  status_payment: string;
  toggleEdit: () => void;
};

export const Menu: React.FC<Menu> = ({
  ellipsisStatus,
  status_payment,
  toggleEdit,
}) => {
  return (
    <div
      className={`absolute flex-col bg-white p-4 right-0 top-9 z-10 shadow-[0_24px_80px_0_#21262D14] ${
        ellipsisStatus ? "inline" : "hidden"
      }`}
    >
      <div className="w-[240px] p-4">
        <button className="flex gap-3 font-medium" onClick={toggleEdit}>
          <DetailIcon />
          <p>Detail</p>
        </button>
      </div>
    </div>
  );
};

export const PembayaranGuruComponents: React.FC<PembayaranComponentsProps> = ({
  date,
  name,
  nip,
  status,
  total_received,
  active,
  toggle,
  id,
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
      <td className="px-5 ">{date}</td>
      <td className="   ">
        {dayjs()
          .month(parseInt(nip) - 1)
          .format("MMMM")}
      </td>
      <td>
        <div className="flex gap-3 items-center ">
          {/* <Image
            src="/images/avatars/user-avatars.png"
            width={36}
            height={36}
            alt="user avatar"
          /> */}

          <h1>{name}</h1>
        </div>
      </td>
      {/* <td>{status} </td>   */}
      <td ref={menuRef}>
        <div className="flex items-center  w-full relative text-sm ">
          {total_received}
          <button
            className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center ml-5"
            onClick={ellipsisHandle}
          >
            <Ellipsiscon />
          </button>
        </div>
        <Menu
          ellipsisStatus={ellipsisStatus}
          status_payment={status}
          toggleEdit={() => {
            toggle(date, id);
          }}
        />
      </td>
      {/* 
      <td ref={menuRef}>
        <div className="flex items-center  w-full relative text-sm ">
          <p className="bg-[#EEFBEF]  py-1 px-3 text-primary max-w-[111px] h-fit rounded-full  ">
            Lunas
          </p>
          <button
            className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center right-2 absolute"
            onClick={ellipsisHandle}
          >
            <Ellipsiscon />
          </button>
        </div>
        <Menu
          ellipsisStatus={ellipsisStatus}
          status_payment={status}
          toggleEdit={() => {
            toggle(1);
          }}
        />
      </td> */}
    </tr>
  );
};
