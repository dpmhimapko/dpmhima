import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  MessageSquare, 
  Plus, 
  Trash2, 
  LogOut, 
  Trophy,
  CheckCircle,
  Clock,
  RefreshCw,
  Shield,
  UserCheck,
  UserX,
  ShieldAlert
} from 'lucide-react';
import { newsService, staffService, orgService, aspirationService, userService } from '../services';
import { News, StaffBest, Organization, Aspiration, UserProfile } from '../types';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'news' | 'staff' | 'org' | 'asp' | 'users'>('news');
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Data States
  const [news, setNews] = useState<News[]>([]);
  const [staff, setStaff] = useState<StaffBest[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [asps, setAsps] = useState<Aspiration[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Form States
  const [newsForm, setNewsForm] = useState({ title: '', content: '', imageUrl: '', author: '' });
  const [staffForm, setStaffForm] = useState({ name: '', month: 'Januari', division: '', type: 'staff' as const, imageUrl: '' });
  const [orgForm, setOrgForm] = useState({ divisionName: '', groupPhoto: '' });
  const [aspForm, setAspForm] = useState({ nama: '', nim: '', subject: '', message: '' });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profile = await userService.getProfile(currentUser.uid);
        if (profile) {
          setUserProfile(profile);
          setIsAuthorized(profile.isApproved);
          setIsSuperAdmin(profile.role === 'superadmin' || currentUser.email === 'aahdan298@gmail.com');
          setIsPending(profile.role === 'pending');
        } else {
          // Create initial profile for new users
          const isSuper = currentUser.email === 'aahdan298@gmail.com';
          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Admin User',
            photoURL: currentUser.photoURL || '',
            role: isSuper ? 'superadmin' : 'pending',
            isApproved: isSuper,
            createdAt: new Date().toISOString()
          };
          await userService.createProfile(newProfile);
          setUserProfile(newProfile);
          setIsAuthorized(isSuper);
          setIsSuperAdmin(isSuper);
          setIsPending(!isSuper);
        }
      } else {
        setIsAuthorized(false);
        setIsSuperAdmin(false);
        setIsPending(false);
        setUserProfile(null);
      }
      setIsLoading(false);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      const unsubNews = newsService.subscribe(setNews);
      const unsubStaff = staffService.subscribe(setStaff);
      const unsubOrg = orgService.subscribe(setOrgs);
      const unsubAsp = aspirationService.subscribe(setAsps);
      
      let unsubUsers = () => {};
      if (isSuperAdmin) {
        unsubUsers = userService.subscribeAll(setAllUsers);
      }

      return () => {
        unsubNews();
        unsubStaff();
        unsubOrg();
        unsubAsp();
        unsubUsers();
      };
    }
  }, [isAuthorized, isSuperAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert('Gagal login dengan Google.');
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthorized(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Memverifikasi Akses...</p>
    </div>
  );

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md text-center"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-secondary mb-2">Admin Portal</h1>
          <p className="text-gray-500 mb-8 text-sm">Khusus pengurus DPM HIMA PKO yang terdaftar.</p>
          
          {user ? (
            <div className="space-y-4">
              {isPending ? (
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                  <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p className="font-bold mb-1">Akses Tertunda</p>
                  <p className="text-xs">Akun Anda sedang menunggu persetujuan dari Super Admin. Silakan hubungi admin utama.</p>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-red-50 rounded-xl text-red-600 text-sm">
                  Email <strong>{user.email}</strong> tidak memiliki akses admin.
                </div>
              )}
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-secondary text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" /> Keluar Akun
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full bg-white border-2 border-gray-100 text-secondary py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <img src="https://www.gstatic.com/firebase/explore/google.png" className="w-5 h-5" alt="Google" />
              Masuk dengan Google
            </button>
          )}
          
          <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest">
            Authorized Personnel Only
          </p>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <div className="p-4 mb-4 bg-secondary text-white rounded-2xl flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6" />
            <span className="font-bold">Dashboard</span>
          </div>
          {[
            { id: 'news', label: 'Berita', icon: Newspaper },
            { id: 'staff', label: 'Staff Terbaik', icon: Trophy },
            { id: 'org', label: 'Organisasi', icon: Users },
            { id: 'asp', label: 'Aspirasi', icon: MessageSquare },
            ...(isAuthorized ? [{ id: 'users', label: 'Kelola Admin', icon: Shield }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 mt-8"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-grow bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          {activeTab === 'news' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Kelola Berita</h2>
              </div>
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                await newsService.add({ ...newsForm, date: new Date().toISOString() });
                setNewsForm({ title: '', content: '', imageUrl: '', author: '' });
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl">
                <input placeholder="Judul Berita" className="p-3 rounded-lg border" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} required />
                <input placeholder="Penulis" className="p-3 rounded-lg border" value={newsForm.author} onChange={e => setNewsForm({...newsForm, author: e.target.value})} required />
                <input placeholder="URL Gambar" className="p-3 rounded-lg border md:col-span-2" value={newsForm.imageUrl} onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})} />
                <textarea placeholder="Konten (Markdown)" className="p-3 rounded-lg border md:col-span-2" rows={4} value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} required />
                <button className="bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 md:col-span-2">
                  <Plus className="w-5 h-5" /> Tambah Berita
                </button>
              </form>

              <div className="space-y-4">
                {news.map(n => (
                  <div key={n.id} className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-bold">{n.title}</h4>
                      <p className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => newsService.delete(n.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'staff' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Kelola Staff Terbaik</h2>
              <form onSubmit={async (e) => {
                e.preventDefault();
                await staffService.add(staffForm);
                setStaffForm({ name: '', month: 'Januari', division: '', type: 'staff', imageUrl: '' });
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl">
                <input placeholder="Nama Lengkap" className="p-3 rounded-lg border" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} required />
                <input placeholder="Divisi" className="p-3 rounded-lg border" value={staffForm.division} onChange={e => setStaffForm({...staffForm, division: e.target.value})} required />
                <select className="p-3 rounded-lg border" value={staffForm.month} onChange={e => setStaffForm({...staffForm, month: e.target.value})}>
                  {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="p-3 rounded-lg border" value={staffForm.type} onChange={e => setStaffForm({...staffForm, type: e.target.value as any})}>
                  <option value="staff">Staff Terbaik</option>
                  <option value="chair">Ketua Terbaik</option>
                </select>
                <input placeholder="URL Foto" className="p-3 rounded-lg border md:col-span-2" value={staffForm.imageUrl} onChange={e => setStaffForm({...staffForm, imageUrl: e.target.value})} />
                <button className="bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 md:col-span-2">
                  <Plus className="w-5 h-5" /> Tambah Penghargaan
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                        <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{s.name}</h4>
                        <p className="text-[10px] text-primary font-bold uppercase">{s.month} - {s.type}</p>
                      </div>
                    </div>
                    <button onClick={() => staffService.delete(s.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'org' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Kelola Struktur Organisasi</h2>
                <button 
                  onClick={async () => {
                    if (confirm('Ini akan menambahkan struktur organisasi awal. Lanjutkan?')) {
                      const { INITIAL_STRUCTURE } = await import('../constants/structure');
                      for (const div of INITIAL_STRUCTURE) {
                        await orgService.add(div);
                      }
                      alert('Struktur organisasi berhasil diinisialisasi!');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-xl text-sm font-bold hover:bg-black transition-all"
                >
                  <RefreshCw className="w-4 h-4" /> Inisialisasi Struktur
                </button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                await orgService.add({ ...orgForm, members: [] });
                setOrgForm({ divisionName: '', groupPhoto: '' });
              }} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl">
                <input placeholder="Nama Divisi" className="p-3 rounded-lg border" value={orgForm.divisionName} onChange={e => setOrgForm({...orgForm, divisionName: e.target.value})} required />
                <input placeholder="URL Foto Bersama" className="p-3 rounded-lg border" value={orgForm.groupPhoto} onChange={e => setOrgForm({...orgForm, groupPhoto: e.target.value})} required />
                <button className="bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 md:col-span-2">
                  <Plus className="w-5 h-5" /> Tambah Divisi
                </button>
              </form>

              <div className="space-y-4">
                {orgs.map(o => (
                  <div key={o.id} className="p-4 border rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold">{o.divisionName}</h4>
                      <button onClick={() => orgService.delete(o.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {o.members?.length || 0} Anggota
                    </div>
                    {/* Member management can be added here for more complexity */}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'asp' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manajemen Aspirasi</h2>
                <button 
                  onClick={async () => {
                    setIsRefreshing(true);
                    try {
                      const freshData = await aspirationService.getAll();
                      setAsps(freshData);
                    } catch (err) {
                      console.error("Refresh failed:", err);
                    } finally {
                      setTimeout(() => setIsRefreshing(false), 500);
                    }
                  }}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'Memperbarui...' : 'Refresh'}
                </button>
              </div>

              <div className="space-y-4">
                {asps.length > 0 ? asps.map(a => (
                  <div key={a.id} className={`p-6 border rounded-2xl space-y-4 transition-all ${a.status === 'new' ? 'border-primary bg-red-50/30' : 'border-gray-100'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-secondary">{a.subject}</h4>
                          {a.status === 'new' && <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">Baru</span>}
                        </div>
                        <p className="text-xs text-gray-500">
                          Dari: {a.isAnonymous ? 'Anonim' : `${a.nama} (${a.nim})`} • {new Date(a.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {a.status === 'new' ? (
                          <button 
                            onClick={() => aspirationService.updateStatus(a.id, 'read')}
                            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-green-600 transition-colors"
                            title="Tandai sudah dibaca"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        ) : (
                          <div className="p-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                        <button 
                          onClick={async () => {
                            if (confirm('Hapus aspirasi ini?')) {
                              try {
                                await aspirationService.delete(a.id);
                                alert('Aspirasi berhasil dihapus');
                              } catch (err) {
                                console.error(err);
                                alert('Gagal menghapus aspirasi. Periksa koneksi atau izin Anda.');
                              }
                            }
                          }}
                          className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-primary transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 bg-white/50 p-4 rounded-xl border border-gray-100 italic">
                      "{a.message}"
                    </p>
                  </div>
                )) : (
                  <div className="text-center py-20 text-gray-400">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>Belum ada aspirasi yang masuk.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'users' && isAuthorized && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Manajemen Admin</h2>
              <p className="text-sm text-gray-500">Daftar pengurus yang memiliki akses ke dashboard admin.</p>
              <div className="grid grid-cols-1 gap-4">
                {allUsers.map(u => (
                  <div key={u.uid} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img src={u.photoURL} className="w-12 h-12 rounded-full border-2 border-gray-100" alt="" />
                      <div>
                        <p className="font-bold text-secondary">{u.displayName}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            u.role === 'superadmin' ? 'bg-purple-100 text-purple-600' : 
                            u.role === 'admin' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {u.role}
                          </span>
                          {u.isApproved ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold uppercase">Approved</span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-bold uppercase">Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {u.email !== 'aahdan298@gmail.com' && isSuperAdmin && (
                      <div className="flex gap-2">
                        {!u.isApproved ? (
                          <button 
                            onClick={() => userService.updateRole(u.uid, 'admin', true)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all"
                          >
                            <UserCheck className="w-4 h-4" /> Approve
                          </button>
                        ) : (
                          <button 
                            onClick={() => userService.updateRole(u.uid, 'pending', false)}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-all"
                          >
                            <UserX className="w-4 h-4" /> Revoke
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            if(confirm('Hapus user ini?')) userService.deleteUser(u.uid);
                          }}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
