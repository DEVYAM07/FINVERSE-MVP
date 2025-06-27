'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });

      if (res.status !== 200) {
        throw new Error(res.data.message || 'Login failed');
      }

      router.push('/dashboard');
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError(err.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5 bg-white p-6 rounded-xl shadow-md">
      {error && <p className="text-[#FF385C] text-sm text-center">{error}</p>}

      <div>
        <label className="text-[#222222] text-sm mb-1 block">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full p-3 rounded-xl bg-white text-[#222222] border border-[#ebebeb] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="text-[#222222] text-sm mb-1 block">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full p-3 rounded-xl bg-white text-[#222222] border border-[#ebebeb] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold transition text-white ${
          loading
            ? 'bg-[#FF385C]/70 cursor-not-allowed'
            : 'bg-[#FF385C] hover:bg-[#E11D48]'
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}


