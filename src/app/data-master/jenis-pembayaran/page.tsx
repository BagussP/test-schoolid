"use client";
import { useState } from "react";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { DeleteComponents } from "@/components/data-master/delete-component";
import { AddTypePayment } from "@/components/data-master/jenis-pembayaran/add-type-payment";

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
      head: ["Kode", "Nama Jenis Pembayaran", "Deskripsi", "Status"],
      body: [
        {
          kode: "LIB0001",
          name: "Bulanan",
          desc: false,
          status: true,
        },
        {
          kode: "LIB0001",
          name: "Perlengkapan Sekolah",
          desc: false,
          status: true,
        },
        {
          kode: "LIB0001",
          name: "Operasional",
          desc: false,
          status: true,
        },
      ],
    }
  

    return (
      <div className="flex flex-col mb-10">
        <DataMasterNavigation from="Data Master" path="Jenis Pembayaran" toggleAdd={toggleAdd} />
        <DeleteComponents status={deleteStatus} toggleClose={toggleDelete} path="belum terdaftar" name="undefined" id={null} category="Jenis Pembayaran"/>
        <TableWithToggle
        handlePagination={handlePagination}
          toggleEdit={toggleAdd}
          toggleDetail={getDetailData}
          toggleDelete={toggleDelete}
          head={table.head}
          body={table.body}
          from="jenis pembayaran"
          title="jenis pembayaran"
        />

        <AddTypePayment onClose={toggleAdd} status={addStatus} />
      </div>
    );
  }

export default Page;
