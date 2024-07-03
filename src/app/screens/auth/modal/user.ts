export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL: string;
  emailVerified: boolean;
//   role: 'farmer' | 'broker' | 'admin';
}
