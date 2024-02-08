import Image from "next/image";
import { useState, useEffect } from "react";
import { CloseIcon, ImageIcon } from "./buttons-icons";
import { API_URL, TOKEN } from "@/utils/api";

type FormInputFile = {
  setPathImage: (event: string) => void;
  pathImage: string;
  display: boolean;
  to: string;
  isDataModified : boolean;
};

export const FormInputFile: React.FC<FormInputFile> = ({
  setPathImage,
  pathImage,
  display,
  to,
  isDataModified
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedimage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
      if(!display || isDataModified) {
        setImage(null)
      }
    }, [display, isDataModified])
  

  const handleFileUpload = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(`${API_URL}/${to}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        body: formData,
      });
      if (response.ok) {
        const responseData = await response.json();
        setPathImage(responseData.data);
        alert(`gambar berhasil diupload`);
      }
    } catch (error) {
      setImage(null)
      alert("maksimal gambar 2mb");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedImage(files[0]);
      setImage(URL.createObjectURL(files[0]));
      handleFileUpload(files[0])
    }
  };


  return (
    <div
      onClick={() => {
        if (image == null) {
          const chooseImageInput =
            document.querySelector<HTMLInputElement>("#chooseImage");
          if (chooseImageInput) {
            chooseImageInput.click();
          }
        }
      }}
      className={`${
        pathImage || image ? "w-fit h-fit cursor-auto" : "w-25 h-25"
      }  relative flex flex-col gap-2 items-center justify-center rounded-[12px] bg-[#F8F8F8] `}
    >
      <input
        type="file"
        key={image}
        accept="image/*"
        id="chooseImage"
        className="hidden"
        onChange={handleFileChange}
      />
      {image ? (
        <Image src={image} height={200} width={200} alt={image} />
      ) : pathImage ? (
        <Image
          src={`${pathImage}`}
          height={200}
          width={200}
          alt={pathImage}
        />
      ) : (
        <ImageIcon />
      )}
      <div
        className={`${
          image || pathImage ? "absolute" : "hidden"
        } top-2 right-2 cursor-pointer z-50`}
        onClick={() => {
          setPathImage("");
          setImage(null);
        }}
      >
        <CloseIcon />
      </div>

      <div className={`${image || pathImage ? "hidden" : "inline-block"}`}>
        <h1 className="text-xs font-semibold">Upload Foto</h1>
        <p className="text-[10px] text-[#A1A0A3] text-center">Maks 2MB</p>
      </div>
    </div>
  );
};

type FormInputProps = {
  label: string;
  placeholder: string;
  value: string;
  input: string;
  onChange: (event: string) => void;
};

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  input,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (input == "number") {
      const { value } = event.target;
      const newValue = value.replace(/[^0-9]/g, ""); // Hanya mengizinkan angka
      onChange(newValue);
    } else if (input != "number") {
      onChange(event.target.value);
    }
  };

  if (label == "Kode") {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs text-black font-normal" htmlFor={label}>
          {label}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          id={label}
          onChange={() => {
            return true;
          }}
          value={value}
          className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-black font-normal" htmlFor={label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        id={label}
        value={value}
        onChange={handleChange}
        className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
      />
    </div>
  );
};

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (event: string) => void;
  option: string[];
};

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  option,
  onChange,
  value,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Pastikan hanya memilih pilihan yang diizinkan
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs" htmlFor={label}>
        {label}
      </label>
      <select
        name={label}
        onChange={handleChange}
        id={label}
        value={value}
        className=" border-2 border-[#F7F6F9] border-solid text-sm  box-border py-2  w-full px-4"
      >
        <option value="" className="text-gray-400">
          Pilih {label}
        </option>
        {option.map((data, index) => (
          <option value={data} key={index}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

type ToggleButtonProps = {
  toggleSwitch: () => void;
  checked: boolean;
};

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  toggleSwitch,
  checked,
}) => {
  return (
    <div className="flex mt-6 items-center h-7">
      <div className="relative flex items-center w-10 mr-2 align-middle select-none">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className={`absolute block w-6 h-6 rounded-full  border-4  appearance-none cursor-pointer ${
            checked
              ? "ml-4 border-primary bg-primary"
              : "border-[#A1A0A3] bg-[#A1A0A3]"
          }`}
          checked={checked}
          onChange={toggleSwitch}
        />
        <label
          htmlFor="toggle"
          className={`block overflow-hidden h-4 w-10 rounded-full  pointer ${
            checked ? "bg-[#CDE5DF]" : "bg-[#E6E6E6]"
          }`}
        ></label>
      </div>
      {checked ? <p>Ya</p> : <p>Tidak</p>}
    </div>
  );
};

type FormTextareaProps = {
  label: string;
  placeholder: string;
  onChange: (event: string) => void;
  value: string;
};

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Pastikan hanya memilih pilihan yang diizinkan
    onChange(event.target.value);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs" htmlFor={label}>
        {label}
      </label>
      <textarea
        onChange={handleChange}
        value={value}
        name={label}
        id={label}
        placeholder={placeholder}
        cols={30}
        rows={10}
        className="border-2 border-[#F7F6F9] border-solid text-sm h-[220px] box-border py-3 px-4 remove-scroll"
      ></textarea>
    </div>
  );
};

type RadioButtonProps = {
  label: string;
  option: string[];
  onChange: (event: string) => void;
  value:string;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  option,
  onChange,
  value
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs">{label}</label>
      <div className=" flex gap-2 mt-4">
        {option.map((data, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              id={data}
              value={data}
              checked={value === data}
              onChange={handleChange}
              className="peer sr-only"
            />
            <div className="w-[18px] text-sm h-[18px] box-border rounded-full border-2 border-[#F7F6F9] peer-checked:border-primary peer-checked:border-[6px]"></div>
            {data}
          </label>
        ))}
      </div>
    </div>
  );
};

type FormInputPaymentsProps = {
  label: string;
  placeholder: string;
  value: string;
  input: string;
  onChange: (event: string) => void;
  color: number;
};

export const FormInputPayments: React.FC<FormInputPaymentsProps> = ({
  label,
  placeholder,
  value,
  input,
  onChange,
  color,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (input == "number") {
      const { value } = event.target;
      const newValue = value.replace(/[^0-9]/g, ""); // Hanya mengizinkan angka
      onChange(newValue);
    } else if (input != "number") {
      onChange(event.target.value);
    }
  };

  return (
    <div
      className={`${
        color ? "bg-[#F8F8F8]" : "bg-white"
      } flex justify-between items-center gap-2 p-2`}
    >
      <label className="text-sm text-black font-medium" htmlFor={label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        id={label}
        value={value}
        onChange={handleChange}
        className="
        
        border-2 border-[#F7F6F9] w-[374px] border-solid text-sm h-11 box-border py-3 px-4"
      />
    </div>
  );
};

type FormInputDate = {
  onChange: (event: string) => void;
};

export const FormInputDate: React.FC<FormInputDate> = ({ onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-xs">
        Tanggal Lahir
      </label>
      <input
        onChange={(e) => onChange(e.target.value)}
        type="date"
        className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
      />
    </div>
  );
};
  