'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/signup', { name, email, password });

      if (res.status !== 200) {
        throw new Error(res.data?.error || 'Signup failed');
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || 'Signup failed');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-5 bg-white p-6 rounded-xl shadow-md">
      {error && <p className="text-[#FF385C] text-sm text-center">{error}</p>}

      <div>
        <label className="text-[#222222] text-sm mb-1 block">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="w-full p-3 rounded-xl bg-white text-[#222222] border border-[#ebebeb] placeholder-[#717171] focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
          placeholder="John Doe"
        />
      </div>

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
        {loading ? 'Processing…' : 'Sign Up'}
      </button>
    </form>
  );
}
