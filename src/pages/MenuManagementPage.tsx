import { useState } from 'react';
import { Plus, RefreshCw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { menuItems as initialItems, menuCategories } from '../data/menu';
import { MenuItem } from '../types';

const statusStyle = {
  in_stock:  { label: 'In Stock',  bg: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  sold_out:  { label: 'Sold Out',  bg: 'bg-red-100 text-red-600',    dot: 'bg-red-500'    },
  hidden:    { label: 'Hidden',    bg: 'bg-gray-100 text-gray-500',   dot: 'bg-gray-400'   },
};

const PAGE_SIZE = 10;

export default function MenuManagementPage() {
  const [items, setItems] = useState(initialItems);
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});

  const filtered = items.filter(i =>
    activeCategory === 'All Items' || i.category === activeCategory.replace('s', '')
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectItem(item: MenuItem) {
    setSelected(item);
    setEditForm({ name: item.name, category: item.category, price: item.price, description: item.description });
  }

  function saveEdit() {
    if (!selected) return;
    setItems(prev => prev.map(i => i.id === selected.id ? { ...i, ...editForm } : i));
    setSelected(null);
  }

  function toggleAvailable(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available, status: i.available ? 'sold_out' : 'in_stock' } : i));
  }

  return (
    <Layout topBarPlaceholder="Search menu items...">
      <div className="p-6 flex gap-5">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Menu Inventory</h1>
              <p className="text-gray-500 text-sm mt-0.5">Manage {items.filter(i => i.available).length} active items across {menuCategories.length - 1} categories</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-3.5 py-2 rounded-xl transition-colors">
                <RefreshCw size={14} />
                Bulk Availability
              </button>
              <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
                <Plus size={14} strokeWidth={2.5} />
                Add New Item
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
            {menuCategories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-full transition-colors border ${
                  activeCategory === cat
                    ? 'border-brand-500 text-brand-600 bg-brand-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-3 border-b border-gray-100">
              <span>Item Details</span>
              <span>Category</span>
              <span>Price</span>
              <span>Status</span>
              <span>Availability</span>
            </div>

            {pageItems.map((item, idx) => {
              const st = statusStyle[item.status];
              return (
                <div
                  key={item.id}
                  onClick={() => selectItem(item)}
                  className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center px-5 py-3.5 cursor-pointer transition-colors border-l-4 ${
                    selected?.id === item.id ? 'bg-orange-50 border-l-brand-500' : 'border-l-transparent hover:bg-gray-50'
                  } ${idx !== 0 ? 'border-t border-gray-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex w-fit px-2 py-0.5 rounded text-xs font-medium ${
                    item.category === 'Breakfast' ? 'bg-yellow-100 text-yellow-700' :
                    item.category === 'Main Course' ? 'bg-blue-100 text-blue-700' :
                    item.category === 'Dessert' ? 'bg-purple-100 text-purple-600' :
                    item.category === 'Beverage' ? 'bg-cyan-100 text-cyan-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{item.category}</span>
                  <span className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</span>
                  <div className={`flex items-center gap-1.5 ${st.bg} w-fit px-2 py-0.5 rounded-full text-xs font-medium`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {st.label}
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleAvailable(item.id); }}
                    className={`relative w-10 h-5 rounded-full transition-colors ${item.available ? 'bg-brand-500' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${item.available ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              );
            })}

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} items</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <span className="text-xs font-medium text-gray-600 px-1">{page} / {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: Edit item */}
        {selected && (
          <div className="w-[280px] flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-[76px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Update Item</h3>
                <button onClick={() => setSelected(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                  <X size={14} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Item Image</label>
                  <img src={selected.image} alt={selected.name} className="w-full h-32 object-cover rounded-xl" />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Name</label>
                  <input
                    value={editForm.name ?? ''}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Category</label>
                  <input
                    value={editForm.category ?? ''}
                    onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price ?? ''}
                    onChange={e => setEditForm(f => ({ ...f, price: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Description</label>
                  <textarea
                    value={editForm.description ?? ''}
                    onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <button onClick={saveEdit} className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  Save Changes
                </button>
                <button onClick={() => setSelected(null)} className="w-full border border-brand-200 text-brand-500 hover:bg-brand-50 font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
