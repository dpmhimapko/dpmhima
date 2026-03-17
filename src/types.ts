export interface News {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

export interface StaffBest {
  id: string;
  month: string;
  division: string;
  name: string;
  type: 'staff' | 'chair';
  imageUrl: string;
}

export interface Member {
  name: string;
  role: string;
  photoUrl?: string;
  bio?: string;
  nim?: string;
}

export interface Organization {
  id: string;
  divisionName: string;
  groupPhoto: string;
  members: Member[];
}

export interface Aspiration {
  id: string;
  nama: string;
  nim: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'archived';
  isAnonymous?: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'superadmin' | 'pending';
  isApproved: boolean;
  createdAt: string;
}
