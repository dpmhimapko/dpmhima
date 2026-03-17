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
            className="relative w-72 h-72 flex items-center justify-center"
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1-ARNk9ZHr1BQObGL7HybPzS-V0Z-3zkV" 
              alt="Logo Parlemen" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-secondary">Makna Logo Parlemen</h2>
          <div className="w-20 h-1 bg-primary"></div>
          <div className="space-y-6 text-gray-600">
            <p>Logo Parlemen Ressilience 2025/2026 merepresentasikan identitas dan semangat perjuangan kami:</p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <img 
                  src="https://lh3.googleusercontent.com/d/1BRD-jvTOxPhi4AgyO1NXVH5fCSLnSJ8s" 
                  alt="Lingkaran" 
                  className="w-16 h-16 object-contain flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-secondary">Lingkaran</h4>
                  <p className="text-sm">Lingkaran yang tak bulat sempurna menjaga nyala warna, melambangkan kondisi yang tidak selalu sempurna tapi bisa menjaga isinya.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <img 
                  src="https://lh3.googleusercontent.com/d/1CLxO8IRaiOhxs91wZ-AxGucW-HzaNk0o" 
                  alt="Perisai R" 
                  className="w-16 h-16 object-contain flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-secondary">Perisai R</h4>
                  <p className="text-sm">Shield and sign “R” melambangkan makna ressilience yang tangguh, adaptif dan teguh</p>
                </div>
              </li>
              <li className="flex gap-4">
                <img 
                  src="https://lh3.googleusercontent.com/d/1TYSOZKLy9A1ZVxiZAXTMf3V4QRJIO3tN" 
                  alt="Api" 
                  className="w-16 h-16 object-contain flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-secondary">Api</h4>
                  <p className="text-sm">Api menyala melambangkan semangat perjuangan, keberanian, dan daya tahan.</p>
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
            "Membangun lembaga yang aspiratif bagi mahasiswa dengan mengedepankan kolektif suara dalam pengambilan keputusan yang transparan, adaptif dan fleksibel untuk mahasiswa dalam meningkatkan kolaborasi agar mampu menjadi tempat untuk tumbuh, berkembang, belajar, dan berdinamika bagi seluruh mahasiswa Pendidikan Kepelatihan Olahraga FPOK UPI"
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
              'Mengembangkan budaya organisasi yang transparan, adaptif, dan fleksibel.',
              'Mendorong kolaborasi yang sinergis dan profesional.',
              'Optimalisasi peran DPM HIMA PKO sebagai lembaga yang aspiratif menyuarakan, menyalurkan dan mengadvokasi ide, aspirasi, dan inovasi mahasiwa.',
              'Menciptakan jaringan komunikasi dan organisasi yang baik dikalangan mahasiswa pendidikan kepelatihan olahraga.'
            ].map((misi, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>{misi}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </div>
  );
};

export default Profile;
