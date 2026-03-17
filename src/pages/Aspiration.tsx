import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { aspirationService } from '../services';

const AspirationPage = () => {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    subject: '',
    message: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await aspirationService.add({
        ...formData,
        nama: formData.isAnonymous ? 'Anonim' : formData.nama,
        nim: formData.isAnonymous ? '-' : formData.nim,
        timestamp: new Date().toISOString(),
        status: 'new'
      });
      setIsSuccess(true);
      setFormData({ nama: '', nim: '', subject: '', message: '', isAnonymous: false });
    } catch (err) {
      setError('Gagal mengirim aspirasi. Silakan coba lagi nanti.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-secondary mb-4">Suarakan Aspirasimu</h1>
            <p className="text-gray-600 text-lg">
              Kami percaya bahwa setiap suara berharga. Sampaikan saran, kritik, atau keluhanmu untuk HIMAPKO yang lebih baik.
            </p>
            <div className="w-20 h-1 bg-primary mt-6"></div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl flex gap-4 border border-blue-100">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">Privasi Terjamin</p>
              <p>Data yang kamu kirimkan akan dikelola secara profesional oleh tim admin HIMAPKO dan diteruskan ke pihak terkait.</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-secondary">Alur Aspirasi:</h3>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Pengisian Form', desc: 'Isi data diri dan pesan aspirasi dengan jelas.' },
                { step: '02', title: 'Verifikasi Admin', desc: 'Tim admin akan meninjau aspirasi yang masuk.' },
                { step: '03', title: 'Tindak Lanjut', desc: 'Aspirasi akan diteruskan ke divisi terkait atau birokrasi.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-2xl font-black text-primary/20">{item.step}</div>
                  <div>
                    <h4 className="font-bold text-secondary">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          {isSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-secondary">Aspirasi Terkirim!</h2>
              <p className="text-gray-600">Terima kasih telah berkontribusi. Aspirasimu sangat berarti bagi kami.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-primary font-bold hover:underline"
              >
                Kirim aspirasi lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="checkbox" 
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="anonymous" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Kirim sebagai Anonim
                </label>
              </div>

              {!formData.isAnonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                    <input 
                      required
                      type="text"
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">NIM</label>
                    <input 
                      required
                      type="text"
                      value={formData.nim}
                      onChange={(e) => setFormData({...formData, nim: e.target.value})}
                      placeholder="Contoh: 12345678"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Subjek Aspirasi</label>
                <input 
                  required
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Contoh: Fasilitas Kampus / Program Kerja"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Pesan Aspirasi</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tuliskan aspirasimu secara detail di sini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex gap-2 items-center text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-red-900'
                }`}
              >
                {isSubmitting ? 'Mengirim...' : (
                  <>
                    Kirim Sekarang <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AspirationPage;
