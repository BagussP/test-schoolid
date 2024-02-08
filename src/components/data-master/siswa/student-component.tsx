"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  DeleteIcon,
  DetailIcon,
  EditIcon,
  Ellipsiscon,
} from "../../buttons-icons";

type StudentComponent = {
  nisn: string;
  name: string;
  kelas: string;
  desc: string | boolean;
  status: boolean;
  toggleEdit: (e: number) => void;
  toggleDelete: (e: number, name: string) => void;
};

type Menu = {
  ellipsisStatus: boolean;
  toggleEdit: (e: number) => void;
  toggleDelete: (e: number, name: string) => void;
};

export const Menu: React.FC<Menu> = ({
  ellipsisStatus,
  toggleEdit,
  toggleDelete,
}) => {
  return (
    <div
      className={`absolute flex-col bg-white p-4 right-0 top-9 z-10 shadow-[0_24px_80px_0_#21262D14] ${
        ellipsisStatus ? "inline" : "hidden"
      }`}
    >
      <div className=" p-4">
        <button className="flex gap-3 font-medium" onClick={() => {toggleEdit(1)}}>
          <EditIcon />
          <p>Edit</p>
        </button>
      </div>
      <div className="w-[240px] p-4">
        <button className="flex gap-3 font-medium">
          <DetailIcon />
          <p>Detail</p>
        </button>
      </div>
      <div className=" p-4">
        <button className="flex gap-3 font-medium" >
          <DeleteIcon />
          <p className="text-[#E21C1C]">Hapus</p>
        </button>
      </div>
    </div>
  );
};

export const StudentComponent: React.FC<StudentComponent> = ({
  nisn,
  name,
  kelas,
  desc,
  status,
  toggleEdit,
  toggleDelete
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

    document.addEventListener("mousedown", handleMenuClickOutside); // For clicking outside the menu

    return () => {
      document.removeEventListener("mousedown", handleMenuClickOutside);
    };
  }, []);

  const ellipsisHandle = () => {
    setEllipsisStatus(!ellipsisStatus);
  };

  return (
    <tr className="h-[76px] font-medium bg-white border-b-2 border-b-[#F7F6F9]">
      <td className="text-[#A1A0A3] font-medium px-5">{nisn}</td>
      <td>
        <div className="flex gap-3 items-center">
          <Image
            src={`/images/avatars/user-avatars.png`}
            width={36}
            height={36}
            alt={name}
          />
          <p>{name}</p>
        </div>
      </td>
      <td>{kelas}</td>
      {desc ? (
        <td className="text-[#A1A0A3]">{desc}</td>
      ) : (
        <td className="text-[#A1A0A3]">N/A</td>
      )}

      {/* Menu */}
      {status ? (
        <td ref={menuRef}>
          <div className="flex items-center gap-4 relative">
            <p className="bg-[#EEFBEF] text-primary font-medium px-4 py-1 rounded-full">
              Active
            </p>
            <button
              className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center"
              onClick={ellipsisHandle}
            >
              <Ellipsiscon />
            </button>
            <Menu toggleDelete={toggleDelete} toggleEdit={toggleEdit} ellipsisStatus={ellipsisStatus} />
          </div>
        </td>
      ) : (
        <td ref={menuRef}>
          <div className="flex items-center gap-4 relative">
            <p className="bg-[#EEFBEF] text-primary font-medium px-4 py-1 rounded-full">
              Deactive
            </p>
            <button
              className="w-6 h-5 rounded-full bg-[#F8F8F8] flex items-center justify-center"
              onClick={ellipsisHandle}
            >
              <Ellipsiscon />
            </button>
            <Menu toggleDelete={toggleDelete} toggleEdit={toggleEdit} ellipsisStatus={ellipsisStatus} />
          </div>
        </td>
      )}
    </tr>
  );
};
