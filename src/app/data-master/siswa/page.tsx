"use client";
import { useState } from "react";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { AddStudent } from "@/components/data-master/siswa/add.student";
import { DeleteComponents } from "@/components/data-master/delete-component";


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
    head: ["NISN", "Nama Siswa", "Kelas", "Deskripsi", "Status"],
    body: [
      {
        nisn: "000333788",
        name: "Rohkim Nanang",
        kelas: "Kelas 1a",
        desc: false,
        status: true,
      },
      {
        nisn: "000333788",
        name: "Rohkim Nanang",
        kelas: "Kelas 1a",
        desc: false,
        status: true,
      },
      {
        nisn: "000333788",
        name: "Rohkim Nanang",
        kelas: "Kelas 1a",
        desc: false,
        status: true,
      },
    ],
  };

  return (
    <div className="flex flex-col mb-10">
      <DataMasterNavigation from="Data Master" path="Siswa" toggleAdd={toggleAdd} />
      <DeleteComponents status={deleteStatus} toggleClose={toggleDelete} category="Siswa" id={null} name="undefined" path="belum terdaftar"/>
      <TableWithToggle
      handlePagination={handlePagination}
      toggleDetail={getDetailData}
        toggleEdit={toggleAdd}
        toggleDelete={toggleDelete}
        head={table.head}
        body={table.body}
        from="siswa"
        title="Siswa"
      />

      <AddStudent status={addStatus} onClose={toggleAdd} />
    </div>
  );
};

export default Page;
