import { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Plus, Send } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { dashboardStats } from '../data/dashboard';
import { useAuth } from '../context/AuthContext';
import { revenueService } from '../services/revenueService';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(dashboardStats);
  const [noteText, setNoteText] = useState('');
  const [quickActions, setQuickActions] = useState(stats.menuQuickActions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenueData() {
      if (user?.email) {
        const revenueData = await revenueService.getTodayRevenue(user.email);
        if (revenueData) {
          setStats(prev => ({
            ...prev,
            dailyRevenue: revenueData.totalRevenue,
            totalOrders: revenueData.totalOrders,
            averageOrderValue: revenueData.averageOrderValue,
            totalItemsCount: revenueData.totalItemsCount,
            cancelledOrders: revenueData.cancelledOrders,
            bestSellingItem: revenueData.bestSellingItem,
            bestSellingCategory: revenueData.bestSellingCategory,
            itemCounts: revenueData.itemCounts,
            subtotal: revenueData.totalRevenue * 0.85,
            serviceCharge: revenueData.totalRevenue * 0.075,
            gst: revenueData.totalRevenue * 0.075,
          }));
        }
        setLoading(false);
      }
    }
    fetchRevenueData();
  }, [user]);

  function toggleItem(id: string) {
    setQuickActions(prev => prev.map(a => a.id === id ? { ...a, available: !a.available } : a));
  }

  return (
    <Layout topBarPlaceholder="Search orders, menu, or staff...">
      <div className="p-6 space-y-5">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading revenue data...</div>
          </div>
        ) : (
          <>
        {/* Low stock alert */}
        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={16} className="text-orange-500 flex-shrink-0" />
            <div>
              <span className="text-orange-700 font-semibold text-sm">Low Stock Inventory Alerts</span>
              <span className="text-orange-600 text-sm ml-2">₹{stats.lowStockAlert.items.join(', ')}</span>
            </div>
          </div>
          <button className="text-brand-500 hover:text-brand-600 font-semibold text-sm whitespace-nowrap ml-4">
            Order Now
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Revenue card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Daily Revenue Snapshot</p>
                <div className="text-4xl font-bold text-brand-500">₹{stats.dailyRevenue.toLocaleString('en', { minimumFractionDigits: 2 })}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={13} className="text-green-500" />
                  <span className="text-green-600 text-xs font-medium">{stats.revenueChange}% increase from yesterday</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
                <Plus size={15} strokeWidth={2.5} />
                Add Entry
              </button>
            </div>

            <div className="border-t border-gray-100 pt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Orders', value: stats.totalOrders },
                { label: 'Avg Order Value', value: `₹${stats.averageOrderValue}` },
                { label: 'Total Items', value: stats.totalItemsCount },
                { label: 'Cancelled', value: stats.cancelledOrders },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-lg font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Best Selling Item</p>
                  <p className="text-sm font-semibold text-gray-800">{stats.bestSellingItem}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Best Selling Category</p>
                  <p className="text-sm font-semibold text-gray-800">{stats.bestSellingCategory}</p>
                </div>
              </div>
            </div>

            {/* <div className="border-t border-gray-100 pt-4 mt-4 grid grid-cols-3 gap-4">
              {[
                { label: 'Total Orders', value: String(stats.totalOrders) },
                { label: 'Avg Order Price', value: `₹${stats.averageOrderValue}` },
                { label: 'Cancelled Orders', value: String(stats.cancelledOrders) },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-lg font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div> */}
          </div>

          {/* Top selling */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Top Selling Today</h3>
            <div className="space-y-4">
              {stats.itemCounts && Object.entries(stats.itemCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([name, qty], index) => (
                <div key={name} className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg ${
                    index === 0 ? 'bg-brand-100 text-brand-600' : index === 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate capitalize">{name}</p>
                    <p className="text-xs text-gray-400">Sold today</p>
                  </div>
                  <span className="text-brand-500 font-bold text-sm">{qty} Sold</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Menu quick actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Menu Quick Actions</h3>
              <button className="text-brand-500 hover:text-brand-600 text-sm font-semibold">View Full Menu</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {/* Add new item tile */}
              <button className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-orange-200 bg-orange-50/50 hover:bg-orange-50 rounded-xl py-5 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors">
                  <Plus size={18} className="text-brand-500" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-700">Add New Item</p>
                  <p className="text-[10px] text-gray-400">Create a new menu entry</p>
                </div>
              </button>

              {quickActions.map(item => (
                <div key={item.id} className="relative flex flex-col items-center gap-2 bg-gray-50 rounded-xl py-4 px-2">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                  )}
                  <p className="text-xs font-semibold text-gray-700 text-center">{item.name}</p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center w-9 h-5 rounded-full p-[2px] transition-colors shrink-0 ${item.available ? 'bg-brand-500' : 'bg-gray-300'}`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${item.available ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className={`text-[10px] text-center ${item.available ? 'text-gray-400' : 'text-red-500'}`}>{item.status}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Staff notes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Staff Notes</h3>
              <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto">
              {stats.staffNotes.map(note => (
                <div key={note.id} className="flex gap-3">
                  {note.avatar ? (
                    <img src={note.avatar} alt={note.author} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-gray-600">{note.author[0]}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-semibold text-gray-800">{note.author}</span>
                      <span className="text-xs text-gray-400">({note.role})</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{note.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{note.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 mt-4">
              <input
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Type a team note..."
                className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
              />
              <button className="text-brand-500 hover:text-brand-600 transition-colors">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </Layout>
  );
}
