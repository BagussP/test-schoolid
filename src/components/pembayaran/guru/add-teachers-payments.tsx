"use client";
import { CloseIcon } from "../../buttons-icons";
import  { useState, useRef, useEffect, useCallback } from "react";
import {
  FormInput,
  FormInputFile,
  FormInputPayments,
  FormSelect,
  FormTextarea,
  RadioButton,
  ToggleButton,
} from "../../form-components";
import Image from "next/image";
import { API_URL, TOKEN } from "@/utils/api";

type AddStudentProps = {
  status: boolean;
  onClose: () => void;
  dataTeacher: Teacher[];
};

export const AddTeachersPayments: React.FC<AddStudentProps> = ({
  status,
  onClose,
  dataTeacher,
}) => {
  const ref = useRef(null);
  const [checked, setChecked] = useState(false);
  const [navigation, setNavigation] = useState(1);
  // const [total, setTotal] = useState(0);
  const [total, setTotal] = useState(""); // sementara

  // student
  const [teacher, setTeacher] = useState("");
  // const [position, setPosition] = useState("");
  const [payrollDate, setPayrollDate] = useState("");
  const [payrollStatus, setPayrollStatus] = useState("");

  // father
  const [salary, setSalary] = useState("");
  const [classTeacherAllowance, setClassTeacherAllowance] = useState("");
  const [positionBonus, setPositionBonus] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [publicHoliday, setPublicHoliday] = useState("");
  const [entryDay, setEntryDay] = useState("");
  // const [schoolMinistryHolidays, setSchoolMinistryHolidays] = useState("");
  const [sickLeave, setSickLeave] = useState("");
  const [familyLeave, setFamilyLeave] = useState("");
  const [transportPerDay, setTransportPerDay] = useState("");
  const [transport1, setTransport1] = useState("");
  const [transport2, setTransport2] = useState("");
  const [transport3, setTransport3] = useState("");
  const [transport4, setTransport4] = useState("");
  const [amountOfTransportation, setAmountOfTransportation] = useState("");
  const [cellPhoneCredit, setCellPhoneCredit] = useState("");

  const [JTMBSU, setJTMBSU] = useState("");
  const [BSUNominal, setBSUNominal] = useState("");
  const [BSUDibayar, setBSUDibayar] = useState("");
  const [numberOfReplacement, setNumberOfReplacement] = useState("");
  const [substituteTeacher, setSubstituteTeacher] = useState("");

  // others
  const [mealAllowance, setMealAllowance] = useState("");
  const [healthAllowance, setHealthAllowance] = useState("");
  const [familyAllowance, setFamilyAllowance] = useState("");
  const [extracurricularStudent, setExtracurricularStudent] = useState("");
  const [extracurricular, setExtracurricular] = useState("");
  const [picket, setPicket] = useState("");
  const [coachCeremony, setCoachCeremony] = useState("");
  const [mentoring, setMentoring] = useState("");
  const [other1, setOther1] = useState("");
  const [other2, setOther2] = useState("");
  const [other3, setOther3] = useState("");
  const [other4, setOther4] = useState("");
  const [lateCut, setLateCut] = useState("");
  const [dataLate, setDataLate] = useState("");
  const [description, setDescription] = useState("");

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const hasEmptyValue = (...values: string[]) => {
    return values.some((value) => value.trim() === "");
  };
  const isButtonDisabled = hasEmptyValue(teacher);

  const initializeState = useCallback(() => {
    setTeacher("");
    setClassTeacherAllowance("");
    setSalary("");
    setPositionBonus("");
    setNumberOfDays("");
    setPublicHoliday("");
    setEntryDay("");
    // setSchoolMinistryHolidays("");
    setSickLeave("");
    setFamilyLeave("");
    setTransportPerDay("");
    setTransport1("");
    setTransport2("");
    setTransport3("");
    setTransport4("");
    setAmountOfTransportation("");
    setCellPhoneCredit("");
    setJTMBSU("");
    setBSUNominal("");
    setNumberOfReplacement("");
    setSubstituteTeacher("");
    setMealAllowance("");
    setHealthAllowance("");
    setFamilyAllowance("");
    setExtracurricularStudent("");
    setExtracurricular("");
    setPicket("");
    setCoachCeremony("");
    setMentoring("");
    setOther1("");
    setOther2("");
    setOther3("");
    setOther4("");
    setLateCut("");
    setDataLate("");
    setDescription("");
  },[]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/gajis`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "School-Code": "SBBSALAM",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: JSON.parse(teacher).user_id,
          bulan: payrollDate.split("-")[1],
          tahun: payrollDate.split("-")[0],
          kode_gaji_pokok: parseInt(salary),
          tunjangan_guru_kelas: parseInt(classTeacherAllowance),
          jabatan_tambahan: parseInt(positionBonus),
          hari_masuk: parseInt(entryDay),
          libur_sekolah: parseInt(publicHoliday),
          sakit: parseInt(sickLeave),
          izin: parseInt(familyLeave),
          transport_perhari: parseInt(transportPerDay),
          transport_1_100: parseInt(transport1),
          transport_2_70: parseInt(transport2),
          transport_3_70: parseInt(transport3),
          transport_4_50: parseInt(transport4),
          pulsa: parseInt(cellPhoneCredit),
          jtm_bsu: parseInt(JTMBSU),
          nominal_bsu: parseInt(BSUNominal),
          bsu_dibayar: parseInt(BSUDibayar),
          jumlah_jam_pengganti: parseInt(numberOfReplacement),
          guru_pengganti: parseInt(substituteTeacher),
          uang_makan: parseInt(mealAllowance),
          tunjangan_kesehatan: parseInt(healthAllowance),
          tunjangan_keluarga: parseInt(familyAllowance),
          ekskul_siswa: parseInt(extracurricularStudent),
          ekskul: parseInt(extracurricular),
          piket: parseInt(picket),
          pelatih_upacara: parseInt(coachCeremony),
          mentoring: parseInt(mentoring),
          lain_1: parseInt(other1),
          lain_2: parseInt(other2),
          lain_3: parseInt(other3),
          lain_4: parseInt(other4),
          potongan_terlambat: parseInt(lateCut),
          data_terlambat: parseInt(dataLate),
          keterangan: description,
          total_gaji: parseInt(total),
        }),
      });
      if(response.ok) {
        location.reload()
      }
    } catch (error) {
      alert(error);
    }
  };
  
  useEffect(() => {
    if (!status) {
      initializeState();
    }
    return () => {};
  }, [status, teacher, initializeState]);

  return (
    <div className={`${status ? "flex" : "hidden"}`}>
      <div
        className={`
         flex flex-col gap-8 absolute w-[816px] file:h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-30 box-border p-6 rounded-[20px] bg-white `}
      >
        <div className="flex justify-between w-full">
          <h1 className="font-semibold text-xl">Tambah Penggajian</h1>
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex justify-center gap-1">
          <div
            className={`py-4 px-5 rounded-full cursor-pointer ${
              navigation === 1
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3] cursor-pointer `
            }`}
            onClick={() => setNavigation(1)}
          >
            Umum
          </div>
          <div
            className={`py-4 px-5 rounded-full ${
              navigation === 2
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3] cursor-pointer `
            }`}
            onClick={() => setNavigation(2)}
          >
            Gaji & Tunjangan
          </div>
          <div
            className={`py-4 px-5 rounded-full ${
              navigation === 3
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3] cursor-pointer `
            }`}
            onClick={() => setNavigation(3)}
          >
            BSU
          </div>
          <div
            className={`py-4 px-5 rounded-full ${
              navigation === 4
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3] cursor-pointer `
            }`}
            onClick={() => setNavigation(4)}
          >
            Lain-lain
          </div>
        </div>
        <form onSubmit={handlePost}>
          <div className={`${navigation == 1 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-5 mt-6">
              <div className="col-span-2">
                <label className="text-xs flex-col " htmlFor="">
                  Nama Guru
                </label>
                <select
                  className=" border-2 border-[#F7F6F9] border-solid text-sm  box-border py-2  w-full px-4"
                  name=""
                  id=""
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setTeacher(event.target.value)
                  }
                  value={teacher}
                >
                  <option value="">Pilih Guru</option>
                  {dataTeacher.map((data, index) => (
                    <option key={index} value={JSON.stringify(data)}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs" htmlFor="date">
                  Jabatan
                </label>
                <input
                  onChange={() => {}}
                  type="text"
                  value={teacher != "" ? JSON.parse(teacher).position : ""}
                  className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-2 px-4"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs" htmlFor="date">
                  Tanggal Gajian
                </label>
                <input
                  onChange={(e) => setPayrollDate(e.target.value)}
                  type="date"
                  className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-2 px-4"
                />
              </div>
              {/* <FormSelect
                value={payrollStatus}
                onChange={setPayrollStatus}
                label="Status Pengganjian"
                option={["option 1"]}
              /> */}
              {true ? (
                <div></div>
              ) : (
                <div className="col-span-2">
                  {/* <FormInputFile setPathImage={setPathImage} /> */}
                </div>
              )}
            </div>

            {/* <ToggleButton toggleSwitch={toggleSwitch} checked={checked} /> */}
          </div>
          <div className={`${navigation == 2 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-0 mt-6">
              {/* Ayah */}
              <h1 className="text-lg font-semibold col-span-2 mb-5">
                Gaji Pokok
              </h1>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={salary}
                  onChange={setSalary}
                  label="Gaji Pokok"
                  placeholder="Rp 0"
                />
              </div>

              {/* Ibu */}
              <h1 className="col-span-2 text-lg font-semibold my-5">
                Tunjangan
              </h1>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={classTeacherAllowance}
                  onChange={setClassTeacherAllowance}
                  label="Tunjangan guru kelas"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={positionBonus}
                  onChange={setPositionBonus}
                  label="Jabatan tambahan"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={numberOfDays}
                  onChange={setNumberOfDays}
                  label="Jumlah hari"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={publicHoliday}
                  onChange={setPublicHoliday}
                  label="Libur"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={entryDay}
                  onChange={setEntryDay}
                  label="Hari masuk"
                  placeholder="0"
                />
              </div>

              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={sickLeave}
                  onChange={setSickLeave}
                  label="Izin sakit"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={familyLeave}
                  onChange={setFamilyLeave}
                  label="Izin keluarga"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={transportPerDay}
                  onChange={setTransportPerDay}
                  label="Transport per hari"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={transport1}
                  onChange={setTransport1}
                  label="Transport 1 (100%)"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={transport2}
                  onChange={setTransport2}
                  label="Transport 2 (70%)"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={transport3}
                  onChange={setTransport3}
                  label="Transport 3 (70%)"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={transport4}
                  onChange={setTransport4}
                  label="Transport 4 (50%)"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={amountOfTransportation}
                  onChange={setAmountOfTransportation}
                  label="Jumlah transport"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={cellPhoneCredit}
                  onChange={setCellPhoneCredit}
                  label="Pulsa"
                  placeholder="Rp 0"
                />
              </div>
            </div>

            {/* <ToggleButton toggleSwitch={toggleSwitch} checked={checked} /> */}
          </div>
          <div className={`${navigation == 3 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-0 mt-6">
              <h1 className="col-span-2 text-lg font-semibold mb-5">BSU</h1>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={JTMBSU}
                  onChange={setJTMBSU}
                  label="JTM BSU"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={BSUNominal}
                  onChange={setBSUNominal}
                  label="Nominal BSU"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={BSUDibayar}
                  onChange={setBSUDibayar}
                  label="BSU Dibayar"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={numberOfReplacement}
                  onChange={setNumberOfReplacement}
                  label="Jumlah jam pengganti (dalam 1 bulan)"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={substituteTeacher}
                  onChange={setSubstituteTeacher}
                  label="Guru pengganti"
                  placeholder="Rp 0"
                />
              </div>
            </div>
            {/* <ToggleButton toggleSwitch={toggleSwitch} checked={checked} /> */}
          </div>
          <div className={`${navigation == 4 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-0 mt-6">
              <h1 className="col-span-2 text-lg mb-5 font-semibold">
                Tunjangan
              </h1>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={mealAllowance}
                  onChange={setMealAllowance}
                  label="Uang makan"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={healthAllowance}
                  onChange={setHealthAllowance}
                  label="Tunjangan kesehatan"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={familyAllowance}
                  onChange={setFamilyAllowance}
                  label="Tunjangan keluarga"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={extracurricularStudent}
                  onChange={setExtracurricularStudent}
                  label="Ekskul (siswa)"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={extracurricular}
                  onChange={setExtracurricular}
                  label="Ekskul"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={picket}
                  onChange={setPicket}
                  label="(PIKET)"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={coachCeremony}
                  onChange={setCoachCeremony}
                  label="Pelatih upacara"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={mentoring}
                  onChange={setMentoring}
                  label="Mentoring"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={other1}
                  onChange={setOther1}
                  label="Lain - lain 1"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={other2}
                  onChange={setOther2}
                  label="Lain - lain 2"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={other3}
                  onChange={setOther3}
                  label="Lain - lain 3"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={other4}
                  onChange={setOther4}
                  label="Lain - lain 4"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={1}
                  input="number"
                  value={lateCut}
                  onChange={setLateCut}
                  label="Pot. Terlambat"
                  placeholder="0"
                />
              </div>
              <div className="col-span-2">
                <FormInputPayments
                  color={0}
                  input="number"
                  value={dataLate}
                  onChange={setDataLate}
                  label="Data keterlambatan"
                  placeholder="Rp 0"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={description}
                  onChange={setDescription}
                  label="Keterangan"
                  placeholder="Masukkan keterangan disini"
                />
              </div>
            </div>

            {/* <ToggleButton toggleSwitch={toggleSwitch} checked={checked} /> */}
          </div>
          {/* <div className="bg-[#EEFBEF] text-primary w-full p-4 my-5 flex justify-between items-center font-semibold">
            <p>Total Diterima</p>
            <p>Rp {total}</p>
          </div> */}
          <div className="  py-4 my-5 col-span-2">
            <FormInput
              input="number"
              value={total}
              onChange={setTotal}
              label="Total"
              placeholder="Masukkan Total disini"
            />
          </div>{" "}
          {/* sementara */}
          <div className="w-full justify-end right-6 flex gap-2">
            <button
              onClick={onClose}
              type="button"
              className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </button>
            <button
              disabled={isButtonDisabled}
              type="submit"
              className={`${
                isButtonDisabled
                  ? "bg-[#E6E6E6] text-[#A1A0A3]"
                  : " text-white bg-primary"
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
