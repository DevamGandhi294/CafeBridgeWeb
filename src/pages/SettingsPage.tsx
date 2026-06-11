import { Settings, Bell, Shield, Globe, Palette } from 'lucide-react';
import Layout from '../components/layout/Layout';

const sections = [
  { icon: Bell, title: 'Notifications', desc: 'Configure alert preferences and notification channels.' },
  { icon: Shield, title: 'Security', desc: 'Manage passwords, 2FA and session settings.' },
  { icon: Globe, title: 'Regional Settings', desc: 'Language, timezone and currency preferences.' },
  { icon: Palette, title: 'Appearance', desc: 'Customize theme and display preferences.' },
];

export default function SettingsPage() {
  return (
    <Layout topBarPlaceholder="Search settings...">
      <div className="p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Settings size={22} className="text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="space-y-3">
          {sections.map(({ icon: Icon, title, desc }) => (
            <button key={title} className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-left flex items-center gap-4 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-brand-50 rounded-xl flex items-center justify-center transition-colors flex-shrink-0">
                <Icon size={18} className="text-gray-500 group-hover:text-brand-500 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
