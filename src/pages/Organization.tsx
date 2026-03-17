import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ChevronRight, X, User as UserIcon, CreditCard, Plus } from 'lucide-react';
import { orgService } from '../services';
import { Organization as OrgType, Member } from '../types';
import { INITIAL_STRUCTURE } from '../constants/structure';

const OrganizationPage = () => {
  const [divisions, setDivisions] = useState<OrgType[]>([]);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [visibleDivisions, setVisibleDivisions] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = orgService.subscribe((data) => {
      if (data.length === 0) {
        setDivisions(INITIAL_STRUCTURE.map((d, i) => ({ ...d, id: `init-${i}` } as OrgType)));
      } else {
        setDivisions(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleMember = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const toggleDivision = (id: string) => {
    setVisibleDivisions(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black text-secondary mb-6 tracking-tighter"
        >
          STRUKTUR ORGANISASI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 max-w-2xl mx-auto text-lg"
        >
          Sinergi dan kolaborasi tim DPM HIMA PKO dalam mewujudkan aspirasi mahasiswa.
        </motion.p>
        <div className="w-24 h-1.5 bg-primary mx-auto mt-8 rounded-full"></div>
      </div>

      <div className="space-y-32">
        {divisions.map((div, divIdx) => {
          const isDivVisible = visibleDivisions.includes(div.id);
          
          return (
            <section key={div.id} className="relative">
              <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
                <div className="lg:w-1/3 sticky top-24">
                  <div className="space-y-4">
                    <span className="text-primary font-black text-6xl opacity-10">0{divIdx + 1}</span>
                    <h2 className="text-3xl font-bold text-secondary leading-tight uppercase tracking-tight">
                      {div.divisionName}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {div.description || `Tim berdedikasi yang fokus pada ${div.divisionName.toLowerCase()} untuk kemajuan organisasi.`}
                    </p>
                    <button 
                      onClick={() => toggleDivision(div.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      <Users className="w-4 h-4" />
                      {isDivVisible ? 'Sembunyikan Anggota' : 'Lihat Anggota'}
                    </button>
                  </div>
                </div>
                
                <div className="lg:w-2/3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-white"
                  >
                    <img 
                      src={div.groupPhoto || "https://picsum.photos/seed/division/1200/800"} 
                      alt={div.divisionName} 
                      className="w-full aspect-video object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {isDivVisible && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
                      {div.members?.map((member, mIdx) => {
                        const memberId = `${div.id}-${mIdx}`;
                        const isExpanded = expandedMember === memberId;

                        return (
                          <motion.div
                            key={memberId}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: mIdx * 0.05 }}
                            onClick={() => toggleMember(memberId)}
                            className={`relative bg-white rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden ${
                              isExpanded 
                                ? 'col-span-1 sm:col-span-2 lg:col-span-2 ring-2 ring-primary border-transparent shadow-xl' 
                                : 'hover:border-primary/50 hover:shadow-lg border-gray-100'
                            }`}
                          >
                            <div className={`flex ${isExpanded ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
                              {/* Photo Area */}
                              <div className={`${isExpanded ? 'md:w-2/5' : 'w-full'} relative aspect-square overflow-hidden bg-gray-50`}>
                                {member.photoUrl ? (
                                  <img 
                                    src={member.photoUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer" 
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <UserIcon className={isExpanded ? "w-24 h-24" : "w-12 h-12"} />
                                  </div>
                                )}
                                {!isExpanded && (
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                )}
                              </div>

                              {/* Info Area */}
                              <div className={`p-6 flex flex-col justify-between ${isExpanded ? 'md:w-3/5' : 'w-full'}`}>
                                <div>
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className={`font-bold text-secondary leading-tight ${isExpanded ? 'text-2xl' : 'text-base'}`}>
                                      {member.name}
                                    </h4>
                                    {!isExpanded && (
                                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Plus className="w-4 h-4" />
                                      </div>
                                    )}
                                  </div>
                                  <p className={`text-primary font-bold uppercase tracking-wider ${isExpanded ? 'text-sm mb-6' : 'text-[10px]'}`}>
                                    {member.role}
                                  </p>

                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-6 mt-6"
                                      >
                                        {member.jobDesc && (
                                          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tugas & Tanggung Jawab</h5>
                                            <p className="text-gray-700 text-sm leading-relaxed">{member.jobDesc}</p>
                                          </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4">
                                          {member.instagram && (
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                              <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Instagram</h5>
                                              <a 
                                                href={`https://instagram.com/${member.instagram}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-primary text-sm font-bold hover:underline flex items-center gap-2"
                                              >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                        @{member.instagram}
                                      </a>
                                    </div>
                                  )}
                                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">NIM</h5>
                                    <p className="text-secondary text-sm font-bold">{member.nim || '-'}</p>
                                  </div>
                                </div>

                                <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10 relative">
                                  <h5 className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Quotes / Bio</h5>
                                  <p className="text-secondary text-sm italic leading-relaxed">
                                    "{member.bio || "Berdedikasi untuk kemajuan DPM HIMA PKO."}"
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {isExpanded && (
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleMember(memberId); }}
                            className="mt-8 w-full py-3 bg-secondary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-colors"
                          >
                            Tutup Detail
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
})}
      </div>
    </div>
  );
};

export default OrganizationPage;
