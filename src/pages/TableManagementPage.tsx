import { useState } from 'react';
import { Users, Clock, CheckCircle2, Brush, Plus, Filter } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { tables as initialTables } from '../data/tables';
import { Table } from '../types';

const statusConfig = {
  available: { label: 'Available', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500', cardBorder: 'border-green-200' },
  occupied:  { label: 'Occupied',  color: 'bg-blue-100 text-blue-700 border-blue-200',   dot: 'bg-blue-500',  cardBorder: 'border-blue-200' },
  reserved:  { label: 'Reserved',  color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-400', cardBorder: 'border-orange-200' },
  cleaning:  { label: 'Cleaning',  color: 'bg-gray-100 text-gray-600 border-gray-200',   dot: 'bg-gray-400',  cardBorder: 'border-gray-200' },
};

function StatusIcon({ status }: { status: Table['status'] }) {
  if (status === 'available') return <CheckCircle2 size={16} className="text-green-500" />;
  if (status === 'occupied') return <Users size={16} className="text-blue-500" />;
  if (status === 'reserved') return <Clock size={16} className="text-orange-400" />;
  return <Brush size={16} className="text-gray-400" />;
}

export default function TableManagementPage() {
  const [tables, setTables] = useState(initialTables);
  const [activeSection, setActiveSection] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const sections = ['All', ...Array.from(new Set(tables.map(t => t.section)))];

  const filtered = tables.filter(t =>
    (activeSection === 'All' || t.section === activeSection) &&
    (filterStatus === 'All' || t.status === filterStatus)
  );

  const counts = {
    available: tables.filter(t => t.status === 'available').length,
    occupied:  tables.filter(t => t.status === 'occupied').length,
    reserved:  tables.filter(t => t.status === 'reserved').length,
    cleaning:  tables.filter(t => t.status === 'cleaning').length,
  };

  function cycleStatus(id: string) {
    const order: Table['status'][] = ['available', 'occupied', 'reserved', 'cleaning'];
    setTables(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next = order[(order.indexOf(t.status) + 1) % order.length];
      return { ...t, status: next };
    }));
  }

  return (
    <Layout topBarPlaceholder="Search tables, reservations...">
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Table Management</h1>
            <p className="text-gray-500 text-sm mt-0.5">{tables.length} tables across {sections.length - 1} sections</p>
          </div>
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
            <Plus size={15} strokeWidth={2.5} />
            New Reservation
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.entries(counts) as [Table['status'], number][]).map(([status, count]) => {
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
            <span>Click a card to cycle status</span>
          </div>
        </div>

        {/* Table grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(table => {
            const cfg = statusConfig[table.status];
            return (
              <button
                key={table.id}
                onClick={() => cycleStatus(table.id)}
                className={`bg-white rounded-2xl p-4 border-2 ${cfg.cardBorder} text-left shadow-sm hover:shadow-md transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
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

                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Users size={11} className="text-gray-400" />
                    <span>Capacity {table.capacity}</span>
                  </div>
                  {table.guests && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-100 inline-block" />
                      <span>{table.guests} guests</span>
                    </div>
                  )}
                  {table.server && <p className="text-[10px] text-gray-400 truncate">{table.server}</p>}
                  {table.reservation && <p className="text-[10px] text-orange-500 font-medium truncate">{table.reservation}</p>}
                </div>

                <p className="text-[10px] text-gray-300 mt-2">{table.section}</p>
              </button>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
