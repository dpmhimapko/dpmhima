import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Newspaper, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://picsum.photos/seed/himapko/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-secondary"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Selamat Datang di <span className="text-primary">DPM HIMA PKO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10"
          >
            Wadah kolaborasi, inovasi, dan aspirasi mahasiswa untuk masa depan yang lebih gemilang.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/aspirasi" className="bg-primary hover:bg-red-900 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 group">
              Kirim Aspirasi <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/profil" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3 rounded-full font-bold transition-all border border-white/30">
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Highlight Kegiatan</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Berita Terkini', desc: 'Dapatkan informasi terbaru seputar kampus dan himpunan.', icon: Newspaper, link: '/berita', color: 'bg-blue-50 text-blue-600' },
            { title: 'Struktur Organisasi', desc: 'Kenali wajah-wajah di balik layar kepengurusan DPM HIMA PKO.', icon: Users, link: '/struktur', color: 'bg-red-50 text-primary' },
            { title: 'Layanan Aspirasi', desc: 'Suarakan pendapatmu untuk perubahan yang lebih baik.', icon: MessageSquare, link: '/aspirasi', color: 'bg-green-50 text-green-600' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 card-hover"
            >
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-6`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6">{item.desc}</p>
              <Link to={item.link} className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Lihat Detail <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Mission Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 img-zoom-container shadow-2xl">
            <img 
              src="https://picsum.photos/seed/vision/800/600" 
              alt="Vision" 
              className="w-full h-full object-cover img-zoom"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-secondary">Visi & Misi Kami</h2>
            <p className="text-gray-600 leading-relaxed">
              DPM HIMA PKO berkomitmen untuk menjadi organisasi yang inklusif, transparan, dan progresif. Kami percaya bahwa setiap mahasiswa memiliki potensi besar yang perlu didukung melalui wadah yang tepat.
            </p>
            <ul className="space-y-4">
              {[
                'Meningkatkan kualitas akademik dan non-akademik.',
                'Membangun sinergi antar mahasiswa dan birokrasi.',
                'Mewujudkan tata kelola organisasi yang profesional.'
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
            <Link to="/profil" className="inline-block text-primary font-bold border-b-2 border-primary pb-1 hover:text-red-900 hover:border-red-900 transition-all">
              Selengkapnya tentang profil kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
