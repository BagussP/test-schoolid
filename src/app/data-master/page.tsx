import { Button } from "@/components/data-master/button";

export default function DataMaster() {
  return (
    <div className="flex flex-col">
      <div className="flex px-25 flex-col gap-2 h-52 bg-primary text-white">
        <h1 className="font-medium text-2xl ml-25 mt-7">Halo Muhammad!</h1>
        <p className="ml-25">Selamat datang di Portal Admin MI Sabilussalam</p>
      </div>
      <div className="flex-grow ml-25 mx-25 grid grid-cols-5 gap-y-8 gap-x-5 -mt-[89px]">
        <Button buttonName="Kelas" images="kelas" slug="data-master/kelas" />
        <Button
          buttonName="Jabatan"
          images="guru"
          // images="jabatan-guru"
          slug="data-master/jabatan"
        />
          <Button buttonName="Guru" images="guru" slug="data-master/guru" />
          <Button buttonName="Siswa" images="siswa" slug="data-master/siswa" />
          <Button buttonName="PPDB" images="siswa" slug="data-master/ppdb" />
          <Button
            buttonName="Wali Siswa"
            images="wali-siswa"
            slug="data-master/wali-siswa"
          />
          <Button
            buttonName="Kategori Libur"
            images="kategori-libur"
            slug="data-master/kategori-libur"
          />
          <Button
            buttonName="Jenis Pembayaran "
            // images="jenis-pembayaran"
            images="pembayaran"
            slug="data-master/jenis-pembayaran"
          />
        <Button
          buttonName="Pembayaran"
          images="pembayaran"
          slug="data-master/pembayaran"
        />
      </div>
    </div>
  );
}
