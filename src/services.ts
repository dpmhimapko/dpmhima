import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { News, StaffBest, Organization, Aspiration } from './types';

// Connection test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.error("Firebase offline. Check config.");
    }
  }
}
testConnection();

export const newsService = {
  subscribe: (callback: (news: News[]) => void) => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as News)));
    });
  },
  add: (news: Omit<News, 'id'>) => addDoc(collection(db, 'news'), news),
  update: (id: string, news: Partial<News>) => updateDoc(doc(db, 'news', id), news),
  delete: (id: string) => deleteDoc(doc(db, 'news', id))
};

export const staffService = {
  subscribe: (callback: (staff: StaffBest[]) => void) => {
    return onSnapshot(collection(db, 'staff_best'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as StaffBest)));
    });
  },
  add: (staff: Omit<StaffBest, 'id'>) => addDoc(collection(db, 'staff_best'), staff),
  delete: (id: string) => deleteDoc(doc(db, 'staff_best', id))
};

export const orgService = {
  subscribe: (callback: (orgs: Organization[]) => void) => {
    return onSnapshot(collection(db, 'organization'), (snapshot) => {
      callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Organization)));
    });
  },
  add: (org: Omit<Organization, 'id'>) => addDoc(collection(db, 'organization'), org),
  update: (id: string, org: Partial<Organization>) => updateDoc(doc(db, 'organization', id), org),
  delete: (id: string) => deleteDoc(doc(db, 'organization', id))
};

export const aspirationService = {
  subscribe: (callback: (asps: Aspiration[]) => void) => {
    const q = query(collection(db, 'aspirations'), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Aspiration));
      callback(data);
    }, (error) => {
      console.error("Aspiration subscribe error:", error);
    });
  },
  add: async (asp: Omit<Aspiration, 'id'>) => {
    // 1. Save to Firestore FIRST (for Admin)
    const docRef = await addDoc(collection(db, 'aspirations'), asp);

    // 2. Submit to Google Form (Background)
    const formData = new FormData();
    formData.append('entry.1716082016', asp.nama);
    formData.append('entry.625953499', asp.nim);
    formData.append('entry.1297363755', asp.subject);
    formData.append('entry.2146318381', asp.message);

    fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSeVUr-FDak18xsM4PF3XFZXZsnM1eljxsLYVNlW59OpcMGmZg/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).catch(e => console.error("Google Form submission failed", e));

    return docRef;
  },
  getAll: async () => {
    const q = query(collection(db, 'aspirations'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Aspiration));
  },
  delete: (id: string) => deleteDoc(doc(db, 'aspirations', id)),
  updateStatus: (id: string, status: Aspiration['status']) => updateDoc(doc(db, 'aspirations', id), { status })
};
