import { News } from '../types';

export const INITIAL_NEWS: Omit<News, 'id'>[] = [
  {
    title: 'Pelantikan Pengurus DPM HIMA PKO Periode 2024/2025',
    content: 'Selamat kepada seluruh pengurus yang telah dilantik. Semoga amanah dalam menjalankan tugas selama satu periode ke depan.',
    date: '2024-03-15',
    imageUrl: 'https://picsum.photos/seed/pelantikan/800/600',
    author: 'Admin',
    category: 'Organisasi'
  },
  {
    title: 'Rapat Kerja Wilayah Ikatan Mahasiswa Keolahragaan',
    content: 'DPM HIMA PKO turut hadir dalam Rakerwil untuk mempererat tali silaturahmi antar mahasiswa keolahragaan se-wilayah.',
    date: '2024-03-10',
    imageUrl: 'https://picsum.photos/seed/rakerwil/800/600',
    author: 'Admin',
    category: 'Kegiatan'
  },
  {
    title: 'Open Recruitment Anggota Baru DPM HIMA PKO',
    content: 'Segera daftarkan dirimu untuk menjadi bagian dari perubahan. Mari bersama-sama membangun HIMA PKO yang lebih baik.',
    date: '2024-03-01',
    imageUrl: 'https://picsum.photos/seed/oprec/800/600',
    author: 'Admin',
    category: 'Pengumuman'
  }
];
