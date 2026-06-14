import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LayoutGrid,
  UtensilsCrossed,
  Package,
  Users,
  UserCircle,
  Settings,
  HelpCircle,
  PlusCircle,
  LogOut,
  Coffee,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const mainNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tables', label: 'Table Management', icon: LayoutGrid },
  { to: '/menu', label: 'Menu Management', icon: UtensilsCrossed },
  { to: '/inventory', label: 'Inventory Management', icon: Package },
  { to: '/staff', label: 'Staff Management', icon: Users },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

const bottomNav = [
  { to: '/subscription', label: 'Subscription', icon: CreditCard },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help', icon: HelpCircle },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#1e1e1e] flex flex-col z-30 select-none">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#2e2e2e]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-500 rounded-md flex items-center justify-center flex-shrink-0">
            <Coffee size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-brand-400 font-bold text-base leading-tight tracking-wide">Cafe Bridge</div>
            <div className="text-[#666] text-[10px] font-medium uppercase tracking-widest leading-tight mt-0.5">Management Suite</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {mainNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                isActive
                  ? 'bg-[#2e2e2e] text-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-[3px] before:bg-brand-500 before:rounded-r'
                  : 'text-[#888] hover:bg-[#2a2a2a] hover:text-[#ccc]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-brand-400' : 'text-[#666] group-hover:text-[#999]'} strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-1 border-t border-[#2e2e2e] pt-3">
        {/* <button
          onClick={() => navigate('/tables')}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors mb-2"
        >
          <PlusCircle size={16} strokeWidth={2.5} />
          New Reservation
        </button> */}

        {bottomNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative ${
                isActive
                  ? 'bg-[#2e2e2e] text-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-[3px] before:bg-brand-500 before:rounded-r'
                  : 'text-[#888] hover:bg-[#2a2a2a] hover:text-[#ccc]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-brand-400' : 'text-[#666] group-hover:text-[#999]'} strokeWidth={isActive ? 2.5 : 2} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#888] hover:bg-[#2a2a2a] hover:text-red-400 transition-all duration-150 group"
        >
          <LogOut size={17} className="text-[#666] group-hover:text-red-400" strokeWidth={2} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
