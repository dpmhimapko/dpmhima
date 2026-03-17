import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, X, Trophy, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { newsService, staffService } from '../services';
import { News, StaffBest } from '../types';

const NewsPage = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [staffList, setStaffList] = useState<StaffBest[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('Januari');

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'];

  useEffect(() => {
    const unsubNews = newsService.subscribe(setNewsList);
    const unsubStaff = staffService.subscribe(setStaffList);
    return () => {
      unsubNews();
      unsubStaff();
    };
  }, []);

  const filteredStaff = staffList.filter(s => s.month === selectedMonth);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Staff of the Month Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold mb-4">
            <Trophy className="w-4 h-4" />
            Hall of Fame
          </div>
          <h2 className="text-3xl font-bold text-secondary">Staff & Ketua Terbaik</h2>
          <p className="text-gray-600 mt-2">Penghargaan untuk dedikasi luar biasa setiap bulannya.</p>
        </div>

        {/* Month Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {months.map(month => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedMonth === month 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center relative overflow-hidden group"
                >
                  <div className="absolute top-2 right-2">
                    <Star className={`w-6 h-6 ${staff.type === 'chair' ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  </div>
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/10">
                    <img src={staff.imageUrl || "https://picsum.photos/seed/staff/200/200"} alt={staff.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="font-bold text-secondary">{staff.name}</h4>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{staff.type === 'chair' ? 'Ketua Terbaik' : 'Staff Terbaik'}</p>
                  <p className="text-sm text-gray-500">{staff.division}</p>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-400 italic">
                Belum ada data penghargaan untuk bulan ini.
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* News Section */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-secondary">Berita & Kegiatan</h2>
          <div className="w-1/3 h-px bg-gray-100 hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <motion.div
              key={news.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer group"
              onClick={() => setSelectedNews(news)}
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={news.imageUrl || "https://picsum.photos/seed/news/600/400"} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors">{news.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {news.content.replace(/[#*`]/g, '')}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <User className="w-3 h-3" />
                    {news.author}
                  </div>
                  <div className="text-primary font-bold text-sm flex items-center gap-1">
                    Baca <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/90 backdrop-blur-md"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-96">
                <img 
                  src={selectedNews.imageUrl || "https://picsum.photos/seed/news/1200/800"} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedNews.title}</h2>
                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(selectedNews.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {selectedNews.author}</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-8 md:p-12">
                <div className="markdown-body prose max-w-none">
                  <ReactMarkdown>{selectedNews.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsPage;
