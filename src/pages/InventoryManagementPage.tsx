import { Download, RefreshCw, AlertTriangle, ChevronLeft, ChevronRight, Package, ShoppingCart, ArrowUpCircle, Settings2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { inventoryItems, recentActivities, storageEfficiency } from '../data/inventory';

const statusStyle = {
  in_stock:     { label: 'In Stock',     bg: 'bg-green-100 text-green-700', dot: 'bg-green-500'  },
  low_stock:    { label: 'Low Stock',    bg: 'bg-red-100 text-red-600',     dot: 'bg-red-500'    },
  out_of_stock: { label: 'Out of Stock', bg: 'bg-gray-200 text-gray-500',   dot: 'bg-gray-400'   },
};

const activityIcon = {
  stock_in:   <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center"><ArrowUpCircle size={14} className="text-green-600" /></span>,
  stock_out:  <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center"><ShoppingCart size={14} className="text-red-500" /></span>,
  adjustment: <span className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center"><Settings2 size={14} className="text-orange-500" /></span>,
  system:     <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center"><Package size={14} className="text-blue-500" /></span>,
};

const totalValuation = inventoryItems.reduce((sum, i) => sum + i.inStock * 10, 0);
const activeAlerts = inventoryItems.filter(i => i.status !== 'in_stock').length;

export default function InventoryManagementPage() {
  return (
    <Layout topBarPlaceholder="Search inventory items...">
      <div className="p-6 flex gap-5">
        {/* Main */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
              <div className="flex items-center gap-6 mt-2">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Total Valuation</p>
                  <p className="text-xl font-bold text-gray-900">${totalValuation.toLocaleString('en', { minimumFractionDigits: 2 })}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Active Alerts</p>
                  <p className="text-xl font-bold text-brand-500">{activeAlerts} Items</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-3.5 py-2 rounded-xl transition-colors">
                <Download size={14} />
                Export Report
              </button>
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-3.5 py-2 rounded-xl transition-colors">
                <RefreshCw size={14} />
                Bulk Update
              </button>
              <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
                + Add New Stock
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr] text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3 border-b border-gray-100">
              <span>Item Name</span>
              <span>Category</span>
              <span>In Stock</span>
              <span>Unit</span>
              <span>Reorder Point</span>
            </div>
            {inventoryItems.map((item, idx) => {
              const st = statusStyle[item.status];
              const isLow = item.status === 'low_stock' || item.status === 'out_of_stock';
              return (
                <div
                  key={item.id}
                  className={`grid grid-cols-[2.5fr_1fr_1fr_1fr_1fr] items-center px-5 py-3.5 ${idx !== 0 ? 'border-t border-gray-50' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                  <span className={`text-sm font-semibold ${isLow ? 'text-red-500' : 'text-gray-800'}`}>
                    {item.inStock.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-400">{item.unit}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{item.reorderPoint.toFixed(1)}</span>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${st.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label.split(' ')[0].toUpperCase()}
                      {item.status !== 'out_of_stock' && <span>{item.status === 'low_stock' ? '' : ''}</span>}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Showing 1–{inventoryItems.length} of {inventoryItems.length} items</span>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <span className="text-xs font-medium text-gray-600 px-1">1 / 1</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Low stock alerts */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-orange-500" />
                  <h3 className="font-bold text-gray-900">Low Stock Alerts</h3>
                </div>
                <button className="text-brand-500 hover:text-brand-600 text-xs font-semibold uppercase tracking-wide">View All</button>
              </div>
              <div className="space-y-2">
                {inventoryItems.filter(i => i.status !== 'in_stock').map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.inStock}/{item.reorderPoint} {item.unit}</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-wide border border-brand-200 text-brand-500 hover:bg-brand-50 px-2.5 py-1 rounded-lg transition-colors">
                      Restock
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage efficiency */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Storage Efficiency</h3>
              <div className="space-y-4">
                {storageEfficiency.map(s => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-600">{s.name}</span>
                      <span className={`text-sm font-semibold ${s.percent >= 80 ? 'text-red-500' : 'text-gray-700'}`}>{s.percent}% Full</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity */}
        <div className="w-[260px] flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-[76px]">
            <div className="mb-4">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>
              <p className="text-xs text-gray-400 mt-0.5">Last 24 hours of stock movements</p>
            </div>
            <div className="space-y-4">
              {recentActivities.map(act => (
                <div key={act.id} className="flex gap-3">
                  {activityIcon[act.type]}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{act.title}</p>
                    <p className="text-xs text-gray-400">{act.description}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-gray-400 uppercase font-medium">{act.user}</span>
                      <span className="text-[10px] text-gray-300">• {act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-xl transition-colors">
              View Full Audit Log
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
