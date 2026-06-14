/**
 * Auth service using Firebase Auth and Firestore
 */
import { User } from '../types';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const authService = {
  async signIn(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'Restaurant', userCredential.user.email!));
      
      if (!userDoc.exists()) return null;
      
      const userData = userDoc.data();
      return {
        id: userCredential.user.uid,
        email: userData.email,
        name: userData.name,
        role: 'owner',
        restaurantName: userData.businessName,
        address: userData.address,
        phone: userData.phone,
        gst: userData.gst,
        gstPercentage: userData.gstPercentage,
        subscription: userData.subscription,
        code: userData.code,
        createdDate: userData.createdDate,
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return null;
    }
  },

  async signUp(
    name: string,
    email: string,
    password: string,
    restaurantName: string,
    address: string,
    phone: string,
    gst: string,
    gstPercentage: number
  ): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const code = `CAFE${Math.floor(1000 + Math.random() * 9000)}`;
      
      const userData = {
        name,
        email,
        businessName: restaurantName,
        address,
        phone,
        gst,
        gstPercentage,
        subscription: 'Free',
        code,
        password,
        createdDate: serverTimestamp(),
      };
      
      await setDoc(doc(db, 'Restaurant', email), userData);
      
      return {
        id: userCredential.user.uid,
        email,
        name,
        role: 'owner',
        restaurantName,
        address,
        phone,
        gst,
        gstPercentage,
        subscription: 'Free',
        code,
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return null;
    }
  },

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  },

  async updateProfile(email: string, updates: Partial<User>): Promise<boolean> {
    try {
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.restaurantName) dbUpdates.businessName = updates.restaurantName;
      if (updates.address) dbUpdates.address = updates.address;
      if (updates.phone) dbUpdates.phone = updates.phone;
      if (updates.gst) dbUpdates.gst = updates.gst;

      await updateDoc(doc(db, 'Restaurant', email), dbUpdates);
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  }
};
