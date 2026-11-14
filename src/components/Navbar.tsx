'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUser, FiHome, FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import Avatar from './Avatar';
import LogoutButton from './LogoutButton';

type User = { name?: string | null; email?: string | null; image?: string | null } | null;

const AUTH_PAGES = ['/signIn', '/register'];

export default function Navbar({ user }: { user: User }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Las páginas de login y registro tienen su propio diseño a pantalla completa
  if (AUTH_PAGES.includes(pathname)) return null;

  const links = [
    { href: '/', label: 'Inicio', icon: FiHome },
    ...(user
      ? [
          { href: '/dashboard', label: 'Dashboard', icon: FiGrid },
          { href: '/profile', label: 'Perfil', icon: FiUser },
        ]
      : []),
  ];

  const linkClass = (href: string) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
      pathname === href
        ? 'bg-white/10 text-white ring-1 ring-white/15'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo light />

        {/* Escritorio */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition hover:bg-white/5"
              >
                <Avatar name={user.name} image={user.image} size={32} className="ring-2 ring-fuchsia-400/50" />
                <span className="max-w-[140px] truncate text-sm font-medium text-slate-200">{user.name}</span>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/signIn"
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90"
              >
                Crear cuenta
              </Link>
            </>
          )}
        </div>

        {/* Botón de menú en celular */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-200 hover:bg-white/10 md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/90 px-4 pb-4 pt-2 md:hidden">
          {user && (
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <Avatar name={user.name} image={user.image} size={40} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1" onClick={() => setOpen(false)}>
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            {user ? (
              <LogoutButton className="mt-2 justify-center" />
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/signIn"
                  className="rounded-lg border border-white/15 py-2 text-center text-sm font-medium text-slate-200"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 py-2 text-center text-sm font-semibold text-white"
                >
                  Crear cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
