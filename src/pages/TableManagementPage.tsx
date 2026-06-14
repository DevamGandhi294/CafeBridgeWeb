import { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Users, Plus, Filter, Receipt, CalendarClock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { tableService } from '../services/tableService';

const statusConfig = {
  available: { label: 'Available', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500', cardBorder: 'border-green-200' },
  occupied:  { label: 'Occupied',  color: 'bg-blue-100 text-blue-700 border-blue-200',   dot: 'bg-blue-500',  cardBorder: 'border-blue-200' },
};

export interface UITable {
  id: string; 
  number: string; 
  status: 'available' | 'occupied';
  section: string;
  currentOrderId: string;
  time: string;
  isMerge: boolean;
}

function StatusIcon({ status }: { status: UITable['status'] }) {
  if (status === 'available') return <CheckCircle2 size={16} className="text-green-500" />;
  return <Users size={16} className="text-blue-500" />;
}

export default function TableManagementPage() {
  const { user } = useAuth();
  const [tables, setTables] = useState<UITable[]>([]);
  const [activeSection, setActiveSection] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  async function loadTables() {
    if (!user?.email) return;
    setLoading(true);
    const dbCategories = await tableService.getTables(user.email);
    
    const uiTables: UITable[] = [];
    dbCategories.forEach(category => {
      category.tables.forEach(t => {
        uiTables.push({
          id: `${category.category}-${t.tableId}`,
          number: t.tableId,
          status: t.isAvailable ? 'available' : 'occupied',
          section: category.category,
          currentOrderId: t.currentOrderId,
          time: t.time,
          isMerge: t.isMerge
        });
      });
    });
    
    setTables(uiTables);
    setLoading(false);
  }

  useEffect(() => {
    loadTables();
  }, [user]);

  const sections = ['All', ...Array.from(new Set(tables.map(t => t.section)))];

  const filtered = tables.filter(t =>
    (activeSection === 'All' || t.section === activeSection) &&
    (filterStatus === 'All' || t.status === filterStatus)
  );

  const counts = {
    available: tables.filter(t => t.status === 'available').length,
    occupied:  tables.filter(t => t.status === 'occupied').length,
  };

  return (
    <Layout topBarPlaceholder="Search tables...">
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Table Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">{tables.length} tables across {sections.length > 1 ? sections.length - 1 : 0} sections</p>
          </div>
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
            <Plus size={15} strokeWidth={2.5} />
            Add Table
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.entries(counts) as [UITable['status'], number][]).map(([status, count]) => {
            const cfg = statusConfig[status];
            return (
               <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? 'All' : status)}
                className={`flex items-center gap-3 bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-all ${filterStatus === status ? 'ring-2 ring-brand-400' : ''}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                <div className="text-left">
                  <p className="text-lg font-bold text-gray-900">{count}</p>
                  <p className="text-xs text-gray-400 capitalize">{status}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Section tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {sections.map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeSection === s
                  ? 'bg-brand-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5 text-sm text-gray-400">
            <Filter size={14} />
            <span>Filter by section or status</span>
          </div>
        </div>

        {/* Table grid */}
        {loading ? (
           <div className="py-12 text-center text-gray-400 text-sm">Loading tables...</div>
        ) : filtered.length === 0 ? (
           <div className="py-12 text-center text-gray-400 text-sm">No tables found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map(table => {
              const cfg = statusConfig[table.status];
              return (
                <div
                  key={table.id}
                  className={`bg-white rounded-2xl p-4 border-2 ${cfg.cardBorder} text-left shadow-sm transition-all group relative overflow-hidden`}
                >
                  {/* Merge Indicator */}
                  {table.isMerge && (
                    <div className="absolute top-0 right-0 bg-purple-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                      Merged
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-3 mt-1">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Table</p>
                      <p className="text-2xl font-bold text-gray-900">{table.number}</p>
                    </div>
                    <StatusIcon status={table.status} />
                  </div>

                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide mb-3 ${cfg.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </div>

                  <div className="space-y-2 text-xs text-gray-500 h-[48px]">
                    {!table.isAvailable && table.time && (
                      <div className="flex items-center gap-1.5">
                        <CalendarClock size={13} className="text-orange-500" />
                        <span className="font-medium text-gray-700">{table.time}</span>
                      </div>
                    )}
                    {!table.isAvailable && table.currentOrderId && (
                      <div className="flex items-center gap-1.5">
                        <Receipt size={13} className="text-blue-500" />
                        <span className="font-medium text-gray-700 truncate">Order #{table.currentOrderId}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] text-gray-300 mt-3 border-t border-gray-50 pt-2">{table.section}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
