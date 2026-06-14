import { useState, useEffect } from 'react';
import { UserPlus, Link2, RefreshCw, Filter, Download, MoreVertical, Check } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { staffService } from '../services/staffService';
import { StaffMember, StaffRequest } from '../types';

const statusStyle: Record<string, { label: string; color: string; dot: string }> = {
  active:    { label: 'Active',    color: 'text-green-600', dot: 'bg-green-500' },
  on_break:  { label: 'On Break',  color: 'text-orange-500', dot: 'bg-orange-400' },
  off_duty:  { label: 'Off-duty',  color: 'text-gray-400',  dot: 'bg-gray-300' },
};

const roleBadge: Record<string, string> = {
  kitchen:       'bg-orange-100 text-orange-700',
  front_of_house: 'bg-blue-100 text-blue-700',
  management:    'bg-purple-100 text-purple-700',
};

// Helper to map DB roleGroup to our UI roleCategory
function mapRoleGroupToCategory(roleGroup: string): 'kitchen' | 'front_of_house' | 'management' {
  const group = roleGroup?.toLowerCase() || '';
  if (group.includes('chef') || group.includes('cook') || group.includes('kitchen')) return 'kitchen';
  if (group.includes('manager') || group.includes('admin')) return 'management';
  return 'front_of_house';
}

// Format relative time for "joinedAgo"
function formatTimeAgo(timestamp: any): string {
  if (!timestamp) return 'recently';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diffInDays = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 3600 * 24));
  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  return `${diffInDays} days ago`;
}

// Format exact date for "joinedAt"
function formatDate(timestamp: any): string {
  if (!timestamp) return 'Recently';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString();
}

export default function StaffManagementPage() {
  const { user } = useAuth();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [requests, setRequests] = useState<StaffRequest[]>([]);
  const [filter, setFilter] = useState<'All Roles' | 'Kitchen' | 'Front-of-House'>('All Roles');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Use the invite code from the user's restaurant doc
  const INVITE_CODE = user?.code || 'WAITING-CODE';

  async function loadStaff() {
    if (!user?.email) return;
    setLoading(true);
    
    const dbStaff = await staffService.getStaff(user.email);
    
    const activeMembers: StaffMember[] = [];
    const pendingRequests: StaffRequest[] = [];

    dbStaff.forEach(s => {
      if (s.status === 'pending') {
        pendingRequests.push({
          id: s.docId, 
          name: s.name,
          role: s.role,
          joinedAgo: formatTimeAgo(s.createdAt),
        });
      } else {
        activeMembers.push({
          id: s.docId,
          staffId: s.id ? s.id.replace('#ST-', '') : '0000',
          name: s.name,
          email: s.email,
          role: s.role,
          roleCategory: mapRoleGroupToCategory(s.roleGroup),
          status: 'active',
          joinedAt: formatDate(s.createdAt)
        });
      }
    });

    setStaff(activeMembers);
    setRequests(pendingRequests);
    setLoading(false);
  }

  useEffect(() => {
    loadStaff();
  }, [user]);

  const filtered = staff.filter(s =>
    filter === 'All Roles' ||
    (filter === 'Kitchen' && s.roleCategory === 'kitchen') ||
    (filter === 'Front-of-House' && s.roleCategory === 'front_of_house')
  );

  async function approveRequest(id: string) {
    if (!user?.email) return;
    await staffService.approveStaff(user.email, id);
    loadStaff(); 
  }

  async function declineRequest(id: string) {
    if (!user?.email) return;
    await staffService.rejectStaff(user.email, id);
    loadStaff(); 
  }

  async function removeActiveStaff(id: string) {
    if (!user?.email) return;
    await staffService.removeStaff(user.email, id);
    setActiveDropdown(null);
    loadStaff();
  }

  function copyCode() {
    navigator.clipboard.writeText(INVITE_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout topBarPlaceholder="Quick search staff...">
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm text-gray-500">{staff.filter(s => s.status === 'active').length} Active Staff Members currently on shift</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
            <UserPlus size={15} strokeWidth={2.5} />
            Add Staff Manually
          </button>
        </div>

        {/* Top cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Invite code */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-900 mb-1">Restaurant Invite Code</h3>
            <p className="text-sm text-gray-500 mb-4">Share this unique code or link with new hires to let them join your restaurant workspace automatically.</p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl py-6 text-center mb-3">
              <span className="text-3xl font-bold text-brand-500 tracking-widest">{INVITE_CODE}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyCode}
                className="flex-1 flex items-center justify-center gap-2 border border-brand-200 text-brand-500 hover:bg-brand-50 font-medium text-sm py-2 rounded-xl transition-colors"
              >
                {copied ? <Check size={14} /> : <Link2 size={14} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button onClick={loadStaff} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <RefreshCw size={14} className={`text-gray-400 ${loading ? 'animate-spin text-brand-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Pending requests */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 overflow-y-auto max-h-[250px]">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
              <h3 className="font-bold text-gray-900">Pending Requests</h3>
              {requests.length > 0 && (
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {requests.length} WAITING
                </span>
              )}
            </div>
            {loading ? (
               <div className="flex items-center justify-center h-24 text-sm text-gray-400">Loading...</div>
            ) : requests.length === 0 ? (
              <div className="flex items-center justify-center h-24 text-sm text-gray-400">No pending requests</div>
            ) : (
              <div className="space-y-3">
                {requests.map(r => (
                  <div key={r.id} className="flex items-center gap-3">
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-gray-500">{r.name[0]?.toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 capitalize">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.role} • Joined {r.joinedAgo}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => approveRequest(r.id)}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => declineRequest(r.id)}
                        className="px-3 py-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-lg transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active team table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-gray-900">Active Team</h3>
              <div className="flex gap-1.5">
                {(['All Roles', 'Kitchen', 'Front-of-House'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors border ${
                      filter === f ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
                <Filter size={12} />
                Status: All
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[2fr_2fr_1.5fr_1fr_80px] text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-5 py-2.5 border-b border-gray-50">
            <span>Staff Member</span>
            <span>Contact</span>
            <span>Role</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <div className="px-5 py-12 text-center text-gray-400 text-sm">Loading staff...</div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-gray-400 text-sm">No active staff found.</div>
          ) : (
            filtered.map((member, idx) => {
              const st = statusStyle[member.status];
              return (
                <div
                  key={member.id}
                  className={`grid grid-cols-[2fr_2fr_1.5fr_1fr_80px] items-center px-5 py-3.5 ${idx !== 0 ? 'border-t border-gray-50' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-gray-600 uppercase">{member.name[0]}</span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-gray-800 capitalize">{member.name}</p>
                      <p className="text-xs text-gray-400">#{member.staffId}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 truncate">{member.email}</span>
                  <span className={`inline-flex w-fit text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${roleBadge[member.roleCategory]}`}>
                    {member.role}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${st?.dot || 'bg-gray-300'}`} />
                    <span className={`text-sm font-medium ${st?.color || 'text-gray-400'}`}>{st?.label || 'Unknown'}</span>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === member.id ? null : member.id)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${activeDropdown === member.id ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    >
                      <MoreVertical size={15} className="text-gray-400" />
                    </button>
                    {activeDropdown === member.id && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                        <button 
                          onClick={() => removeActiveStaff(member.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          Remove Staff
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          <div className="px-5 py-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Showing {filtered.length} of {staff.length} team members</span>
          </div>
        </div>
      </div>
      
      {/* Invisible overlay to close dropdowns when clicking outside */}
      {activeDropdown && (
        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
      )}
    </Layout>
  );
}
