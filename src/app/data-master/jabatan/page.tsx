"use client";
import { useState } from "react";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { DeleteComponents } from "@/components/data-master/delete-component";
import { AddTypePayment } from "@/components/data-master/jenis-pembayaran/add-type-payment";
import { AddJobTittle } from "@/components/data-master/jabatan/add-job-tittle";

const Page = () => {
  const [addStatus, setAddStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  const toggleAdd = () => {
    setAddStatus(!addStatus);
  };

  const toggleDelete = () => {
    setDeleteStatus(!deleteStatus);
  };

  const getDetailData = async (id: number) => {}

  const handlePagination = () => {};

  const table = {
    head: ["Kode", "Nama Jabatan", "Deskripsi", "Status"],
    body: [
      {
        kode: "LIB0001",
        name: "Staff Kebersihan",
        desc: false,
        status: true,
      },
      {
        kode: "LIB0001",
        name: "Tenaga Pendidik",
        desc: false,
        status: true,
      },
      {
        kode: "LIB0001",
        name: "Guru Tahfidz",
        desc: false,
        status: true,
      },
      {
        kode: "LIB0001",
        name: "Guru Kelas",
        desc: false,
        status: true,
      },
      {
        kode: "LIB0001",
        name: "Guru Mata Pelajaran",
        desc: false,
        status: true,
      },
    ],
  };

  return (
    <div className="flex flex-col mb-10">
      <DataMasterNavigation
        from="Data Master"
        path="Jabatan"
        toggleAdd={toggleAdd}
      />
      <DeleteComponents
        status={deleteStatus}
        toggleClose={toggleDelete}
        category="Jabatan"
        path="Belum Terdaftar"
        name="undefined"
        id={null}
      />
      <TableWithToggle
        handlePagination={handlePagination}
        toggleDetail={getDetailData}
        toggleEdit={toggleAdd}
        toggleDelete={toggleDelete}
        head={table.head}
        body={table.body}
        from="jabatan"
        title="Jabatan"
      />

      <AddJobTittle onClose={toggleAdd} status={addStatus} />
    </div>
  );
};

export default Page;
