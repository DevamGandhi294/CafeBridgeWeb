import { InventoryItem, RecentActivity } from '../types';

export const inventoryItems: InventoryItem[] = [
  { id: 'i1', name: 'Artisan Coffee Beans (Kenya)', category: 'Dry Goods', inStock: 85.0, unit: 'kg', reorderPoint: 20.0, status: 'in_stock', lastUpdated: '2024-10-02' },
  { id: 'i2', name: 'Full Cream Milk (Gallons)', category: 'Dairy', inStock: 12.0, unit: 'ltr', reorderPoint: 15.0, status: 'low_stock', lastUpdated: '2024-10-02' },
  { id: 'i3', name: 'Biodegradable Straws', category: 'Supplies', inStock: 0, unit: 'pcs', reorderPoint: 500, status: 'out_of_stock', lastUpdated: '2024-10-01' },
  { id: 'i4', name: 'Oat Milk', category: 'Dairy', inStock: 4, unit: 'ltr', reorderPoint: 10, status: 'low_stock', lastUpdated: '2024-10-02' },
  { id: 'i5', name: 'Avocado Case', category: 'Produce', inStock: 24, unit: 'pcs', reorderPoint: 12, status: 'in_stock', lastUpdated: '2024-10-02' },
  { id: 'i6', name: 'Sourdough Bread Loaves', category: 'Bakery', inStock: 18, unit: 'loaves', reorderPoint: 8, status: 'in_stock', lastUpdated: '2024-10-02' },
  { id: 'i7', name: 'Wagyu Beef Patties', category: 'Meat', inStock: 45, unit: 'pcs', reorderPoint: 20, status: 'in_stock', lastUpdated: '2024-10-02' },
  { id: 'i8', name: 'Takeout Containers (M)', category: 'Supplies', inStock: 45, unit: 'pcs', reorderPoint: 500, status: 'low_stock', lastUpdated: '2024-10-01' },
  { id: 'i9', name: 'Atlantic Salmon', category: 'Seafood', inStock: 12, unit: 'kg', reorderPoint: 5, status: 'in_stock', lastUpdated: '2024-10-02' },
  { id: 'i10', name: 'Dark Chocolate (70%)', category: 'Dry Goods', inStock: 8, unit: 'kg', reorderPoint: 3, status: 'in_stock', lastUpdated: '2024-10-01' },
  { id: 'i11', name: 'Vanilla Extract', category: 'Dry Goods', inStock: 2.5, unit: 'ltr', reorderPoint: 1, status: 'in_stock', lastUpdated: '2024-10-01' },
  { id: 'i12', name: 'Truffle Oil', category: 'Dry Goods', inStock: 1.2, unit: 'ltr', reorderPoint: 0.5, status: 'in_stock', lastUpdated: '2024-10-01' },
];

export const recentActivities: RecentActivity[] = [
  { id: 'a1', type: 'stock_in', title: 'Stock In: Coffee Beans', description: '+50.0kg added to inventory', user: 'James Miller', time: '10:45 AM' },
  { id: 'a2', type: 'stock_out', title: 'Stock Out: Whole Milk', description: '-12.0L removed for production', user: 'Elena Ross', time: '09:12 AM' },
  { id: 'a3', type: 'adjustment', title: 'Level Adjustment', description: 'Avocado Case: Stock re-counted', user: 'Manager', time: '08:30 AM' },
  { id: 'a4', type: 'system', title: 'End of Day Inventory', description: 'Daily reconciliation completed', user: 'System', time: 'Yesterday' },
];

export const storageEfficiency = [
  { name: 'Cold Storage (Fridge A)', percent: 92, color: '#ef4444' },
  { name: 'Dry Storage', percent: 45, color: '#22c55e' },
  { name: 'Freezer', percent: 68, color: '#16a34a' },
];
