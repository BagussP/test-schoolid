"use client";
import { CloseIcon } from "../../buttons-icons";
import { useState } from "react";
import {
  FormInput,
  FormInputFile,
  FormSelect,
  RadioButton,
  ToggleButton,
} from "../../form-components";

type AddStudentProps = {
  status: boolean;
  onClose: () => void;
};

export const AddStudent: React.FC<AddStudentProps> = ({ status, onClose }) => {
  const [checked, setChecked] = useState(false);
  const [navigation, setNavigation] = useState(1);
  const [pathImage, setPathImage] = useState("");

  // student
  const [student, setStudent] = useState("");
  const [nis, setNis] = useState("");
  const [nisn, setNisn] = useState("");
  const [studentGroup, setStudentGroup] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [address, setAddress] = useState("");

  // father
  const [father, setFather] = useState("");
  const [fatherJob, setFatherJob] = useState("");
  const [fatherReligion, setFatherReligion] = useState("");
  const [fatherPhoneNumber, setFatherPhoneNumber] = useState("");
  const [fatherOfficeAddress, setFatherOfficeAddress] = useState("");
  const [fatherHomeAddress, setFatherHomeAddress] = useState("");

  // mother
  const [mother, setMother] = useState("");
  const [motherJob, setMotherJob] = useState("");
  const [motherReligion, setMotherReligion] = useState("");
  const [motherPhoneNumber, setMotherPhoneNumber] = useState("");
  const [motherOfficeAddress, setMotherOfficeAddress] = useState("");
  const [motherHomeAddress, setMotherHomeAddress] = useState("");

  // guardian
  const [guardian, setGuardian] = useState("");
  const [guardianJob, setGuardianJob] = useState("");
  const [guardianReligion, setGuardianReligion] = useState("");
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState("");
  const [guardianOfficeAddress, setGuardianOfficeAddress] = useState("");
  const [guardianHomeAddress, setGuardianHomeAddress] = useState("");
  const [relationship, setRelationship] = useState("");

  // others

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const hasEmptyValue = (...values: string[]) => {
    return values.some((value) => value.trim() === "");
  };

  const isButtonDisabled = hasEmptyValue(
    student,
    nis,
    nisn,
    studentGroup,
    gender,
    religion,
    birthPlace,
    birthDate,
    province,
    city,
    district,
    subDistrict,
    address,
    father,
    fatherJob,
    fatherReligion,
    fatherPhoneNumber,
    fatherOfficeAddress,
    fatherHomeAddress,
    mother,
    motherJob,
    motherReligion,
    motherPhoneNumber,
    motherOfficeAddress,
    motherHomeAddress,
    guardian,
    guardianJob,
    guardianReligion,
    guardianPhoneNumber,
    guardianOfficeAddress,
    guardianHomeAddress,
    pathImage
  );
  const handleSubmit = async () => {
    alert(
      `
    ${pathImage},
   ${student},
   ${nis},
   ${nisn},
   ${studentGroup},
   ${gender},
   ${religion},
   ${birthPlace},
   ${birthDate},
   ${province},
   ${city},
   ${district},
   ${subDistrict},
   ${address},
   ${father},
   ${fatherJob},
   ${fatherReligion},
   ${fatherPhoneNumber},
   ${fatherOfficeAddress},
   ${fatherHomeAddress},
   ${mother},
   ${motherJob},
   ${motherReligion},
   ${motherPhoneNumber},
   ${motherOfficeAddress},
   ${motherHomeAddress},
   ${guardian},
   ${guardianJob},
   ${guardianReligion},
   ${guardianPhoneNumber},
   ${guardianOfficeAddress},
   ${guardianHomeAddress},`
    );
  };
  return (
    <div className={`${status ? "flex" : "hidden"}`}>
      <div
        className={`
        flex flex-col gap-8 absolute w-[816px] h-fit max-h-[80%] overflow-auto inset-y-[10%] left-1/2 -translate-x-1/2 z-30 box-border p-6 rounded-[20px] bg-white `}
      >
        <div className="flex justify-between w-full">
          <h1 className="font-semibold text-xl">Tambah Siswa</h1>
          <button className="h-fit w-fit" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex justify-center gap-1">
          <div
            className={`py-4 px-5 rounded-full cursor-pointer ${
              navigation === 1
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3]`
            }`}
            onClick={() => setNavigation(1)}
          >
            Umum
          </div>
          <div
            className={`py-4 px-5 rounded-full ${
              navigation === 2
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3]`
            }`}
            onClick={() => setNavigation(2)}
          >
            Data Orang Tua
          </div>
          <div
            className={`py-4 px-5 rounded-full ${
              navigation === 3
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3]`
            }`}
            onClick={() => setNavigation(3)}
          >
            Data Wali
          </div>
          <div
            className={`py-4 px-5 rounded-full ${
              navigation === 4
                ? `border-2 font-semibold text-primary border-primary`
                : `font-medium text-[#A1A0A3]`
            }`}
            onClick={() => setNavigation(4)}
          >
            Data Lainnya
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`${navigation == 1 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-5 mt-6">
              <FormInputFile
                setPathImage={setPathImage}
                display={status}
                pathImage=""
                to="gutus"
                isDataModified={true}
              />
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={student}
                  onChange={setStudent}
                  label="Nama Siswa"
                  placeholder="ex: Muhammad Jauhari"
                />
              </div>
              <FormInput
                input="number"
                value={nis}
                onChange={setNis}
                label="NIS"
                placeholder="0"
              />
              <FormInput
                input="number"
                value={nisn}
                onChange={setNisn}
                label="NISN"
                placeholder="0"
              />
              <FormSelect
                onChange={setStudentGroup}
                value={studentGroup}
                label="Kelas"
                option={["option 1"]}
              />
              <RadioButton
                value={gender}
                onChange={setGender}
                label="Jenis Kelamin"
                option={["Laki-Laki", "Perempuan"]}
              />
              <FormInput
                input="text"
                label="Tempat Lahir"
                value={birthPlace}
                onChange={setBirthPlace}
                placeholder="Masukkan Tempat Lahir"
              />
              <div className="flex flex-col gap-2">
                <label className="text-xs" htmlFor="">
                  Tanggal Lahir
                </label>
                <input
                  onChange={(e) => setBirthDate(e.target.value)}
                  value={birthDate}
                  type="date"
                  className="border-2 border-[#F7F6F9] border-solid text-sm h-11 box-border py-3 px-4"
                />
              </div>
              <div className="col-span-2">
                <FormSelect
                  onChange={setGuardianReligion}
                  label="Agama"
                  value={guardianReligion}
                  option={["Islam", "Prostestan", "Katolik", "Hindu", "Budha"]}
                />
              </div>

              <h1 className="col-span-2 text-lg font-semibold">Alamat</h1>
              <FormInput
                input="text"
                value={province}
                onChange={setProvince}
                label="Provinsi"
                placeholder="Masukkan alamat lengkap"
              />
              <FormInput
                input="text"
                value={city}
                onChange={setCity}
                label="Kabupaten/Kota"
                placeholder="Masukkan alamat lengkap"
              />
              <FormInput
                input="text"
                value={district}
                onChange={setDistrict}
                label="Kecamatan"
                placeholder="Masukkan alamat lengkap"
              />
              <FormInput
                input="text"
                value={subDistrict}
                onChange={setSubDistrict}
                label="Kelurahan"
                placeholder="Masukkan alamat lengkap"
              />
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={address}
                  onChange={setAddress}
                  label="Alamat"
                  placeholder="Masukkan alamat lengkap"
                />
              </div>
            </div>

            <ToggleButton toggleSwitch={toggleSwitch} checked={checked} />
          </div>
          <div className={`${navigation == 2 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-5 mt-6">
              {/* Ayah */}
              <h1 className="text-lg font-semibold col-span-2">
                Identitas Ayah
              </h1>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={father}
                  onChange={setFather}
                  label="Nama Ayah"
                  placeholder="ex: Muhammad Jauhari S.Pd"
                />
              </div>
              <FormSelect
                value={fatherJob}
                onChange={setFatherJob}
                label="Pekerjaan"
                option={["option 1"]}
              />
              <FormSelect
                onChange={setGuardianReligion}
                label="Agama"
                value={guardianReligion}
                option={["Islam", "Prostestan", "Katolik", "Hindu", "Budha"]}
              />
              <div className="col-span-2">
                <FormInput
                  input="number"
                  value={fatherPhoneNumber}
                  onChange={setFatherPhoneNumber}
                  label="Nomor HP"
                  placeholder="+62   8986453xxx"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={fatherOfficeAddress}
                  onChange={setFatherOfficeAddress}
                  label="Alamat Kantor"
                  placeholder="Masukkan alamat"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={fatherHomeAddress}
                  onChange={setFatherHomeAddress}
                  label="Alamat Rumah"
                  placeholder="Masukkan alamat"
                />
              </div>

              {/* Ibu */}
              <h1 className="col-span-2 text-lg font-semibold">
                Identitas Ibu
              </h1>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={mother}
                  onChange={setMother}
                  label="Nama Ibu"
                  placeholder="ex: Siti Jauhari S.Pd"
                />
              </div>
              <FormSelect
                value={motherJob}
                onChange={setMotherJob}
                label="Pekerjaan"
                option={["option 1"]}
              />
              <FormSelect
                onChange={setGuardianReligion}
                label="Agama"
                value={guardianReligion}
                option={["Islam", "Prostestan", "Katolik", "Hindu", "Budha"]}
              />
              <div className="col-span-2">
                <FormInput
                  input="number"
                  value={motherPhoneNumber}
                  onChange={setMotherPhoneNumber}
                  label="Nomor HP"
                  placeholder="+62   8986453xxx"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={motherOfficeAddress}
                  onChange={setMotherOfficeAddress}
                  label="Alamat Kantor"
                  placeholder="Masukkan alamat"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={motherHomeAddress}
                  onChange={setMotherHomeAddress}
                  label="Alamat Rumah"
                  placeholder="Masukkan alamat"
                />
              </div>
            </div>

            <ToggleButton toggleSwitch={toggleSwitch} checked={checked} />
          </div>
          <div className={`${navigation == 3 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-2 gap-5 mt-6">
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={guardian}
                  onChange={setGuardian}
                  label="Nama Wali"
                  placeholder="ex: Muhammad Jauhari S.Pd"
                />
              </div>
              <FormSelect
                onChange={setGuardianJob}
                label="Pekerjaan"
                value={guardianJob}
                option={["option 1"]}
              />
              <FormSelect
                onChange={setGuardianReligion}
                label="Agama"
                value={guardianReligion}
                option={["Islam", "Prostestan", "Katolik", "Hindu", "Budha"]}
              />
              <FormInput
                input="number"
                value={guardianPhoneNumber}
                onChange={setGuardianPhoneNumber}
                label="Nomor HP"
                placeholder="+62   8986453xxx"
              />
              <FormSelect
                value={relationship}
                onChange={setRelationship}
                label="Hubungan dengan siswa"
                option={["option 1"]}
              />
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={guardianOfficeAddress}
                  onChange={setGuardianOfficeAddress}
                  label="Alamat Kantor"
                  placeholder="Masukkan alamat"
                />
              </div>
              <div className="col-span-2">
                <FormInput
                  input="text"
                  value={guardianHomeAddress}
                  onChange={setGuardianHomeAddress}
                  label="Alamat Rumah"
                  placeholder="Masukkan alamat"
                />
              </div>
            </div>
            <ToggleButton toggleSwitch={toggleSwitch} checked={checked} />
          </div>

          <div className={`${navigation == 4 ? "block" : "hidden"}`}>
            Not Found
          </div>

          <div className="w-full justify-end right-6 flex gap-2">
            <button
              onClick={onClose}
              className="px-10 py-3 rounded-full box-border w-[120px] h-[45px] bg-white text-primary border-primary border-2 text-sm font-semibold"
            >
              Tutup
            </button>
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
