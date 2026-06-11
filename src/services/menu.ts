/**
 * Menu service — swap implementation for Firebase Firestore when ready.
 * All methods return Promises to mirror the async Firestore API.
 */
import { MenuItem } from '../types';
import { menuItems as _menuItems } from '../data/menu';

let store = [..._menuItems];

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    // TODO: return getDocs(collection(db, 'menuItems'))
    return [...store];
  },

  async update(id: string, patch: Partial<MenuItem>): Promise<void> {
    // TODO: updateDoc(doc(db, 'menuItems', id), patch)
    store = store.map(item => item.id === id ? { ...item, ...patch } : item);
  },

  async add(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    // TODO: addDoc(collection(db, 'menuItems'), item)
    const newItem = { ...item, id: `m${Date.now()}` };
    store.push(newItem);
    return newItem;
  },

  async remove(id: string): Promise<void> {
    // TODO: deleteDoc(doc(db, 'menuItems', id))
    store = store.filter(item => item.id !== id);
  },
};
