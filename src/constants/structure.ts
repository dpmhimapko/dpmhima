import { Organization } from '../types';

export const INITIAL_STRUCTURE: Omit<Organization, 'id'>[] = [
  {
    divisionName: 'Pengurus Harian',
    description: 'Badan yang mengkoordinasikan seluruh kegiatan dan kebijakan internal organisasi DPM HIMA PKO.',
    groupPhoto: 'https://lh3.googleusercontent.com/d/1FunSF-v3DcQmLkpnNe052-8_gcJ5hJWQ',
    members: [
      { name: 'Adam Faizal Ristyananda Kurniawan', role: 'Ketua Umum', nim: '2306961', instagram: 'adamfaizal_', jobDesc: 'Bertanggung jawab atas seluruh jalannya organisasi DPM HIMA PKO.' },
      { name: 'Raden Mas Fiqih Nawaal Fadilah', role: 'Wakil Ketua Umum', nim: '2406953', instagram: 'fiqihnawaal', jobDesc: 'Membantu Ketua Umum dalam menjalankan tugas dan koordinasi internal.' },
      { name: 'Gita Crysdiani', role: 'Sekretaris Umum', nim: '2303567', instagram: 'gitacrysdiani', jobDesc: 'Mengelola administrasi dan persuratan organisasi.' },
      { name: 'Raihany Desi Putri', role: 'Sekretaris I', nim: '2406160', instagram: 'raihanydesi', jobDesc: 'Membantu Sekretaris Umum dalam tugas administrasi.' },
      { name: 'Karisma Ayu Wulandari', role: 'Bendahara Umum', nim: '2300819', instagram: 'karismaayu', jobDesc: 'Mengelola keuangan dan anggaran organisasi.' },
      { name: 'Fariz Nur Khazanah', role: 'Bendahara I', nim: '2400039', instagram: 'fariznur', jobDesc: 'Membantu Bendahara Umum dalam pengelolaan keuangan.' },
    ]
  },
  {
    divisionName: 'Komisi',
    description: 'Lembaga pengawasan yang memastikan setiap program kerja berjalan sesuai dengan peraturan yang berlaku.',
    groupPhoto: 'https://lh3.googleusercontent.com/d/1KI-VGG-6ehvAKqA1GDDOCKQDwJYIEjgZ',
    members: [
      { name: 'Ilham Maulana Rustandi', role: 'Ketua', nim: '2304607', instagram: 'ilhammr', jobDesc: 'Mengkoordinasikan tugas-tugas komisi dalam pengawasan dan legislasi.' },
      { name: 'Andhika Nur Rohim', role: 'Wakil Ketua', nim: '2403484' },
      { name: 'Awaludin Jamil', role: 'Anggota', nim: '2309458' },
      { name: 'M. Dzikra Al Faruq Nugraha', role: 'Anggota', nim: '2307114' },
      { name: 'Muhammad Gitra Widyaswara', role: 'Anggota', nim: '2301981' },
      { name: 'Tsunami Sakuragi Al Badrani', role: 'Anggota', nim: '2310653' },
      { name: 'Nabiel Al Faruq', role: 'Anggota', nim: '2300384' },
      { name: 'Nabiha Urdha Laksita', role: 'Anggota', nim: '2303619' },
      { name: 'Hegi Argian Ginanjar', role: 'Anggota', nim: '2408209' },
      { name: 'Indah Aulia Ardana', role: 'Anggota', nim: '2400308' },
      { name: 'Naufal Zuhrul Anam', role: 'Anggota', nim: '2405420' },
      { name: 'Nayla Khairunnisa Muharrami M.', role: 'Anggota', nim: '2401500' },
      { name: 'Putri Afifah', role: 'Anggota', nim: '2410368' },
      { name: 'Rahma Nur Fauziyyah', role: 'Anggota', nim: '2401408' },
      { name: 'Sidiq Khoerulsyah Sudiro', role: 'Anggota', nim: '2403553' },
    ]
  },
  {
    divisionName: 'Biro Hubungan Masyarakat',
    description: 'Jembatan komunikasi antara organisasi dengan mahasiswa serta pihak eksternal lainnya.',
    groupPhoto: 'https://lh3.googleusercontent.com/d/1s5yAQZ5ZMU_X1tjk7GyefouDi1NxgjMe',
    members: [
      { name: 'Febriyansah', role: 'Ketua', nim: '2300439', instagram: 'febriyansah', jobDesc: 'Membangun hubungan baik dengan pihak internal maupun eksternal kampus.' },
      { name: 'Nanda Firmansyah', role: 'Wakil Ketua', nim: '2311900' },
      { name: 'Fahreza Ramdhan', role: 'Anggota', nim: '2311900' },
      { name: 'Muhammad Ahdan Haqqin', role: 'Anggota', nim: '2305537' },
      { name: 'Muhammad Haykal Kuswandi', role: 'Anggota', nim: '2303745' },
      { name: 'Muhammad Hensen Fernando', role: 'Anggota', nim: '2311984' },
      { name: 'Najmah Syahirah Ayyasy Suhenda', role: 'Anggota', nim: '2403672' },
    ]
  },
  {
    divisionName: 'Badan Legislasi',
    description: 'Fokus pada perumusan, pengkajian, dan penetapan peraturan-peraturan dalam lingkungan organisasi.',
    groupPhoto: 'https://lh3.googleusercontent.com/d/1xrfF2OrO4IAoVfshEAMZJ7xI9mteIv4X',
    members: [
      { name: 'Muhammad Hu Gardani', role: 'Ketua', nim: '2305233', instagram: 'hugardani', jobDesc: 'Merumuskan dan meninjau peraturan organisasi.' },
      { name: 'Muhammad Abhinaya Putrawan', role: 'Wakil Ketua', nim: '2405388' },
      { name: 'Raden Mayanza Windriani', role: 'Anggota', nim: '2300920' },
      { name: 'M. Saabiq Faqihufiddin', role: 'Anggota', nim: '2306869' },
      { name: 'Alvina Zahwa cs', role: 'Anggota', nim: '2301543' },
      { name: 'Yulia Marwah', role: 'Anggota', nim: '2303592' },
      { name: 'Meisya Revalina Putri', role: 'Anggota', nim: '2402276' },
      { name: 'Sutan Alfarizi Elfaizal Putra', role: 'Anggota', nim: '2404679' },
    ]
  },
  {
    divisionName: 'Biro Pengembangan Sumber Daya Manusia',
    description: 'Bertanggung jawab dalam pengembangan potensi, karakter, dan kesejahteraan seluruh anggota organisasi.',
    groupPhoto: 'https://lh3.googleusercontent.com/d/1RNKAC-6w66W6USCJvJnz8AJpo1gfGe8g',
    members: [
      { name: 'Sintia Saridah Azhar', role: 'Ketua', nim: '2308119', instagram: 'sintiasaridah', jobDesc: 'Mengembangkan potensi dan kesejahteraan anggota HIMA PKO.' },
      { name: 'Tiara Zahra Febrianti', role: 'Wakil Ketua', nim: '2400439' },
      { name: 'Khairani Nurul Ulfa', role: 'Anggota', nim: '2307024' },
      { name: 'Qafka Nafhisa Okta Yedi', role: 'Anggota', nim: '2309124' },
      { name: 'Dina Erpiyana', role: 'Anggota', nim: '2305832' },
      { name: 'Fatia Kamila Najah', role: 'Anggota', nim: '2408653' },
      { name: 'Iqhlima Zannaty Haniffah', role: 'Anggota', nim: '2404996' },
      { name: 'Hasna Utami Putri', role: 'Anggota', nim: '2405138' },
      { name: 'Renata Permana Putri', role: 'Anggota', nim: '2400267' },
    ]
  }
];
