import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export interface FirebaseTable {
  tableId: string;
  isAvailable: boolean;
  isMerge: boolean;
  currentOrderId: string;
  time: string;
}

export interface FirebaseTableCategory {
  category: string;
  tables: FirebaseTable[];
}

export const tableService = {
  async getTables(restaurantEmail: string): Promise<FirebaseTableCategory[]> {
    try {
      const tablesRef = collection(db, 'Restaurant', restaurantEmail, 'tables');
      const snapshot = await getDocs(tablesRef);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          category: doc.id,
          tables: data.tables || [],
        };
      });
    } catch (error) {
      console.error('Error fetching tables:', error);
      return [];
    }
  }
};
