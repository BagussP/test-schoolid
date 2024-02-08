"use client";
import { useState } from "react";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { AddPayment } from "@/components/data-master/pembayaran/add-payment";
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
    head: [
      "Kode",
      "Nama Pembayaran",
      "Jenis Pembayaran",
      "Deskripsi",
      "Status",
    ],
    body: [
      {
        kode: "CLS202301",
        name: "Bulanan",
        typeOfPayment: "",
        desc: false,
        status: true,
      },
      {
        kode: "CLS202301",
        name: "Perlengkapan Sekolah",
        typeOfPayment: "",
        desc: false,
        status: true,
      },
      {
        kode: "CLS202301",
        name: "Operasional",
        typeOfPayment: "",
        desc: false,
        status: true,
      },
    ],
  };

  return (
    <div className="flex flex-col mb-10">
      <DataMasterNavigation from="Data Master" path="Pembayaran" toggleAdd={toggleAdd} />
      <DeleteComponents status={deleteStatus} toggleClose={toggleDelete} name="undefined" path="belum terdaftar" id={null} category="Pembayaran" />
      <TableWithToggle
      toggleDetail={getDetailData}
      handlePagination={handlePagination}
        toggleEdit={toggleAdd}
        toggleDelete={toggleDelete}
        head={table.head}
        body={table.body}
        from="pembayaran"
        title="Pembayaran"
      />

      <AddPayment status={addStatus} onClose={toggleAdd} />
    </div>
  );
};

export default Page;
