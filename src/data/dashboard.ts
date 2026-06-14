import { DashboardStats } from '../types';

export const dashboardStats: DashboardStats = {
  dailyRevenue: 1064,
  subtotal: 902,
  serviceCharge: 81,
  gst: 81,
  revenueChange: 12,
  totalOrders: 38,
  averageOrderValue: 28,
  totalItemsCount: 87,
  cancelledOrders: 1,
  bestSellingItem: 'shabji',
  bestSellingCategory: 'Main Course',
  itemCounts: {
    lassi: 15,
    roti: 30,
    shabji: 42,
  },
  topSelling: [],
  staffNotes: [
    {
      id: 'n1',
      author: 'Sarah',
      role: 'Head Barista',
      message: 'Espresso machine group head 2 is leaking slightly. Called service, they\'re coming at 4 PM.',
      time: '10:24 AM',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=40&h=40&fit=crop&facepad=2',
    },
    {
      id: 'n2',
      author: 'Marcus',
      role: 'Floor Mgr',
      message: 'VIP reservation for 8 people at table 4 today at 1 PM. Prepped the corner area.',
      time: 'Yesterday, 9:15 PM',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&facepad=2',
    },
  ],
  menuQuickActions: [
    { id: 'qa1', name: 'Cold Brew', status: 'Active on Main Menu', available: true, image: 'https://images.pexels.com/photos/2615323/pexels-photo-2615323.jpeg?w=60&h=60&fit=crop' },
    { id: 'qa2', name: 'Almond Croissant', status: 'Sold Out / Hidden', available: false, image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?w=60&h=60&fit=crop' },
  ],
  lowStockAlert: {
    items: ['Oat Milk (4 left)', 'Artisanal Coffee Beans (2kg left)'],
  },
};
