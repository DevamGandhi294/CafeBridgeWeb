import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await signIn(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Invalid email or password. Please try again.');
  }

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e1e1e] flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?w=800&fit=crop')`,
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
        <div className="relative z-10">
          <blockquote className="text-white/80 text-xl font-light leading-relaxed italic mb-6">
            "Streamline your restaurant operations with powerful tools designed for modern hospitality."
          </blockquote>
          <div className="flex gap-3">
            {['Revenue', 'Staff', 'Inventory', 'Tables'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/60 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-2">
            {[
              'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=40&h=40&fit=crop&facepad=2',
              'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&facepad=2',
              'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=40&h=40&fit=crop&facepad=2',
            ].map((src, i) => (
              <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#1e1e1e] object-cover" />
            ))}
          </div>
          <span className="text-white/50 text-sm">Trusted by 2,400+ restaurant teams</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
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

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm">Sign in to your restaurant dashboard</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                placeholder="you@restaurant.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-xs text-brand-500 hover:text-brand-600 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 pr-10 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-500 hover:text-brand-600 font-semibold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
