import { useState, useEffect } from 'react';
import { Plus, RefreshCw, ChevronLeft, ChevronRight, X, Image, Tag, DollarSign, FileText, Settings, Upload } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { menuService, FirebaseMenuItem } from '../services/menu';
import { MenuItem } from '../types';

const statusStyle = {
  in_stock:  { label: 'In Stock',  bg: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  sold_out:  { label: 'Sold Out',  bg: 'bg-red-100 text-red-600',    dot: 'bg-red-500'    },
  hidden:    { label: 'Hidden',    bg: 'bg-gray-100 text-gray-500',   dot: 'bg-gray-400'   },
};

const PAGE_SIZE = 10;

interface AddItemForm {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  option: string;
  isAvailable: boolean;
  category: string;
  newCategory: string;
  useNewCategory: boolean;
}

const emptyAddForm: AddItemForm = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  option: '',
  isAvailable: true,
  category: '',
  newCategory: '',
  useNewCategory: false,
};

export default function MenuManagementPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  const [loading, setLoading] = useState(true);

  // Add item modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<AddItemForm>(emptyAddForm);
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      if (user?.email) {
        setLoading(true);
        const result = await menuService.getAll(user.email);
        setItems(result.items);
        setCategories(result.categories);
        setLoading(false);
      }
    }
    fetchMenu();
  }, [user]);

  const allCategories = ['All Items', ...categories];

  const filtered = items.filter(i =>
    activeCategory === 'All Items' || i.category === activeCategory
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectItem(item: MenuItem) {
    setSelected(item);
    setEditForm({ name: item.name, category: item.category, price: item.price, description: item.description });
  }

  async function saveEdit() {
    if (!selected || !user?.email) return;
    const updatedItem = { ...selected, ...editForm };
    setItems(prev => prev.map(i => i.id === selected.id ? updatedItem : i));

    await menuService.updateItem(user.email, selected.category, selected.id, {
      name: editForm.name,
      description: editForm.description,
      price: editForm.price,
    });
    setSelected(null);
  }

  async function toggleAvailable(id: string) {
    if (!user?.email) return;
    const item = items.find(i => i.id === id);
    if (!item) return;

    const newAvailable = !item.available;
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, available: newAvailable, status: newAvailable ? 'in_stock' : 'sold_out' } : i
    ));

    await menuService.toggleAvailability(user.email, item.category, id, newAvailable);
  }

  function openAddModal() {
    setAddForm({ ...emptyAddForm, category: categories[0] || '' });
    setShowAddModal(true);
  }

  function closeAddModal() {
    setShowAddModal(false);
    setAddForm(emptyAddForm);
  }

  async function handleAddItem() {
    if (!user?.email) return;

    const category = addForm.useNewCategory ? addForm.newCategory.trim() : addForm.category;
    if (!category || !addForm.name.trim() || !addForm.price) return;

    setAddLoading(true);

    const newFirebaseItem: FirebaseMenuItem = {
      id: `item_${Date.now()}`,
      name: addForm.name.trim(),
      description: addForm.description.trim(),
      imageUrl: addForm.imageUrl.trim(),
      isAvailable: addForm.isAvailable,
      option: addForm.option.trim(),
      price: parseFloat(addForm.price),
    };

    try {
      const newMenuItem = await menuService.addItem(user.email, category, newFirebaseItem);
      setItems(prev => [...prev, newMenuItem]);

      // If new category was created, add it to the list
      if (addForm.useNewCategory && !categories.includes(category)) {
        setCategories(prev => [...prev, category]);
      }

      closeAddModal();
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      setAddLoading(false);
    }
  }

  const isAddFormValid = addForm.name.trim() &&
    addForm.price &&
    parseFloat(addForm.price) > 0 &&
    (addForm.useNewCategory ? addForm.newCategory.trim() : addForm.category);

  return (
    <Layout topBarPlaceholder="Search menu items...">
      <div className="p-6 flex gap-5">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Menu Inventory</h1>
              <p className="text-gray-500 text-sm mt-0.5">Manage {items.filter(i => i.available).length} active items across {categories.length} categories</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-3.5 py-2 rounded-xl transition-colors">
                <RefreshCw size={14} />
                Bulk Availability
              </button>
              <button
                onClick={openAddModal}
                className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
              >
                <Plus size={14} strokeWidth={2.5} />
                Add New Item
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
            {allCategories.map(cat => (
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

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500 text-sm">Loading menu items...</div>
              </div>
            ) : pageItems.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-400 text-sm">No menu items found</div>
              </div>
            ) : (
              pageItems.map((item, idx) => {
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
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-600 font-bold text-sm">{item.name.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{item.description}</p>
                      </div>
                    </div>
                    <span className={`inline-flex w-fit px-2 py-0.5 rounded text-xs font-medium ${
                      item.category === 'Breakfast' ? 'bg-yellow-100 text-yellow-700' :
                      item.category === 'Main Course' ? 'bg-blue-100 text-blue-700' :
                      item.category === 'Dessert' ? 'bg-purple-100 text-purple-600' :
                      item.category === 'Beverage' || item.category === 'Beverages' ? 'bg-cyan-100 text-cyan-700' :
                      item.category === 'Starters' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{item.category}</span>
                    <span className="text-sm font-semibold text-gray-800">₹{item.price.toFixed(2)}</span>
                    <div className={`flex items-center gap-1.5 ${st.bg} w-fit px-2 py-0.5 rounded-full text-xs font-medium`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                      {st.label}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); toggleAvailable(item.id); }}
                      className={`flex items-center w-10 h-5 rounded-full p-[2px] transition-colors shrink-0 ${item.available ? 'bg-brand-500' : 'bg-gray-300'}`}
                    >
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${item.available ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                );
              })
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} items</span>
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
                  {selected.image ? (
                    <img src={selected.image} alt={selected.name} className="w-full h-32 object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
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
                  <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Price (₹)</label>
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

                {selected.option && (
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">Options</label>
                    <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">{selected.option}</p>
                  </div>
                )}
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

      {/* ──── Add New Item Modal ──── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAddModal} />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Add New Menu Item</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details to add a new item to your menu</p>
              </div>
              <button
                onClick={closeAddModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Form body */}
            <div className="px-6 py-5 space-y-4">

              {/* Item Name */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  <Tag size={12} />
                  Item Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={addForm.name}
                  onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Paneer Tikka"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  <FileText size={12} />
                  Description
                </label>
                <textarea
                  value={addForm.description}
                  onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Soft paneer cubes marinated in Indian spices..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all resize-none"
                />
              </div>

              {/* Price & Availability row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    <DollarSign size={12} />
                    Price (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={addForm.price}
                    onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="250"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    <Settings size={12} />
                    Availability
                  </label>
                  <button
                    type="button"
                    onClick={() => setAddForm(f => ({ ...f, isAvailable: !f.isAvailable }))}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                      addForm.isAvailable
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-600'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${addForm.isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
                    {addForm.isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  <Image size={12} />
                  Image URL
                </label>
                <input
                  value={addForm.imageUrl}
                  onChange={e => setAddForm(f => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
                />
                {addForm.imageUrl && (
                  <div className="mt-2 relative rounded-xl overflow-hidden h-32 bg-gray-100">
                    <img
                      src={addForm.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              {/* Options */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  <Settings size={12} />
                  Options
                </label>
                <input
                  value={addForm.option}
                  onChange={e => setAddForm(f => ({ ...f, option: e.target.value }))}
                  placeholder="e.g. Extra Paneer (+₹50), Spicy, Medium Spicy"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  <Upload size={12} />
                  Category <span className="text-red-400">*</span>
                </label>

                {/* Toggle: existing vs new */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setAddForm(f => ({ ...f, useNewCategory: false }))}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      !addForm.useNewCategory
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    Existing Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddForm(f => ({ ...f, useNewCategory: true }))}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1 ${
                      addForm.useNewCategory
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Plus size={11} />
                    New Category
                  </button>
                </div>

                {addForm.useNewCategory ? (
                  <input
                    value={addForm.newCategory}
                    onChange={e => setAddForm(f => ({ ...f, newCategory: e.target.value }))}
                    placeholder="e.g. Desserts, Beverages, Starters..."
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setAddForm(f => ({ ...f, category: cat }))}
                        className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all text-left ${
                          addForm.category === cat
                            ? 'border-brand-500 bg-brand-50 text-brand-600 ring-2 ring-brand-100'
                            : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                    {categories.length === 0 && (
                      <p className="col-span-2 text-sm text-gray-400 text-center py-3">No categories found. Create a new one above.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl flex items-center gap-3">
              <button
                onClick={closeAddModal}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={!isAddFormValid || addLoading}
                className="flex-1 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {addLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={14} strokeWidth={2.5} />
                    Add Item
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
