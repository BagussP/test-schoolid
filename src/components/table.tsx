"use client";
import { useState, useEffect } from "react";
import { AbsensiComponent } from "./absensi/absensi-component";
import { TeacherComponent } from "./data-master/guru/teacher-components";
import { TypePayment } from "./data-master/jenis-pembayaran/type-payment-component";
import { HolidayComponent } from "./data-master/kategori-libur/holiday-component";
import { ClassComponent } from "./data-master/kelas/class-component";
import { PaymentComponent } from "./data-master/pembayaran/payment-component";
import { StudentComponent } from "./data-master/siswa/student-component";
import { PembayaranComponents } from "./pembayaran/wali-murid/wali-murid-components";
import { PembayaranGuruComponents } from "./pembayaran/guru/guru-component";
import { NewsComponent } from "./berita/berita/berita-components";
import { BulletinComponent } from "./berita/buletin/bulletin-components";
import { JobTittle } from "./data-master/jabatan/job-tittle-components";
import Link from "next/link";
import { CareerComponent } from "./karir/career-components";
import { QuoteComponent } from "./berita/quotes/quote-components";

export const BasicTable: React.FC<CommonTableProps> = ({
  head,
  body,
  from,
  handlePagination,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil((body as Attendance[]).length / 10);
  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log("indexOfFirstItem", indexOfFirstItem);
  console.log("indexOfLastItem", indexOfLastItem);
  console.log("totalPage", totalPage);

  return (
    <div className="relative flex-grow h-fit mx-25 bg-white flex flex-col box-border gap-6 p-6 -mt-[104px] mb-20 rounded-t-[20px]">
      <div className="flex items-center gap-3 h-fit text-xl">
        <p className="text-black font-semibold">Daftar Absensi</p>
        <h1 className="text-[#A1A0A3] "></h1>
        {from == "dashboard" ? (
          <Link
            className="absolute right-6 text-lg text-[#A1A0A3]"
            href="/absensi"
          >
            Lihat Semua
          </Link>
        ) : from == "absensi" ? (
          <div className="absolute right-6 text-lg text-black  flex items-center justify-center gap-3">
            <select
              onChange={handlePagination}
              className=" w-[160px] h-[36px] text-sm cursor-pointer border-2 border-black text-black"
            >
              <option className="text-black" value="day">
                Hari ini
              </option>
              <option className="text-black" value="week">
                Minggu ini
              </option>
              <option className="text-black" value="month">
                Bulan ini
              </option>
            </select>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <table className="table-fixed  bg-[#F8F8F8] text-left text-sm rounded-[12px] border-2">
        <thead className=" h-[52px] rounded-[12px] text-[#A1A0A3] font-medium">
          <tr>
            {head.map((data, index) => {
              return (
                <td
                  key={index}
                  className={`${
                    index === 0
                      ? `px-3 w-2/12`
                      : head.length - 1 == index
                      ? `px-5 w-1/12`
                      : head.length - 2 == index
                      ? `w-3/12`
                      : ``
                  }`}
                >
                  {data}
                </td>
              );
            })}
          </tr>
        </thead>

        {from == "absensi" ? (
          <tbody>
            {(body as Attendance[])
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((data, index) => (
                <AbsensiComponent
                  key={index}
                  tanggal={data.date}
                  name={data.user.name}
                  nip={data.user_id}
                  masuk={data.in_time}
                  keluar={data.out_time}
                  jamKerja={data.total_duration}
                  keterangan={data.message}
                  status={data.status}
                />
              ))}
          </tbody>
        ) : from == "dashboard" ? (
          <tbody>
            {body && "data" in body ? (
              (body.data as Attendance[]).map((data, index) => (
                <AbsensiComponent
                  key={index}
                  tanggal={data.date}
                  name={data.user.name}
                  nip={data.user_id}
                  masuk={data.in_time}
                  keluar={data.out_time}
                  jamKerja={data.total_duration}
                  keterangan={data.message}
                  status={data.status}
                />
              ))
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
      <div
        className={`${
          from == "dashboard" ? "hidden" : ""
        } flex text-sm items-center gap-6 text-[#A1A0A3] self-end mt-5`}
      >
        <p>
          Page {currentPage} Of {totalPage}
        </p>
        <div className="flex items-center gap-4">
          {Array.from({ length: totalPage }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* <div
        className={`${
          from == "dashboard" ? "hidden" : ""
        } flex text-sm items-center gap-6 text-[#A1A0A3] self-end mt-5`}
      >
        <p>
          Page {body && "data" in body && body.current_page} 0f{" "}
          {body && "data" in body && body.last_page}
        </p>
        <div className="flex items-center gap-4">
          {body &&
            "data" in body &&
            (body.links as PaginationLink[]).map((data, index) => (
              <div key={index}>
                {data.url ? (
                  <button
                    onClick={() => handlePagination(data.url)}
                    className={`${
                      data.active
                        ? "text-black px-2 py-1 bg-[#F8F8F8] rounded-sm"
                        : ""
                    }`}
                  >
                    {data.label == "Next &raquo;"
                      ? "»"
                      : data.label == "&laquo; Previous"
                      ? "«"
                      : data.label}
                  </button>
                ) : (
                  <p>
                    {data.label == "Next &raquo;"
                      ? ""
                      : data.label == "&laquo; Previous"
                      ? ""
                      : data.label}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export const TableWithToggle: React.FC<TableWithToggle> = ({
  head,
  body,
  from,
  toggleEdit,
  toggleDelete,
  toggleDetail,
  handlePagination,
}) => {
  const [currentSelectedKelas, setCurrentSelectedKelas] =
    useState<string>("Semua");

  const filteredData =
    currentSelectedKelas === "Semua"
      ? body
      : (body as PembayaranProps[]).filter(
          (student) => student.status == currentSelectedKelas
        );

  return (
    <div className="relative flex-grow h-fit mx-25 bg-white flex flex-col box-border gap-6 p-6 -mt-[104px] rounded-t-[20px]">
      {/* Title */}
      <div className="flex items-center gap-3 h-fit">
        <h1 className="font-semibold text-xl">
          {from.charAt(0).toUpperCase() + from.slice(1)}
        </h1>
        {Array.isArray(body) ? (
          <p className="text-[#A1A0A3]">{body.length}</p>
        ) : body && "data" in body ? (
          <p className="text-[#A1A0A3]">{body.total}</p>
        ) : (
          <p className="text-[#A1A0A3]">0</p>
        )}
      </div>

      {from == "Pembayaran Wali Murid" ? (
        <div className="flex">
          <button
            className={`${
              currentSelectedKelas === "Semua"
                ? "font-semibold  text-[#179778] bg-[#EEFBEF]"
                : " text-[#A1A0A3]"
            } px-5 py-3`}
            onClick={() => {
              setCurrentSelectedKelas("Semua");
            }}
          >
            Semua
          </button>
          <button
            className={`${
              currentSelectedKelas === "Lunas"
                ? "font-semibold  text-[#179778] bg-[#EEFBEF]"
                : " text-[#A1A0A3]"
            } px-5 py-3`}
            onClick={() => {
              setCurrentSelectedKelas("Lunas");
            }}
          >
            Lunas
          </button>
          <button
            className={`${
              currentSelectedKelas === "Menunggu Proses"
                ? "font-semibold  text-[#179778] bg-[#EEFBEF]"
                : " text-[#A1A0A3]"
            } px-5 py-3`}
            onClick={() => {
              setCurrentSelectedKelas("Menunggu Proses");
            }}
          >
            Menunggu Proses
          </button>
          <button
            className={`${
              currentSelectedKelas === "Belum Lunas"
                ? "font-semibold  text-[#179778] bg-[#EEFBEF]"
                : " text-[#A1A0A3]"
            } px-5 py-3`}
            onClick={() => {
              setCurrentSelectedKelas("Belum Lunas");
            }}
          >
            Belum Lunas
          </button>
        </div>
      ) : (
        ""
      )}

      {/* Table */}
      <table className="table-fixed  bg-[#F8F8F8] text-left text-sm rounded-[12px]">
        {/* Table Head */}
        <thead className=" h-[52px] rounded-[12px] text-[#A1A0A3] font-medium">
          <tr>
            {head.map((data, index) => {
              return (
                <td
                  key={index}
                  className={
                    index == 0
                      ? "px-5"
                      : index == head.length - 1 &&
                        from !== "Pembayaran Wali Murid" 
                        // &&
                        // from !== "Pembayaran Guru"
                      ? "w-1/12 px-3"
                      : index == head.length - 2
                      ? "w-2/12"
                      : index == head.length - 1 &&
                        from === "Pembayaran Wali Murid"
                      ? "px-9"
                      // : index == head.length - 1 && from === "Pembayaran Guru"
                      // ? "w-2/12 px-3"
                      : ""
                  }
                >
                  {data}
                </td>
              );
            })}
          </tr>
        </thead>

        {/* Table Body */}
        {from === "guru" ? (
          <tbody>
            {body && "data" in body ? (
              (body.data as TableTeacher[]).map((data, index: number) => (
                <TeacherComponent
                  key={index}
                  toggleEdit={toggleEdit}
                  toggleDelete={toggleDelete}
                  toggleDetail={toggleDetail}
                  nip={data.nip}
                  name={data.name}
                  gender={data.gender}
                  status={data.status}
                  image={data.image}
                  id_number={data.id_number}
                  id={data.id}
                  active="1"
                />
              ))
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        ) : from === "kelas" ? (
          <tbody>
            {(body as ClassProps[]).map((data, index) => (
              <ClassComponent
                key={index}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
                kode={data.kode}
                kelas={data.kode}
                quota={data.quota}
                desc={data.desc}
                status={data.status}
              />
            ))}
          </tbody>
        ) : from === "pembayaran" ? (
          <tbody>
            {(body as PaymentProps[]).map((data, index) => (
              <PaymentComponent
                key={index}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
                kode={data.kode}
                name={data.name}
                typeOfPayment={data.typeOfPayment}
                desc={data.desc}
                status={data.status}
              />
            ))}
          </tbody>
        ) : from === "siswa" ? (
          <tbody>
            {(body as SiswaProps[]).map((data, index) => (
              <StudentComponent
                key={index}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
                nisn={data.nisn}
                name={data.name}
                kelas={data.kelas}
                desc={data.desc}
                status={data.status}
              />
            ))}
          </tbody>
        ) : from === "kategori Libur" ? (
          <tbody>
            {(body as KategoriLiburProps[]).map((data, index) => (
              <HolidayComponent
                key={index}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
                kode={data.kode}
                name={data.name}
                desc={data.desc}
                status={data.status}
              />
            ))}
          </tbody>
        ) : from === "jenis pembayaran" ? (
          <tbody>
            {(body as KategoriLiburProps[]).map((data, index) => (
              <TypePayment
                key={index}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
                kode={data.kode}
                name={data.name}
                desc={data.desc}
                status={data.status}
              />
            ))}
          </tbody>
        ) : from === "jabatan" ? (
          <tbody>
            {(body as KategoriLiburProps[]).map((data, index) => (
              <JobTittle
                key={index}
                toggleEdit={toggleEdit}
                toggleDelete={toggleDelete}
                kode={data.kode}
                name={data.name}
                desc={data.desc}
                status={data.status}
              />
            ))}
          </tbody>
        ) : from === "Pembayaran Wali Murid" ? (
          <tbody>
            {(filteredData as PembayaranProps[]).map((data, index) => (
              <PembayaranComponents
                tanggal={data.tanggal}
                name={data.name}
                nip={data.nip}
                orang_tua={data.orang_tua}
                pembayaran={data.pembayaran}
                keterangan={data.keterangan}
                status={data.status}
                key={index}
                toggle={toggleEdit}
              />
            ))}
          </tbody>
        ) : from === "Pembayaran Guru" ? (
          <tbody>
            {Array.isArray(body) &&
              (body as any[]).map((data, index) => (
                <PembayaranGuruComponents
                  date={data.user_id}
                  name={data.tahun}
                  nip={data.bulan}
                  status={data.status}
                  total_received={data.total_gaji}
                  active={data.active}
                  key={index}
                  toggle={toggleEdit}
                  id={data.id}
                />
              ))}
          </tbody>
        ) : from === "Berita" ? (
          <tbody>
            {body && "data" in body ? (
              (body.data as TableNews[])
                .filter((item) => {
                  return item.type === "berita";
                })
                .map((data, index: number) => (
                  <NewsComponent
                    key={index}
                    toggleDetail={toggleDetail}
                    toggleEdit={toggleEdit}
                    toggleDelete={toggleDelete}
                    active={data.user_id}
                    created_at={data.published_date}
                    title={data.title}
                    id={data.id}
                    writer="unknown"
                  />
                ))
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        ) : from === "Quote" ? (
          <tbody>
            {body && "data" in body ? (
              (body.data as TableQuote[]).map((data, index: number) => (
                <QuoteComponent
                  toggleDetail={toggleDetail}
                  toggleEdit={toggleEdit}
                  toggleDelete={toggleDelete}
                  key={index}
                  created_at={data.created_at}
                  updated_at={data.updated_at}
                  name={data.name}
                  image={data.image}
                  content={data.content}
                  title={data.title}
                  id={data.id}
                />
              ))
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        ) : from === "Buletin" ? (
          <tbody>
            {body && "data" in body ? (
              (body.data as TableNews[])
                .filter((item) => {
                  return item.type === "buletin";
                })
                .map((data, index: number) => (
                  <BulletinComponent
                    key={index}
                    toggleDetail={toggleDetail}
                    toggleEdit={toggleEdit}
                    toggleDelete={toggleDelete}
                    active={data.user_id}
                    created_at={data.published_date}
                    title={data.title}
                    id={data.id}
                    writer="unknown"
                  />
                ))
            ) : (
              <tr>
                <td>Loading</td>
              </tr>
            )}
          </tbody>
        ) : from === "karir" ? (
          <tbody>
            {(body as CareerProps[]).map((data, index) => (
              <CareerComponent
                key={index}
                created_at={data.created_at}
                desc={data.desc}
                position={data.position}
                active={data.active}
                toggleDelete={toggleDelete}
                toggleEdit={toggleEdit}
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>Data Not Found</td>
            </tr>
          </tbody>
        )}
      </table>
      {!Array.isArray(body) ? (
        <div
          className={`${
            from == "dashboard" ? "hidden" : ""
          } flex text-sm items-center gap-6 text-[#A1A0A3] self-end mt-5`}
        >
          <p>
            Page {(body as ApiResponseData).current_page} 0f{" "}
            {(body as ApiResponseData).last_page}
          </p>
          <div className="flex items-center gap-4">
            {body &&
              "links" in body &&
              (body.links as PaginationLink[]).map((data, index) => (
                <div key={index}>
                  {data.url ? (
                    <button
                      onClick={() => handlePagination(data.url)}
                      className={`${
                        data.active
                          ? "text-black px-2 py-1 bg-[#F8F8F8] rounded-sm"
                          : ""
                      }`}
                    >
                      {data.label == "Next &raquo;"
                        ? "»"
                        : data.label == "&laquo; Previous"
                        ? "«"
                        : data.label}
                    </button>
                  ) : (
                    <p>
                      {data.label == "Next &raquo;"
                        ? ""
                        : data.label == "&laquo; Previous"
                        ? ""
                        : data.label}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
