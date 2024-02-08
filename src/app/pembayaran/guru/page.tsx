"use client";
import { DateIcon } from "@/components/buttons-icons";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { AddTeachersPayments } from "@/components/pembayaran/guru/add-teachers-payments";
import { DetailTeacherPayment } from "@/components/pembayaran/guru/detail";
import { TableWithToggle } from "@/components/table";
import { API_URL, TOKEN } from "@/utils/api";
import Image from "next/image";
import { useState, useEffect, useMemo, useId } from "react";

type PenggajianGuru = {
  date: string;
  name: string;
  nip: string;
  status: string;
  total_received: string;
  active: boolean;
  user_id: string;
};

const Pembayaran = () => {
  const [status, setStatus] = useState(false);
  const [detailStatus, setDetailStatus] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  const [data, setData] = useState([]);
  const [dataTeacher, setDataTeacher] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  const [paymentId, setPaymentId] = useState(0);
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      "School-Code" : "SBBSALAM"
    }),
    [] // Tidak ada dependensi, karena inisialisasi hanya dilakukan sekali
  );

  useEffect(() => {
    const fetchDataUser = async (user_id?: string) => {
      try {
        const response = await fetch(`${API_URL}/gurus?item_per_page=100`, {
          headers,
          // body: JSON.stringify({
          //   item_per_page: 100
          // })
        });
        const responseData = await response.json();
        // setData({ profile: responseData.data});
        // console.log("lewat", responseData.data);
        setDataTeacher(responseData.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (data.length > 0) {
      console.log("lewat if");
    }

    const fetchDataGajis = async () => {
      try {
        const response = await fetch(`${API_URL}/gajis`, { headers });
        const responseData = await response.json();
        setData(responseData.data.data);
        console.log(responseData.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataGajis();
    fetchDataUser();
  }, [headers, data]);

  const handleClose = () => {
    setDetailStatus(!detailStatus);
  };

  const toggle = (userId: any, paymentId: any) => {
    setDetailStatus(!detailStatus);
    setUserId(userId);
    setPaymentId(paymentId);
    console.log(dataTeacher.filter((data) => data.user_id === userId)[0]);
    // console.log(
    //   data.filter(
    //     (data: PembayaranGuru) =>
    //       data.user_id === userId && data.id === paymentId
    //   )[0]
    // );
  };

  const getDetailData = async (id: number) => {};

  const toggleAdd = () => {
    setAddStatus(!addStatus);
  };

  const handlePagination = async (e: string | null) => {
    try {
      const response = await fetch(`${e}&item_per_page=10`, {
        headers,
      });
      const responseData = await response.json();
      console.log(responseData.data);
      // setData(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const table = {
    head: [
      // "Tanggal",
      // "NIP",
      // "Nama Guru",
      // "Jabatan",
      // "Total Diterima",
      // "Status",
      "User Id",
      "Bulan",
      "Tahun",
      "Total",
    ],
  };

  return (
    <div className="flex flex-col">
      <DataMasterNavigation
        from="Pembayaran"
        path="Penggajian Guru"
        toggleAdd={toggleAdd}
      />

      <div>
        <TableWithToggle
          toggleDetail={getDetailData}
          handlePagination={handlePagination}
          head={table.head}
          body={data}
          from="Pembayaran Guru"
          title="Penggajian Guru"
          toggleEdit={toggle}
          toggleDelete={toggle}
        />
      </div>
      <DetailTeacherPayment
        status={detailStatus}
        handleClose={handleClose}
        dataUser={dataTeacher.filter((data) => data.user_id === userId)[0] ? dataTeacher.filter((data) => data.user_id === userId)[0] : {}}
        dataPayment={data.filter(
          (data: PembayaranGuru) =>
            data.user_id === userId && data.id === paymentId
        )[0] ? data.filter(
          (data: PembayaranGuru) =>
            data.user_id === userId && data.id === paymentId
        )[0] : {}}
      />
      <AddTeachersPayments
        dataTeacher={dataTeacher}
        status={addStatus}
        onClose={toggleAdd}
      />
    </div>
  );
};

export default Pembayaran;
