import { Shield, Edit3, ExternalLink, CreditCard, Plus, ArrowUpDown } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

const planDetails = {
  name: 'Pro Enterprise Plan',
  description: 'Unlimited venues and advanced analytics enabled.',
  nextBilling: 'October 12, 2024',
  terminalsUsed: 8,
  terminalsTotal: 10,
  annualCost: 2400.00,
};

const activityLog = [
  { event: 'Account Login', location: 'San Francisco, CA (192.168.1.1)', device: 'macOS • Chrome', date: 'Oct 02, 2024, 09:41 AM', status: 'success' },
  { event: 'Subscription Renewed', location: 'System Automated', device: 'Cloud Server', date: 'Sep 12, 2024, 00:01 AM', status: 'processed' },
  { event: 'Security Password Change', location: 'Oakland, CA (192.168.1.45)', device: 'iOS • Mobile App', date: 'Aug 15, 2024, 04:22 PM', status: 'verified' },
];

const statusColors = {
  success:   'text-green-600',
  processed: 'text-blue-600',
  verified:  'text-green-600',
};

const statusDots = {
  success:   'bg-green-500',
  processed: 'bg-blue-500',
  verified:  'bg-green-500',
};

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Layout topBarPlaceholder="Search orders, guests, or menu items...">
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile & Subscription</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage your venue identity, billing cycles, and operational footprint.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm px-4 py-2 rounded-xl transition-colors">
              <Shield size={14} />
              Security Settings
            </button>
            <button className="flex items-center gap-1.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors">
              <Edit3 size={14} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Profile info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Identity card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-4 mb-6">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-600">{user?.name?.[0]}</span>
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{user?.restaurantName ?? 'Cafe Bridge Central'}</h2>
                  <p className="text-sm text-gray-500">Primary Operations Hub • ID: CB-99281</p>
                  <span className="inline-flex items-center gap-1 mt-1.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Active Status
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-5">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Business Address</p>
                  <p className="text-sm text-gray-700 leading-relaxed">128 Artisan Way, Suite 400<br />North Waterfront, CA 94107</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Legal Representative</p>
                  <p className="text-sm text-gray-700">{user?.name ?? 'Sarah Jenkins'}</p>
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Tax ID / EIN</p>
                    <p className="text-sm text-gray-700">XX-XXX7841</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Contact Details</p>
                  <p className="text-sm text-gray-700">{user?.email ?? 'central@cafebridge.com'}</p>
                  <p className="text-sm text-gray-500">+1 (555) 482-9012</p>
                </div>
              </div>
            </div>

            {/* Performance usage */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900">Performance usage</h3>
                <button className="flex items-center gap-1 text-brand-500 hover:text-brand-600 text-sm font-medium">
                  View Detailed Report <ExternalLink size={12} className="ml-0.5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Monthly Transactions', value: '14,281', sub: '↑ 12% from last month', subColor: 'text-green-600' },
                  { label: 'Active Staff Users', value: '24 / 50', sub: '48% of seat capacity', subColor: 'text-gray-400' },
                  { label: 'Cloud Storage', value: '4.2 GB', sub: null, subColor: '' },
                ].map(stat => (
                  <div key={stat.label} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 leading-tight mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.sub && <p className={`text-xs mt-1 ${stat.subColor}`}>{stat.sub}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Recent Account Activity</h3>
                <ArrowUpDown size={15} className="text-gray-400" />
              </div>
              <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr] text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-2.5 border-b border-gray-50">
                <span>Event</span>
                <span>Location</span>
                <span>Device</span>
                <span>Date & Time</span>
                <span>Status</span>
              </div>
              {activityLog.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr] items-center px-5 py-3.5 ${idx !== 0 ? 'border-t border-gray-50' : ''}`}
                >
                  <span className="text-sm text-gray-800">{row.event}</span>
                  <span className="text-sm text-gray-500 truncate">{row.location}</span>
                  <span className="text-sm text-gray-500">{row.device}</span>
                  <span className="text-xs text-gray-400">{row.date}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDots[row.status as keyof typeof statusDots]}`} />
                    <span className={`text-sm font-medium capitalize ${statusColors[row.status as keyof typeof statusColors]}`}>{row.status}</span>
                  </div>
                </div>
              ))}
              <div className="px-5 py-3 border-t border-gray-100">
                <button className="w-full text-center text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">Load More Activities</button>
              </div>
            </div>
          </div>

          {/* Right: Plan & payment */}
          <div className="space-y-4">
            {/* Active plan */}
            <div className="bg-brand-500 rounded-2xl p-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 border border-white/30 px-2 py-0.5 rounded-full">Active Plan</span>
              <h2 className="text-2xl font-bold mt-3 mb-1">{planDetails.name}</h2>
              <p className="text-sm opacity-70 mb-5">{planDetails.description}</p>

              <div className="space-y-3">
                {[
                  { label: 'Next Billing Date', value: planDetails.nextBilling, icon: '📅' },
                  { label: 'Terminal Usage', value: `${planDetails.terminalsUsed} / ${planDetails.terminalsTotal} Terminals Linked`, icon: '🖥️' },
                  { label: 'Annual Cost', value: `$${planDetails.annualCost.toLocaleString()} / year`, icon: '💳' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2.5">
                    <span className="text-sm">{icon}</span>
                    <div>
                      <p className="text-[10px] opacity-60 uppercase tracking-wide">{label}</p>
                      <p className="text-sm font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 border border-white/30 hover:bg-white/10 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                Manage Subscription <ExternalLink size={13} />
              </button>
            </div>

            {/* Payment methods */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">Payment Methods</h3>
              <div className="border border-gray-100 rounded-xl p-3 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CreditCard size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Visa ending in 4242</p>
                    <p className="text-xs text-gray-400">Expires 04/26</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-500 border border-gray-200 px-2 py-0.5 rounded">PRIMARY</span>
              </div>
              <button className="w-full border-2 border-dashed border-gray-200 hover:border-brand-300 text-gray-400 hover:text-brand-500 text-sm font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5">
                <Plus size={14} />
                Add New Payment Method
              </button>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">Support & Help</h3>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-3">Need to upgrade your terminal limit?</p>
                <button className="text-brand-500 hover:text-brand-600 text-sm font-semibold transition-colors">
                  Contact Enterprise Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
