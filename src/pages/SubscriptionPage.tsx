import Layout from '../components/layout/Layout';
import { CheckCircle2, Info } from 'lucide-react';

export default function SubscriptionPage() {
  return (
    <Layout topBarPlaceholder="Search subscriptions...">
      <div className="p-6 max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2 pt-6">
          <h1 className="text-4xl font-bold text-[#4a3424]">Pay Only When Your Business Runs</h1>
          <p className="text-xl text-[#6b5240]">QR Scanner Add-on</p>
        </div>

        {/* Subscription Table */}
        <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-orange-100">
                  <th className="p-4 font-medium text-gray-500">Plans</th>
                  <th className="p-4 font-medium text-gray-500">Included</th>
                  <th className="p-4 font-medium text-gray-500">Pricing</th>
                  <th className="p-4 font-medium text-gray-500">Qr Scanner Add-on</th>
                  <th className="p-4 font-medium text-gray-500">Pay Now</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-orange-50 bg-orange-50/30">
                  <td className="p-4 font-medium text-gray-800">Base Plan</td>
                  <td className="p-4 text-gray-600">2,000 Orders</td>
                  <td className="p-4 text-gray-800 font-semibold">₹499</td>
                  <td className="p-4 text-gray-600">+₹200/month</td>
                  <td className="p-4 space-y-2">
                    <a href="https://rzp.io/rzp/MkjrUYA" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition">
                      Pay without QR
                    </a>
                    <a href="https://rzp.io/rzp/gIFe7DP" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c] transition">
                      Pay with QR
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-orange-50">
                  <td className="p-4 font-medium text-gray-800">Pro Plan</td>
                  <td className="p-4 text-gray-600">5,000 Orders</td>
                  <td className="p-4 text-gray-800 font-semibold">₹999</td>
                  <td className="p-4 text-gray-600">+₹400/month</td>
                  <td className="p-4 space-y-2">
                    <a href="https://rzp.io/rzp/iI1dNho" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition">
                      Pay without QR
                    </a>
                    <a href="https://rzp.io/rzp/mC2Tplx" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c] transition">
                      Pay with QR
                    </a>
                  </td>
                </tr>
                <tr className="bg-orange-50/30">
                  <td className="p-4 font-medium text-gray-800">Max Plan</td>
                  <td className="p-4 text-gray-600">10,000 Orders</td>
                  <td className="p-4 text-gray-800 font-semibold">₹1999</td>
                  <td className="p-4 text-gray-600">+₹800/month</td>
                  <td className="p-4 space-y-2">
                    <a href="https://rzp.io/rzp/pI7Cihq" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1d4ed8] transition">
                      Pay without QR
                    </a>
                    <a href="https://rzp.io/rzp/CMaI0Mu" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea580c] transition">
                      Pay with QR
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Extra orders — ₹0.30 without QR | ₹0.40 with QR</p>
          <p>Prepaid. Flexible. Zero Risk.</p>
        </div>

        {/* Pay As You Go */}
        <div className="bg-[#ffdcc7] rounded-xl p-6 border border-[#ffcdad]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 border-2 border-[#b5581d] rounded-sm"></div>
            <h3 className="text-xl font-bold text-[#b5581d]">Pay As You Go</h3>
          </div>
          <p className="text-[#8c4214] mb-4">Just starting out? No commitment needed.</p>
          <ul className="list-disc list-inside text-[#8c4214] space-y-1 ml-2 font-medium">
            <li>Without QR — ₹0.30/order</li>
            <li>With QR — ₹0.40/order</li>
          </ul>
        </div>

        <div className="text-center font-bold text-[#8c4214]">
          Now you know why paying yearly never made sense.
        </div>

        {/* Divider */}
        <div className="h-px bg-orange-100 my-12"></div>

        {/* Own It Forever Section */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-[#4a3424]">Own It. Forever.</h2>
          <p className="text-xl text-[#6b5240]">Your app. Your website. Your data. No one else's.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Website + QR */}
          <div className="bg-white rounded-2xl border border-orange-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl text-[#6b5240] mb-4">Website + QR</h3>
            <div className="text-5xl font-light text-[#4a3424] mb-2">₹14,999</div>
            <div className="text-sm text-gray-400 mb-8">one-time</div>
            <ul className="text-left space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> Custom UI & branding</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> QR ordering system</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> Minor backend changes</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> 1 year server + domain free</li>
            </ul>
          </div>

          {/* Mobile App */}
          <div className="bg-white rounded-2xl border border-orange-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl text-[#6b5240] mb-4">Mobile App</h3>
            <div className="text-5xl font-light text-[#4a3424] mb-2">₹19,999</div>
            <div className="text-sm text-gray-400 mb-8">one-time</div>
            <ul className="text-left space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> Custom UI & branding</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> Full app on Google Play Store</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240]"></div> 1 year server</li>
            </ul>
          </div>

          {/* Combo */}
          <div className="bg-white rounded-2xl border-2 border-orange-200 p-8 text-center shadow-sm hover:shadow-md transition-shadow relative">
            <div className="absolute -top-3.5 right-6 bg-[#ffeedb] text-[#b5581d] text-xs font-bold px-3 py-1 rounded-md border border-[#ffcdad] flex items-center gap-1 shadow-sm">
              <span>☆</span> BEST VALUE
            </div>
            <h3 className="text-xl text-[#6b5240] mb-4">Combo</h3>
            <div className="text-5xl font-light text-[#4a3424] mb-2">₹29,999</div>
            <div className="text-sm text-gray-400 mb-8">one-time</div>
            <ul className="text-left space-y-3 text-gray-600 text-sm">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240] mt-1.5"></div> <span>Website + QR + Mobile App</span></li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240] mt-1.5"></div> <span>Save ₹5,000 vs buying separate</span></li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#6b5240] mt-1.5"></div> <span>1 year server + domain free</span></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pt-4">
          <p>Your data lives on your server. Not ours. Not anyone else's. Not even we can see it.</p>
        </div>
        
        <div className="text-center text-xs text-gray-400 pb-12">
          <p>After 1 year — server and domain renewed directly by you. Full control. Always yours.</p>
        </div>

      </div>
    </Layout>
  );
}
