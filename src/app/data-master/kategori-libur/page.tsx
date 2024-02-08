"use client";
import { useState } from "react";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { DeleteComponents } from "@/components/data-master/delete-component";
import { AddHoliday } from "@/components/data-master/kategori-libur/add-holiday";

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
    head: ["Kode", "Nama Kategori", "Deskripsi", "Status"],
    body: [
      {
        kode: "LIB0001",
        name: "Libur Nasional",
        desc: false,
        status: true,
      },
      {
        kode: "LIB0001",
        name: "Libur Nasional",
        desc: false,
        status: true,
      },
      {
        kode: "LIB0001",
        name: "Libur Nasional",
        desc: false,
        status: true,
      },
    ],
  };

  return (
    <div className="flex flex-col mb-10">
      <DataMasterNavigation from="Data Master" path="Kategori Libur" toggleAdd={toggleAdd} />
      <DeleteComponents status={deleteStatus} toggleClose={toggleDelete} path="belum terdaftar" name="undefined" category="Kategori Libur" id={null}/>
      <TableWithToggle
      handlePagination={handlePagination}
        toggleEdit={toggleAdd}
        toggleDetail={getDetailData}
        toggleDelete={toggleDelete}
        head={table.head}
        body={table.body}
        from="kategori Libur"
        title="kategori Libur"
      />

      <AddHoliday onClose={toggleAdd} status={addStatus} />
    </div>
  );
};

export default Page;
