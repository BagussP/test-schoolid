import Link from "next/link";

import {
  DashboardIcon,
  GreaterThanIcon,
  RefreshIcon,
} from "../buttons-icons";

type DataMasterNavigationProps = {
  toggleAdd: () => void;
  from: string;
  path: string;
};

export const DataMasterNavigation: React.FC<DataMasterNavigationProps> = ({
  toggleAdd,
  from,
  path
}) => {
  return (
    <div className="flex h-52 bg-primary text-font_color text-[18px] justify-between ">
      <div className="flex gap-2 ml-25 mt-9 h-fit">
        <Link href="/">
          <DashboardIcon />
        </Link>
        <Link className="" href={`/${from.split(" ").join("-").toLowerCase()}`}>
          {from}
        </Link>
        <p> &gt;</p>
        <p className="text-white font-medium "> {path}</p>
      </div>
      <div className="flex mt-6 mr-25 items-center gap-2 h-fit text-white text-sm">
        <div className="py-3 px-4 flex gap-10 rounded-[8px] bg-white bg-opacity-[.16]">
          <p>All Status</p>
          <GreaterThanIcon />
        </div>
        <button className="p-3 rounded-[8px] bg-white bg-opacity-[.16]">
          <RefreshIcon />
        </button>
        <button
          onClick={toggleAdd}
          className="py-3 px-6 rounded-full bg-white text-primary font-semibold"
        >
          Tambah +
        </button>
      </div>
    </div>
  );
};
