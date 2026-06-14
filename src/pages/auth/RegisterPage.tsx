import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', restaurantName: '', address: '', phone: '', gst: '', gstPercentage: '18', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    const ok = await signUp(form.name, form.email, form.password, form.restaurantName, form.address, form.phone, form.gst, parseFloat(form.gstPercentage));
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Registration failed. Please try again.');
  }

  const features = [
    'Real-time inventory tracking',
    'Staff scheduling & management',
    'Menu & pricing control',
    'Revenue analytics',
  ];

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[420px] bg-[#1e1e1e] flex-col justify-between p-12 relative overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?w=800&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
              <Coffee size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-bold text-xl tracking-wide">Cafe Bridge</div>
              <div className="text-[#666] text-xs uppercase tracking-widest">Management Suite</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Start managing smarter</h2>
            <p className="text-white/50 text-sm leading-relaxed">Join thousands of restaurants using Cafe Bridge to run more efficient operations.</p>
          </div>
          <div className="space-y-3">
            {features.map(f => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-brand-400 flex-shrink-0" />
                <span className="text-white/70 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-white/70 text-sm italic leading-relaxed">"Cafe Bridge reduced our inventory waste by 40% in the first month."</p>
            <div className="flex items-center gap-2 mt-3">
              <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=40&h=40&fit=crop&facepad=2" alt="" className="w-7 h-7 rounded-full object-cover" />
              <div>
                <div className="text-white text-xs font-medium">Elena Rodriguez</div>
                <div className="text-white/40 text-[10px]">Owner, The Garden Table</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[420px] py-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
              <Coffee size={18} className="text-white" />
            </div>
            <div>
              <div className="text-[#1e1e1e] font-bold text-lg">Cafe Bridge</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-widest">Management Suite</div>
            </div>
          </div>

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm">Set up your restaurant dashboard in minutes</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="Alex Mercer"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Restaurant name</label>
                <input
                  type="text"
                  value={form.restaurantName}
                  onChange={update('restaurantName')}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="Cafe Bridge Central"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="you@restaurant.com"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={update('address')}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="123 Main Street, City"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="1234567890"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">GST Number (optional)</label>
                <input
                  type="text"
                  value={form.gst}
                  onChange={update('gst')}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="GSTIN12345678"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">GST Percentage</label>
                <input
                  type="number"
                  value={form.gstPercentage}
                  onChange={update('gstPercentage')}
                  required
                  step="0.01"
                  min="0"
                  max="100"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="18"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={update('password')}
                    required
                    className="w-full px-3.5 py-2.5 pr-9 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                    placeholder="Min. 8 chars"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={update('confirm')}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              By creating an account you agree to our{' '}
              <span className="text-brand-500 cursor-pointer hover:underline">Terms of Service</span>{' '}
              and{' '}
              <span className="text-brand-500 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
