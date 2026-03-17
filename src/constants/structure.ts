import { Organization } from '../types';

export const INITIAL_STRUCTURE: Omit<Organization, 'id'>[] = [
  {
    divisionName: 'Pengurus Harian',
    groupPhoto: 'https://picsum.photos/seed/ph/800/600',
    members: [
      { name: 'Adam Faizal Ristyananda Kurniawan', role: 'Ketua Umum', nim: '2306961' },
      { name: 'Raden Mas Fiqih Nawaal Fadilah', role: 'Wakil Ketua Umum', nim: '2406953' },
      { name: 'Gita Crysdiani', role: 'Sekretaris Umum', nim: '2303567' },
      { name: 'Raihany Desi Putri', role: 'Sekretaris I', nim: '2406160' },
      { name: 'Karisma Ayu Wulandari', role: 'Bendahara Umum', nim: '2300819' },
      { name: 'Fariz Nur Khazanah', role: 'Bendahara I', nim: '2400039' },
    ]
  },
  {
    divisionName: 'Komisi',
    groupPhoto: 'https://picsum.photos/seed/komisi/800/600',
    members: [
      { name: 'Ilham Maulana Rustandi', role: 'Ketua', nim: '2304607' },
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
    groupPhoto: 'https://picsum.photos/seed/humas/800/600',
    members: [
      { name: 'Febriyansah', role: 'Ketua', nim: '2300439' },
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
    groupPhoto: 'https://picsum.photos/seed/legislasi/800/600',
    members: [
      { name: 'Muhammad Hu Gardani', role: 'Ketua', nim: '2305233' },
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
    groupPhoto: 'https://picsum.photos/seed/psdm/800/600',
    members: [
      { name: 'Sintia Saridah Azhar', role: 'Ketua', nim: '2308119' },
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
