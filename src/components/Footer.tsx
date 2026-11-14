'use client';

import { usePathname } from 'next/navigation';
import { FiShield } from 'react-icons/fi';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/signIn' || pathname === '/register') return null;

  return (
    <footer className="border-t border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:px-6">
        <p className="flex items-center gap-2">
          <FiShield className="h-4 w-4 text-fuchsia-400" />
          © 2026 MyAuthApp · Laboratorio 13 — Tecsup
        </p>
        <p>Next.js · NextAuth · MongoDB Atlas</p>
      </div>
    </footer>
  );
}
