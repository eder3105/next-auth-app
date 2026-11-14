'use client';

import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton({ className = '' }: { className?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className={`inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-300 ${className}`}
    >
      <FiLogOut className="h-4 w-4" />
      Cerrar sesión
    </button>
  );
}
