export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
  avatar?: string;
  restaurantName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  status: 'in_stock' | 'sold_out' | 'hidden';
  available: boolean;
  image: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  section: string;
  guests?: number;
  reservation?: string;
  server?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  inStock: number;
  unit: string;
  reorderPoint: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastUpdated: string;
}

export interface StaffMember {
  id: string;
  staffId: string;
  name: string;
  email: string;
  role: string;
  roleCategory: 'kitchen' | 'front_of_house' | 'management';
  status: 'active' | 'on_break' | 'off_duty';
  avatar?: string;
  joinedAt: string;
}

export interface StaffRequest {
  id: string;
  name: string;
  role: string;
  joinedAgo: string;
  avatar?: string;
}

export interface RecentActivity {
  id: string;
  type: 'stock_in' | 'stock_out' | 'adjustment' | 'system';
  title: string;
  description: string;
  user: string;
  time: string;
  avatar?: string;
}

export interface DashboardStats {
  dailyRevenue: number;
  subtotal: number;
  serviceCharge: number;
  gst: number;
  revenueChange: number;
  topSelling: { name: string; orders: number; revenue: number; image: string }[];
  staffNotes: { id: string; author: string; role: string; message: string; time: string; avatar?: string }[];
  menuQuickActions: { id: string; name: string; status: string; available: boolean; image?: string }[];
  lowStockAlert: { items: string[] };
}
