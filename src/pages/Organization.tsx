import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ChevronRight, X, User as UserIcon } from 'lucide-react';
import { orgService } from '../services';
import { Organization as OrgType, Member } from '../types';

const OrganizationPage = () => {
  const [divisions, setDivisions] = useState<OrgType[]>([]);
  const [selectedDiv, setSelectedDiv] = useState<OrgType | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    const unsubscribe = orgService.subscribe(setDivisions);
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary mb-4">Struktur Organisasi</h1>
        <p className="text-gray-600">Kenali tim hebat di balik setiap program kerja HIMAPKO.</p>
        <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {divisions.map((div) => (
          <motion.div
            key={div.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer"
            onClick={() => setSelectedDiv(div)}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={div.groupPhoto || "https://picsum.photos/seed/division/600/400"} 
                alt={div.divisionName} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-secondary">{div.divisionName}</h3>
              <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                <ChevronRight className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Division Detail Modal */}
      <AnimatePresence>
        {selectedDiv && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-sm"
            onClick={() => setSelectedDiv(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-2xl font-bold text-secondary">{selectedDiv.divisionName}</h2>
                <button onClick={() => setSelectedDiv(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {selectedDiv.members?.map((member, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="text-center cursor-pointer group"
                      onClick={() => setSelectedMember(member)}
                    >
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary transition-colors mb-3">
                        {member.photoUrl ? (
                          <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <UserIcon className="w-10 h-10" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-secondary truncate">{member.name}</h4>
                      <p className="text-xs text-primary font-medium">{member.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 bg-primary">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                  {selectedMember.photoUrl ? (
                    <img src={selectedMember.photoUrl} alt={selectedMember.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <UserIcon className="w-16 h-16" />
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-16 pb-8 px-8 text-center">
                <h3 className="text-2xl font-bold text-secondary">{selectedMember.name}</h3>
                <p className="text-primary font-semibold mb-4">{selectedMember.role}</p>
                <div className="w-12 h-1 bg-gray-100 mx-auto mb-6"></div>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  {selectedMember.bio || "Tidak ada biografi tersedia."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganizationPage;
