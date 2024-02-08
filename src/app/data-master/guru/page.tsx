"use client";
import { useState, useEffect, useMemo } from "react";
import { AddTeacher } from "@/components/data-master/guru/add-teacher";
import { TableWithToggle } from "@/components/table";
import { DataMasterNavigation } from "@/components/data-master/data-master-navigation";
import { DeleteComponents } from "@/components/data-master/delete-component";
import { API_URL, TOKEN } from "@/utils/api";
import DetailTeacher from "@/components/data-master/guru/detail-teacher";
import { useRouter } from "next/navigation";

const Page = () => {
  const [display, setDisplay] = useState(false);
  const [displayDetail, setDisplayDetail] = useState(false);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [data, setData] = useState<ApiResponseData | {}>({});
  const [editedData, setEditedData] = useState<TableTeacher | {}>({});
  const [isDataModified, setIsDataModified] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState("");
  const router = useRouter();
  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/gurus?page=1&item_per_page=10`,
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

  const toggleAdd = () => {
    setDisplay(!display);
    setIsDataModified(false);
  };

  const toggleDelete = (id: number, name: string) => {
    setDisplayDelete(true);
    setDeleteName(name);
    setDeleteId(id);
  };

  const updateData = async (id: number) => {
    // get id teacher
    try {
      const response = await fetch(`${API_URL}/gurus/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEditedData(data.data as TableTeacher);
      setDisplay(true);
      setIsDataModified(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDetailData = async (id: number) => {
    // get id teacher
    try {
      const response = await fetch(`${API_URL}/gurus/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEditedData(data.data as TableTeacher);
      setDisplayDetail(true);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const table = {
    head: [
      "NIP",
      "Nama Guru",
      "Jenis Kelamin",
      "Status Kepegawaian",
      "No. HP",
      "Status",
    ],
  };

  console.log(data);
  if (data != null) {
    return (
      <div className="flex flex-col mb-10">
        <DataMasterNavigation
          from="Data Master"
          path="Guru"
          toggleAdd={toggleAdd}
        />
        <DeleteComponents
          status={displayDelete}
          toggleClose={setDisplayDelete}
          id={deleteId}
          category="Guru"
          name={deleteName}
          path="gurus"
        />
        <TableWithToggle
          toggleEdit={updateData}
          toggleDelete={toggleDelete}
          handlePagination={handlePagination}
          toggleDetail={getDetailData}
          head={table.head}
          body={data}
          from="guru"
          title="Guru"
        />
        <AddTeacher
          display={display}
          onClose={toggleAdd}
          isDataModified={isDataModified}
          data={editedData}
        />
        <DetailTeacher
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
