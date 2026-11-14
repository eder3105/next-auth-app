import Link from 'next/link';
import { FiShield } from 'react-icons/fi';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 transition group-hover:scale-105">
        <FiShield className="h-5 w-5" />
      </span>
      <span className={`text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        My<span className={light ? 'text-indigo-200' : 'text-indigo-600'}>Auth</span>App
      </span>
    </Link>
  );
}
