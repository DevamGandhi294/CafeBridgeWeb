import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, restaurantName: string, address: string, phone: string, gst: string, gstPercentage: number) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (result) { setUser(result); return true; }
    return false;
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string, restaurantName: string, address: string, phone: string, gst: string, gstPercentage: number) => {
    const result = await authService.signUp(name, email, password, restaurantName, address, phone, gst, gstPercentage);
    if (result) { setUser(result); return true; }
    return false;
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user?.email) return false;
    const success = await authService.updateProfile(user.email, updates);
    if (success) {
      setUser(prev => prev ? { ...prev, ...updates } : null);
      return true;
    }
    return false;
  }, [user]);

  const signOut = useCallback(() => {
    authService.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, updateProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
