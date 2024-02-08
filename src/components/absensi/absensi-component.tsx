import Image from "next/image";
import { DocumentIcon } from "../buttons-icons";

type AbsensiComponentProps = {
  tanggal: string;
  name: string;
  nip: string;
  masuk: string;
  keluar: string;
  jamKerja: string | number;
  keterangan: null | string;
  status: string;
};

export const AbsensiComponent: React.FC<AbsensiComponentProps> = ({
  tanggal,
  name,
  nip,
  masuk,
  keluar,
  jamKerja,
  keterangan,
  status,
}) => {
  return (
    <tr className="bg-white h-[75px] font-medium border-b-2">
      <td className="px-5 text-[#A1A0A3]">{tanggal}</td>
      <td>
        <div className="flex gap-3">
          <Image
            src="/images/avatars/user-avatars.png"
            width={36}
            height={36}
            alt="user avatar"
          />
          <div>
            <h1>{name}</h1>
            <p className="text-[#A1A0A3] text-xs">NIP: {nip}</p>
          </div>
        </div>
      </td>
      <td>{masuk} WIB </td>
      <td className="text-[#A1A0A3]">•••••••</td>
      <td>{keluar} WIB</td>
      <td>{jamKerja} Jam</td> 
      {keterangan ? (
        <td>
          <div className="flex items-center text-[#A1A0A3] gap-[6px]">
            <DocumentIcon />
            <p>{keterangan}</p>
          </div>
        </td>
      ) : (
        <td className="text-[#A1A0A3]">N/A</td>
      )}

      {status.toLowerCase() === "on time" ? (
        <td>
          <p className="bg-[#EEFBEF] py-1 px-3 text-primary w-fit h-fit rounded-full">
            On time
          </p>
        </td>
      ) : status.toLowerCase() === "late" ? (
        <td>
          <p className="bg-[#FFF0F0] mx-3 py-1 px-3 text-[#E21C1C] w-fit h-fit rounded-full">
            Late
          </p>
        </td>
      ) : (
        <td>
          <p className="bg-[#FFF0F0] mx-3 py-1 px-3 text-[#E21C1C] w-fit h-fit rounded-full">
            Absens
          </p>
        </td>
      )}
    </tr>
  );
};
