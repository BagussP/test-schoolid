"use client";
import { useState } from "react";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { AddClass } from "@/components/data-master/kelas/add-class";
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
      head: ["Kode", "Nama Kelas", "Kuota Siswa", "Deskripsi", "Status"],
      body: [
        {
          kode: "CLS202301",
          kelas: "Kelas 2",
          quota: "32 Siswa",
          desc: false,
          status: true,
        },
        {
          kode: "CLS202301",
          kelas: "Kelas 3",
          quota: "32 Siswa",
          desc: false,
          status: true,
        },
        {
          kode: "CLS202301",
          kelas: "Kelas 4",
          quota: "32 Siswa",
          desc: false,
          status: true,
        },
        {
          kode: "CLS202301",
          kelas: "Kelas 5",
          quota: "32 Siswa",
          desc: false,
          status: true,
        },
        {
          kode: "CLS202301",
          kelas: "Kelas 6",
          quota: "32 Siswa",
          desc: false,
          status: true,
        },
      ],
    }

    return (
      <div className="flex flex-col mb-10">
        <DataMasterNavigation from="Data Master" path="Kelas" toggleAdd={toggleAdd} />
        <DeleteComponents status={deleteStatus} toggleClose={toggleDelete} path="belum terdaftar" category="Kelas" name="undefined" id={null}/>
        <TableWithToggle
        toggleDetail={getDetailData}
        handlePagination={handlePagination}
          toggleEdit={toggleAdd}
          toggleDelete={toggleDelete}
          head={table.head}
          body={table.body}
          from="kelas"
          title="kelas"
        />

        <AddClass status={addStatus} onClose={toggleAdd} />
      </div>
    );
  }


export default Page