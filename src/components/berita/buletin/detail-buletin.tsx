import { CloseIcon } from "@/components/buttons-icons";
import React from "react";
import { API_URL } from "@/utils/api";
import Image from "next/image";

type DetailBulletin = {
  status: boolean;
  handleClose: (e: boolean) => void;
  data: TableNews | {};
};

const DetailBulletin: React.FC<DetailBulletin> = ({
  status,
  handleClose,
  data,
}) => {
  return (
    <div className={`${!status ? "hidden" : "block "}`}>
      <div className="flex flex-col gap-2 fixed w-[816px] z-30 h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 box-border p-6 rounded-[20px] bg-white ">
        <div className="flex justify-between w-full">
          <h1>Detail Buletin</h1>
          <button
            className="h-fit w-fit"
            onClick={() => {
              handleClose(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="">
            <Image
              src={`https://staging.nutshells.id/${(data as TableNews).image}`}
              width={90}
              height={90}
              alt={(data as TableNews).image}
            />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 ">
            <div className="col-span-2">
              <h1 className="text-sm">Title</h1>
              <h1 className="font-medium">{(data as TableNews).title}</h1>
            </div>
            <div>
              <h1 className="text-sm">Content</h1>
              <h1 className="font-medium">{(data as TableNews).content}</h1>
            </div>
          </div>
          <button
            className="h-[45px] w-[120px] box-border py-3 px-6 border-primary border-2 text-primary rounded-full mt-5 self-end"
            onClick={() => {
              handleClose(false);
            }}
          >
            Tutup
          </button>
        </div>
      </div>
      <div className="fixed z-10 top-0 w-full h-screen opacity-25 bg-black"></div>
    </div>
  );
};

export default DetailBulletin;
