/**
 * Menu service — fetches menu data from Firebase Firestore.
 * Firestore structure: Restaurant/{email}/menu/{categoryName}
 * Each category document contains an `items` array of menu items.
 */
import { MenuItem } from '../types';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, getDoc, setDoc, arrayUnion } from 'firebase/firestore';

export interface FirebaseMenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  option: string;
  price: number;
}

function mapFirebaseItem(item: FirebaseMenuItem, category: string): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description || '',
    category,
    price: item.price,
    status: item.isAvailable ? 'in_stock' : 'sold_out',
    available: item.isAvailable,
    image: item.imageUrl || '',
    option: item.option || '',
  };
}

export const menuService = {
  async getAll(email: string): Promise<{ items: MenuItem[]; categories: string[] }> {
    try {
      const menuCollection = collection(db, 'Restaurant', email, 'menu');
      const snapshot = await getDocs(menuCollection);

      const items: MenuItem[] = [];
      const categories: string[] = [];

      snapshot.docs.forEach(docSnap => {
        const categoryName = docSnap.id; // e.g. "Main Course", "Starters"
        categories.push(categoryName);

        const data = docSnap.data();
        const categoryItems: FirebaseMenuItem[] = data.items || [];

        categoryItems.forEach(item => {
          items.push(mapFirebaseItem(item, categoryName));
        });
      });

      return { items, categories };
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return { items: [], categories: [] };
    }
  },

  async toggleAvailability(email: string, category: string, itemId: string, isAvailable: boolean): Promise<void> {
    try {
      const categoryDocRef = doc(db, 'Restaurant', email, 'menu', category);
      const categoryDoc = await getDoc(categoryDocRef);

      if (!categoryDoc.exists()) return;

      const data = categoryDoc.data();
      const items: FirebaseMenuItem[] = data.items || [];

      const updatedItems = items.map(item =>
        item.id === itemId ? { ...item, isAvailable } : item
      );

      await updateDoc(categoryDocRef, { items: updatedItems });
    } catch (error) {
      console.error('Error toggling item availability:', error);
    }
  },

  async updateItem(email: string, category: string, itemId: string, patch: Partial<FirebaseMenuItem>): Promise<void> {
    try {
      const categoryDocRef = doc(db, 'Restaurant', email, 'menu', category);
      const categoryDoc = await getDoc(categoryDocRef);

      if (!categoryDoc.exists()) return;

      const data = categoryDoc.data();
      const items: FirebaseMenuItem[] = data.items || [];

      const updatedItems = items.map(item =>
        item.id === itemId ? { ...item, ...patch } : item
      );

      await updateDoc(categoryDocRef, { items: updatedItems });
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  },

  async addItem(email: string, category: string, newItem: FirebaseMenuItem): Promise<MenuItem> {
    try {
      const categoryDocRef = doc(db, 'Restaurant', email, 'menu', category);
      const categoryDoc = await getDoc(categoryDocRef);

      if (categoryDoc.exists()) {
        // Category exists — append to items array
        await updateDoc(categoryDocRef, {
          items: arrayUnion(newItem),
        });
      } else {
        // New category — create document with items array
        await setDoc(categoryDocRef, {
          items: [newItem],
        });
      }

      return mapFirebaseItem(newItem, category);
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  },
};
