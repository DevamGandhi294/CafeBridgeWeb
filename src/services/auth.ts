/**
 * Auth service — swap the implementation block for Firebase Auth when ready.
 * Shape: signIn, signUp, signOut all return Promise<User | null>.
 */
import { User } from '../types';

const DUMMY_USERS: (User & { password: string })[] = [
  {
    id: 'u1',
    name: 'Alex Mercer',
    email: 'admin@cafebridge.com',
    password: 'password123',
    role: 'owner',
    restaurantName: 'Cafe Bridge Central',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=40&h=40&fit=crop&facepad=2',
  },
  {
    id: 'u2',
    name: 'Sarah Jenkins',
    email: 'manager@cafebridge.com',
    password: 'password123',
    role: 'manager',
    restaurantName: 'Cafe Bridge Central',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=40&h=40&fit=crop&facepad=2',
  },
];

export const authService = {
  async signIn(email: string, password: string): Promise<User | null> {
    // TODO: Replace with Firebase signInWithEmailAndPassword
    const found = DUMMY_USERS.find(u => u.email === email && u.password === password);
    if (!found) return null;
    const { password: _, ...user } = found;
    return user;
  },

  async signUp(name: string, email: string, password: string, restaurantName: string): Promise<User | null> {
    // TODO: Replace with Firebase createUserWithEmailAndPassword
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role: 'owner',
      restaurantName,
    };
    return newUser;
  },

  async signOut(): Promise<void> {
    // TODO: Replace with Firebase signOut
  },
};
