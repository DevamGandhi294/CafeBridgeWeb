import { useState } from 'react';
import { Settings, Bell, Shield, Globe, Palette, DollarSign } from 'lucide-react';
import Layout from '../components/layout/Layout';

const sections = [
  { icon: Bell, title: 'Notifications', desc: 'Configure alert preferences and notification channels.' },
  { icon: Shield, title: 'Security', desc: 'Manage passwords, 2FA and session settings.' },
  { icon: Globe, title: 'Regional Settings', desc: 'Language, timezone and currency preferences.' },
  { icon: Palette, title: 'Appearance', desc: 'Customize theme and display preferences.' },
];

export default function SettingsPage() {
  const [gstPercentage, setGstPercentage] = useState(18);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveGST = async () => {
    setIsSaving(true);
    try {
      // TODO: Save to Firebase
      console.log('Saving GST percentage:', gstPercentage);
    } finally {
      setIsSaving(false);
    }
  };

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

          {/* GST Percentage Section */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <DollarSign size={18} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 mb-3">GST Percentage</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={gstPercentage}
                    onChange={(e) => setGstPercentage(parseFloat(e.target.value) || 0)}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
                  />
                  <span className="text-sm text-gray-500">%</span>
                  <button
                    onClick={handleSaveGST}
                    disabled={isSaving}
                    className="ml-auto px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 disabled:bg-gray-300 transition-colors"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
