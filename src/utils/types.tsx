type ApiResponse = {
  code: number;
  data: ApiResponseData;
  status: string;
};

type ApiResponseData = {
  current_page: number;
  data: Teacher[] | Attendance[] | TableTeacher[] | TableNews[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

type Teacher = {
  id: number;
  school_code: string;
  user_id: string;
  nip: string;
  name: string;
  status: string;
  gender: string;
  address: string | null;
  active: string;
  created_at: string;
  updated_at: string;
  id_number: string | null;
  position: string | null;
  birth_date: string | null;
  birth_place: string | null;
  last_education: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  subdistrict: string | null;
  join_date: string | null;
  image: string | null;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type User = {
  id: number;
  name: string;
  email: string;
  school_code: string;
  guru: Guru[];
};

interface Guru {
  id: number;
  name: string;
  nip: string;
  status: string;
  gender: string;
  user_id: number;
}

type Attendance = {
  id: number;
  user_id: string;
  date: string;
  in_time: string;
  photo: string | null;
  location: string;
  message: string | null;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
  out_time: string;
  lunch: number;
  total_duration: number;
  status: string;
  out_location: string;
  out_message: string | null;
  out_latitude: string;
  out_longitude: string;
  out_photo: string | null;
  user: User;
};

type TableTeacher = {
  active: string;
  address: string;
  birth_date: string;
  birth_place: string;
  city: string;
  created_at: string;
  district: string;
  gender: string;
  id: number;
  id_number: string;
  image: string;
  join_date: string;
  last_education: string;
  name: string;
  nip: string;
  position: string;
  province: string;
  school_code: string;
  status: string;
  subdistrict: string;
  updated_at: string;
  user_id: string;
  phoneNumber: string;
  email: string;
  user: users;
};

type TableNews = {
  id: number;
  title: string;
  type: string;
  image: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  published_date: string;
  published: number;
};

type TableQuote = {
  name: string;
  title: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
  id: number;
};

type users = {
  id: number;
  phone_number: string;
  email: string;
};

type FormAddress = {
  name: string;
  id: string;
};

type CommonTableProps = {
  head: string[];
  body: ApiResponseData | {} | [] | Attendance[];
  from: string;
  handlePagination: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type PembayaranProps = {
  tanggal: string;
  name: string;
  nip: string;
  orang_tua: string;
  pembayaran: string;
  keterangan: boolean | string;
  status: string;
};

type GuruProps = {
  nip: string;
  name: string;
  gender: string;
  employmentStatus: string;
  phoneNumber: string;
  status: boolean;
};

type AbsensiProps = {
  tanggal: string;
  name: string;
  nip: string;
  masuk: string;
  keluar: string;
  jamKerja: string;
  keterangan: boolean | string;
  status: boolean;
};

type ClassProps = {
  kode: string;
  kelas: string;
  quota: string;
  desc: string | boolean;
  status: boolean;
};

type PaymentProps = {
  kode: string;
  name: string;
  typeOfPayment: string;
  desc: string | boolean;
  status: boolean;
};

type SiswaProps = {
  nisn: string;
  name: string;
  kelas: string;
  desc: boolean;
  status: boolean;
};

type KategoriLiburProps = {
  kode: string;
  name: string;
  desc: string | boolean;
  status: boolean;
};

type BeritaProps = {
  created_at: string;
  title: string;
  writer: string;
  active: boolean;
};

type CareerProps = {
  created_at: string;
  desc: string;
  position: string;
  active: boolean;
};

type PenggajianGuru = {
  date: string;
  name: string;
  nip: string;
  status: string;
  total_received: string;
  active: boolean;
};

type PembayaranGuru = {
  id: number;
  user_id: string;
  bulan: number;
  tahun: string;
  kode_gaji_pokok: string;
  tunjangan_guru_kelas: number;
  jabatan_tambahan: number;
  hari_masuk: number;
  libur_sekolah: number;
  sakit: number;
  izin: number;
  transport_perhari: number;
  transport_1_1numbernumber: number;
  transport_2_7number: number;
  transport_3_7number: number;
  transport_4_5number: number;
  pulsa: number;
  jtm_bsu: number;
  nominal_bsu: number;
  bsu_dibayar: number;
  jumlah_jam_pengganti: number;
  guru_pengganti: number;
  uang_makan: number;
  tunjangan_kesehatan: number;
  tunjangan_keluarga: number;
  ekskul_siswa: number;
  ekskul: number;
  piket: number;
  pelatih_upacara: number;
  mentoring: number;
  lain_1: number;
  lain_2: number;
  lain_3: number;
  lain_4: number;
  potongan_terlambat: number;
  data_terlambat: number;
  keterangan: string;
  total_gaji: number;
  created_at: string;
  updated_at: string;
};

type TableWithToggle = {
  head: string[];
  body:
    | {}
    | ApiResponseData
    | GuruProps[]
    | PenggajianGuru[]
    | AbsensiProps[]
    | ClassProps[]
    | PaymentProps[]
    | SiswaProps[]
    | KategoriLiburProps[]
    | PembayaranProps[]
    | Teacher[]
    | PaginationLink[]
    | Attendance[]
    | BeritaProps[]
    | PenggajianGuru[]
    | CareerProps[];
  from: string;
  title: string;
  toggleEdit: (e: any, s?: any) => void;
  toggleDelete: (e: number, name: string) => void;
  toggleDetail: (e: number) => void;
  handlePagination: (e: string | null) => void;
};

type DateProps = {
  id: number;
  date: string;
  day: string;
  event_name: string;
  created_at: string | null;
  updated_at: string | null;
  is_national_holiday: boolean;
};