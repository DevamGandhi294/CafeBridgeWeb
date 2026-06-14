/**
 * Suggestions service — manage suggestions stored in Firebase Firestore
 * Firestore structure: suggestions/{suggestionId} (Top-level collection - common to all restaurants)
 */
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, where } from 'firebase/firestore';

export interface FirebaseSuggestion {
  id: string;
  text: string;
  author: string;
  createdBy: string;
  createdAt: any; // Firestore Timestamp
}

export interface Suggestion {
  id: string;
  text: string;
  author: string;
  date: string;
}

function mapFirebaseSuggestion(data: any, docId: string): Suggestion {
  const date = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
  return {
    id: docId,
    text: data.text,
    author: data.author,
    date: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
  };
}

export const suggestionsService = {
  async getSuggestions(restaurantEmail: string): Promise<Suggestion[]> {
    try {
      const suggestionsRef = collection(db, 'suggestions');
      const q = query(suggestionsRef, where('createdBy', '==', restaurantEmail));
      const snapshot = await getDocs(q);
      
      return snapshot.docs
        .map(doc => mapFirebaseSuggestion(doc.data(), doc.id))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Newest first
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  },

  async addSuggestion(restaurantEmail: string, text: string, author: string): Promise<Suggestion | null> {
    try {
      const suggestionsRef = collection(db, 'suggestions');
      
      const docRef = await addDoc(suggestionsRef, {
        text,
        author,
        createdBy: restaurantEmail,
        createdAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        text,
        author,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
    } catch (error) {
      console.error('Error adding suggestion:', error);
      return null;
    }
  },

  async deleteSuggestion(suggestionId: string): Promise<void> {
    try {
      const suggestionRef = doc(db, 'suggestions', suggestionId);
      await deleteDoc(suggestionRef);
    } catch (error) {
      console.error('Error deleting suggestion:', error);
    }
  },
};

