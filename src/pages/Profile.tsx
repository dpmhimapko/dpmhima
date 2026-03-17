import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Heart } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
      {/* Logo Meaning */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-64 h-64 bg-primary rounded-full flex items-center justify-center text-white text-8xl font-bold shadow-2xl"
          >
            H
          </motion.div>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-secondary">Makna Logo HIMAPKO</h2>
          <div className="w-20 h-1 bg-primary"></div>
          <div className="space-y-4 text-gray-600">
            <p>Logo HIMAPKO bukan sekadar simbol visual, melainkan representasi dari nilai-nilai luhur yang kami pegang teguh:</p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Warna Merah Ati</h4>
                  <p className="text-sm">Melambangkan keberanian, semangat yang membara, dan ketegasan dalam mengambil keputusan.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-secondary">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Bentuk Lingkaran</h4>
                  <p className="text-sm">Melambangkan kesatuan, kebulatan tekad, dan hubungan kekeluargaan yang tidak terputus.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Huruf H</h4>
                  <p className="text-sm">Representasi dari Harmoni, Humanis, dan Harapan bagi seluruh mahasiswa.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-secondary text-white p-12 rounded-3xl shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-6">Visi</h3>
          <p className="text-gray-300 text-lg italic leading-relaxed">
            "Menjadi organisasi kemahasiswaan yang unggul, berintegritas, dan inovatif dalam mewujudkan kesejahteraan serta prestasi mahasiswa di tingkat nasional."
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100"
        >
          <h3 className="text-3xl font-bold mb-6 text-secondary">Misi</h3>
          <ul className="space-y-4 text-gray-600">
            {[
              'Mengoptimalkan peran himpunan sebagai wadah aspirasi.',
              'Menyelenggarakan kegiatan yang menunjang kompetensi akademik.',
              'Mempererat tali persaudaraan antar mahasiswa.',
              'Membangun kerjasama strategis dengan pihak eksternal.'
            ].map((misi, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                {misi}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default Profile;
