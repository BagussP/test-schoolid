import { CloseIcon, WarningIcon } from "../buttons-icons";
import { API_URL, TOKEN } from "@/utils/api";

type DeleteComponentsProps = {
  status: boolean;
  toggleClose: (e: boolean) => void;
  id: number | null;
  name: string;
  category: string;
  path: string;
};

export const DeleteComponents: React.FC<DeleteComponentsProps> = ({
  status,
  toggleClose,
  id,
  category,
  name,
  path,
}) => {
  const deleteData = async () => {
    try {
      const response = await fetch(`${API_URL}/${path}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      if (response.ok) {
        console.log(`Data dengan ID ${id} telah dihapus.`);
        location.reload();
      } else {
        console.error(`Gagal menghapus data dengan ID ${id}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className={` ${status ? "inline" : "hidden"}`}>
      <div className="fixed flex flex-col bg-white w-[520px] h-[229px] left-1/2 -translate-x-1/2 z-30 box-border p-6 right-12 top-1/2 -translate-y-1/2 shadow-[0_24px_80px_0_#21262D14]">
        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <WarningIcon />
            <h1 className="font-semibold text-xl">Hapus {category}</h1>
          </div>
          <button
            className="h-fit w-fit"
            onClick={() => {
              toggleClose(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <p className="font-medium mt-8">
          Apakah Anda yakin ingin menghapus &quot;{name}&quot;? Data ini tidak
          bisa dipulihkan setelah dihapus.
        </p>

        <div className="flex gap-2 absolute bottom-6 right-6 self-end">
          <button
            onClick={() => {
              toggleClose(false);
            }}
            className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-[#E21C1C] border-[#E21C1C] border-2 text-sm font-semibold"
          >
            Batal
          </button>
          <button
            onClick={deleteData}
            className="px-8 py-3 rounded-full box-border w-[120px] h-[45px] bg-[#E21C1C] text-white text-sm font-semibold"
          >
            Hapus
          </button>
        </div>
      </div>

      <div className="fixed top-0 w-full z-20 h-screen opacity-25 bg-black"></div>
    </div>
  );
};
