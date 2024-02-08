"use client";
import { CloseIcon, ImageIcon } from "@/components/buttons-icons";
import { useState, useEffect } from "react";
import {
  FormInput,
  FormInputFile,
  FormTextarea,
  ToggleButton,
} from "@/components/form-components";
import { API_URL, TOKEN } from "@/utils/api";

type AddQuoteProps = {
  status: boolean;
  onClose: () => void;
  isDataModified: boolean;
  editedData: TableQuote | {};
};

export const AddQuote: React.FC<AddQuoteProps> = ({
  status,
  onClose,
  isDataModified,
  editedData,
}) => {
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const [pathImage, setPathImage] = useState("");

  const initializeState = (quoteData: TableQuote) => {
    setWriter(quoteData.name || "");
    setTitle(quoteData.title || "");
    setContent(quoteData.content || "");
    setPathImage(quoteData.image || "");
  };

  useEffect(() => {
    if (isDataModified) {
      initializeState(editedData as TableQuote);
    } else if (!status) {
      // Reset semua state ke nilai awal
      initializeState({} as TableQuote);
    } else {
      // Reset semua state ke nilai awal
      initializeState({} as TableQuote);
    }
  }, [isDataModified, editedData, status]);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const hasEmptyValue = (...values: string[]) => {
    return values.some((value) => value.trim() === "");
  };

  const isButtonDisabled = hasEmptyValue(title, writer, content, pathImage);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      const date = new Date();
      try {
        const response = await fetch(`${API_URL}/quotes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            "School-Code": "SBBSALAM",
          },
          body: JSON.stringify({
            device_id: "23x2waw",
            name: writer,
            title: title,
            content: content,
            image: pathImage,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
        location.reload();

        if (!response.ok) {
          alert("Network response was not ok");
        }
      } catch (err) {
        alert("err");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      try {
        const response = await fetch(
          `${API_URL}/quotes/${(editedData as TableQuote).id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
              "School-Code": "SBBSALAM",
            },
            body: JSON.stringify({
              device_id: "23x2waw",
              name: writer,
              title: title,
              content: content,
              image: pathImage,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        location.reload();

        if (!response.ok) {
          alert("Network response was not ok");
        }
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className={`${status ? "flex" : "hidden"}`}>
      <div className="flex flex-col gap-2 absolute w-[816px] h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-20 box-border p-6 rounded-[20px] bg-white ">
        <div className="flex justify-between w-full">
          {isDataModified ? (
            <h1 className="font-semibold text-xl">Edit Quote</h1>
          ) : (
            <h1 className="font-semibold text-xl">Tambah Quote</h1>
          )}
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={isDataModified ? handleUpdate : handlePost}>
          <div className="grid grid-cols-2 gap-5 mt-6">
            <div className="col-span-2">
              <FormInputFile
                isDataModified={isDataModified}
                setPathImage={setPathImage}
                display={status}
                pathImage={pathImage}
                to="quotes"
              />
            </div>
            <div className="col-span-2">
              <FormInput
                input="text"
                value={title}
                onChange={setTitle}
                label="Tema Quote"
                placeholder="ex: Kemanusiaan"
              />
            </div>
            <div className="col-span-2">
              <FormInput
                input="text"
                value={writer}
                onChange={setWriter}
                label="Sumber"
                placeholder="Masukkan nama sumber"
              />
            </div>
            <div className="col-span-2">
              <FormTextarea
                value={content}
                onChange={setContent}
                label="Konten Quote"
                placeholder="Masukkan quote disini"
              />
            </div>
          </div>

          {/* <ToggleButton toggleSwitch={toggleSwitch} checked={checked} /> */}

          <div className="w-full justify-end right-6 flex gap-2">
            <div
              onClick={onClose}
              className="px-10 py-3 cursor-pointer rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </div>
            <button
              disabled={isButtonDisabled}
              className={`${
                !isButtonDisabled
                  ? "bg-primary text-white cursor-pointer"
                  : "bg-[#E6E6E6] text-[#A1A0A3]"
              } px-8 py-3 rounded-full box-border w-[120px] h-[45px]  text-sm font-semibold`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>

      <div className="fixed top-0 w-full z-10 h-screen opacity-25 bg-black"></div>
    </div>
  );
};
