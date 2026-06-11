/**
 * Inventory service — swap implementation for Firebase Firestore when ready.
 */
import { InventoryItem } from '../types';
import { inventoryItems as _items } from '../data/inventory';

let store = [..._items];

export const inventoryService = {
  async getAll(): Promise<InventoryItem[]> {
    // TODO: return getDocs(collection(db, 'inventory'))
    return [...store];
  },

  async update(id: string, patch: Partial<InventoryItem>): Promise<void> {
    // TODO: updateDoc(doc(db, 'inventory', id), patch)
    store = store.map(i => i.id === id ? { ...i, ...patch } : i);
  },
};
