import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export interface RevenueData {
  averageOrderValue: number;
  bestSellingCategory: string;
  bestSellingItem: string;
  cancelledOrders: number;
  itemCounts: Record<string, number>;
  totalItemsCount: number;
  totalOrders: number;
  totalRevenue: number;
}

export const revenueService = {
  async getRevenueByEmailAndDate(email: string, date: string): Promise<RevenueData | null> {
    try {
      const revenueDoc = await getDoc(doc(db, 'Restaurant', email, 'revenue', date));
      if (!revenueDoc.exists()) return null;
      
      return revenueDoc.data() as RevenueData;
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      return null;
    }
  },

  async getTodayRevenue(email: string): Promise<RevenueData | null> {
    const today = new Date().toISOString().split('T')[0];
    const formattedDate = today.replace(/-/g, '-');
    return this.getRevenueByEmailAndDate(email, formattedDate);
  },

  async getRecentRevenue(email: string, days: number = 7): Promise<RevenueData[]> {
    try {
      const revenueCollection = collection(db, 'Restaurant', email, 'revenue');
      const q = query(revenueCollection, orderBy('__name__', 'desc'), limit(days));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => doc.data() as RevenueData);
    } catch (error) {
      console.error('Error fetching recent revenue data:', error);
      return [];
    }
  },
};
