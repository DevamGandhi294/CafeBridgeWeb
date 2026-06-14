import { db } from '../firebase';
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

export interface FirebaseStaffMember {
  id: string; // e.g. "#ST-6808"
  name: string;
  email: string;
  phone: string;
  restaurantId: string;
  role: string;
  roleGroup: string;
  status: 'active' | 'pending';
  createdAt: any; // Firestore Timestamp
}

export const staffService = {
  async getStaff(restaurantEmail: string): Promise<(FirebaseStaffMember & { docId: string })[]> {
    try {
      const staffRef = collection(db, 'Restaurant', restaurantEmail, 'staff');
      const snapshot = await getDocs(staffRef);
      return snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() } as FirebaseStaffMember & { docId: string }));
    } catch (error) {
      console.error('Error fetching staff:', error);
      return [];
    }
  },

  async approveStaff(restaurantEmail: string, staffNameDocId: string): Promise<void> {
    try {
      const staffRef = doc(db, 'Restaurant', restaurantEmail, 'staff', staffNameDocId);
      await updateDoc(staffRef, { status: 'active' });
    } catch (error) {
      console.error('Error approving staff:', error);
    }
  },

  async rejectStaff(restaurantEmail: string, staffNameDocId: string): Promise<void> {
    try {
      const staffRef = doc(db, 'Restaurant', restaurantEmail, 'staff', staffNameDocId);
      await deleteDoc(staffRef);
    } catch (error) {
      console.error('Error rejecting staff:', error);
    }
  },

  async removeStaff(restaurantEmail: string, staffNameDocId: string): Promise<void> {
    try {
      const staffRef = doc(db, 'Restaurant', restaurantEmail, 'staff', staffNameDocId);
      await deleteDoc(staffRef);
    } catch (error) {
      console.error('Error removing staff:', error);
    }
  }
};
