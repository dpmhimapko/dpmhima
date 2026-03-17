import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HIMAPKO</h3>
            <p className="text-gray-400 text-sm">
              Himpunan Mahasiswa yang berdedikasi untuk kemajuan dan aspirasi seluruh anggotanya.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/profil" className="hover:text-primary transition-colors">Profil</a></li>
              <li><a href="/struktur" className="hover:text-primary transition-colors">Struktur Organisasi</a></li>
              <li><a href="/berita" className="hover:text-primary transition-colors">Berita Terkini</a></li>
              <li><a href="/aspirasi" className="hover:text-primary transition-colors">Kirim Aspirasi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <p className="text-gray-400 text-sm">
              Email: himapko@univ.ac.id<br />
              Instagram: @himapko_official<br />
              Sekretariat: Gedung Ormawa Lt. 2
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary fill-current" /> by HIMAPKO Tech Team &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
