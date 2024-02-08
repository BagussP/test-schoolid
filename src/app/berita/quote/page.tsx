"use client";

import { AddNews } from "@/components/berita/berita/add-news";
import { AddQuote } from "@/components/berita/quotes/add-quote";
import DetailQuote from "@/components/berita/quotes/detail-quote";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { DeleteComponents } from "@/components/data-master/delete-component";
import { TableWithToggle } from "@/components/table";
import { API_URL, TOKEN } from "@/utils/api";
import { useState, useEffect, useMemo } from "react";

const Page = () => {
  const [display, setDisplay] = useState(false);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [data, setData] = useState<ApiResponseData | {}>({});
  const [editedData, setEditedData] = useState<TableQuote | {}>({});
  const [isDataModified, setIsDataModified] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    }),
    [] // Tidak ada dependensi, karena inisialisasi hanya dilakukan sekali
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/quotes?page=1&item_per_page=10`,
          {
            headers,
          }
        );
        const data: ApiResponse = await response.json();
        console.log(data.data);
        setData(data.data as ApiResponseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [headers]);

  const toggleDisplayPostAndUpdate = () => {
    setDisplay(!display);
    setIsDataModified(false);
  };

  const toggleDelete = (id: number, name: string) => {
    setDisplayDelete(true);
    setDeleteName(name);
    setDeleteId(id);
  };

  const updateData = async (id: number) => {
    console.log(id);
    try {
      const response = await fetch(`${API_URL}/quotes/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEditedData(data as TableQuote);
      setIsDataModified(true);
      setDisplay(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePagination = async (e: string | null) => {
    try {
      const response = await fetch(`${e}&item_per_page=10`, {
        headers,
      });
      const responseData: ApiResponse = await response.json();
      console.log(responseData.data);
      setData(responseData.data as ApiResponseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDetailData = async (id: number) => {
    console.log(id);
    // get id teacher
    try {
      const response = await fetch(`${API_URL}/quotes/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEditedData(data as TableNews);
      setDisplayDetail(true);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const table = {
    head: ["Tema Quote", "Isi Quote", "Sumber", "Status"],
  };

  if (data != null) {
    return (
      <div>
        <DataMasterNavigation
          from="Berita"
          path="Quote"
          toggleAdd={toggleDisplayPostAndUpdate}
        />
        <DeleteComponents
          status={displayDelete}
          toggleClose={setDisplayDelete}
          name={deleteName}
          category="Quote"
          id={deleteId}
          path="quotes"
        />
        <TableWithToggle
          toggleDetail={getDetailData}
          handlePagination={handlePagination}
          head={table.head}
          body={data}
          toggleDelete={toggleDelete}
          toggleEdit={updateData}
          from="Quote"
          title="Quote"
        />

        <AddQuote
          status={display}
          onClose={toggleDisplayPostAndUpdate}
          isDataModified={isDataModified}
          editedData={editedData}
        />
        <DetailQuote
          status={displayDetail}
          handleClose={setDisplayDetail}
          data={editedData}
        />
      </div>
    );
  } else {
    return (
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default Page;
