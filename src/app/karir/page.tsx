"use client";

import { useState } from "react";
import { GreaterThanIcon, RefreshIcon } from "@/components/buttons-icons";
import { TableWithToggle } from "@/components/table";
import { AddCareer } from "@/components/karir/add-career";

const Page = () => {
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const toggleAdd = () => {
    setAddStatus(!addStatus);
  };

  const toggleDelete = () => {
    setDeleteStatus(!deleteStatus);
  };

  const getDetailData = async (id: number) => {};


  const handlePagination = () => {};

  const table = {
    head: ["Dibuat", "Keterangan", "Jabatan", "Status"],
    body: [
      {
        created_at: "4 Jul 2023",
        desc: "Lowongan Posisi Guru Pengajar Matematika",
        position: "Guru",
        active: true,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <div className="flex px-25 gap-2 h-52 bg-primary text-white justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl ml-25 mt-7">Halo Muhammad!</h1>
          <p className="ml-25">
            Selamat datang di Portal Admin MI Sabilussalam
          </p>
        </div>

        <div className="flex mt-6 mr-25 items-center gap-2 h-fit text-white text-sm">
          <div className="py-3 px-4 flex gap-10 rounded-[8px] bg-white bg-opacity-[.16]">
            <p>All Status</p>
            <GreaterThanIcon />
          </div>
          <button className="p-3 rounded-[8px] bg-white bg-opacity-[.16]">
            <RefreshIcon />
          </button>
          <button
              onClick={toggleAdd}
            className="py-3 px-6 rounded-full bg-white text-primary font-semibold"
          >
            Tambah +
          </button>
        </div>
      </div>

      <div className="mt-[31.5px]">
        <TableWithToggle
        toggleDetail={getDetailData}
        handlePagination={handlePagination}
          head={table.head}
          body={table.body}
          toggleDelete={toggleAdd}
          toggleEdit={toggleAdd}
          from="karir"
          title="Karir"
        />
      </div>

      <AddCareer  status={addStatus} onClose={toggleAdd}/>
    </div>
  );
};

export default Page;
