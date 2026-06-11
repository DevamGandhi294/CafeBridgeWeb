import { HelpCircle, Book, MessageCircle, Video, Mail } from 'lucide-react';
import Layout from '../components/layout/Layout';

const resources = [
  { icon: Book, title: 'Documentation', desc: 'Detailed guides for every feature.', cta: 'Browse Docs' },
  { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step video walkthroughs.', cta: 'Watch Videos' },
  { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team.', cta: 'Start Chat' },
  { icon: Mail, title: 'Email Support', desc: 'Send us a message anytime.', cta: 'Send Email' },
];

export default function HelpPage() {
  return (
    <Layout topBarPlaceholder="Search help articles...">
      <div className="p-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle size={22} className="text-gray-700" />
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {resources.map(({ icon: Icon, title, desc, cta }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
                <Icon size={18} className="text-brand-500" />
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
              <p className="text-xs text-gray-400 mb-3">{desc}</p>
              <button className="text-brand-500 hover:text-brand-600 text-sm font-semibold transition-colors">{cta} →</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
