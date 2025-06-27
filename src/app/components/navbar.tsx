'use client';

import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Trade', href: '/trade' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Profile', href: '/profile' },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-red-300 px-6 py-3 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-wide text-[#ff385c] drop-shadow-sm">
          🚀 Finverse
        </h1>
        <div className="flex gap-3">
          {navItems.map((item) => ( 
            <Link
              key={item.href}
              href={item.href}
              className="text-sm px-4 py-2 rounded-md text-[#ff385c] font-medium transition-all duration-300 hover:bg-[#ff385c]/10"
            >
              {item.label}
            </Link>
          ) )}
        </div>
      </div>
    </nav>
  );
}
