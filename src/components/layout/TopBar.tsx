import { useState } from 'react';
import { Search, Bell, Grid3X3, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TopBarProps {
  placeholder?: string;
}

export default function TopBar({ placeholder = 'Search orders, menu, or staff...' }: TopBarProps) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');

  return (
    <header className="fixed top-0 left-[220px] right-0 h-[60px] bg-white border-b border-gray-100 flex items-center px-6 gap-4 z-20">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-brand-400 focus:bg-white transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Business Info */}
        {user?.restaurantName && (
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-sm font-bold text-gray-800">{user.restaurantName}</span>
            {/* <span className="text-[10px] font-semibold text-brand-600 tracking-widest uppercase">Code: {user.code}</span> */}
          </div>
        )}

        {/* Notifications */}
        {/* <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={17} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white" />
        </button> */}

        {/* Apps grid */}
        {/* <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Grid3X3 size={17} className="text-gray-600" />
        </button> */}

        {/* User */}
        <button className="flex items-center gap-2.5 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-brand-600 text-xs font-bold">{user?.name?.[0]}</span>
            </div>
          )}
          <div className="hidden md:block text-right">
            <div className="text-sm font-semibold text-gray-800 leading-tight">{user?.name ?? 'Manager'}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wide leading-tight capitalize">{user?.role ?? 'Admin'} Access</div>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
