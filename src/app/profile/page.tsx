import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Avatar from '@/components/Avatar';
import LogoutButton from '@/components/LogoutButton';
import { providerInfo } from '@/components/providers';
import { FiArrowLeft, FiCalendar, FiImage, FiLogIn, FiMail, FiShield, FiUser } from 'react-icons/fi';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const provider = providerInfo(user?.provider);
  const expires = session?.expiresAt
    ? new Date(session.expiresAt * 1000).toLocaleString('es-PE', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Lima' })
    : '—';

  const rows = [
    { icon: FiUser, label: 'Nombre', value: user?.name ?? '—' },
    { icon: FiMail, label: 'Correo electrónico', value: user?.email ?? '—' },
    { icon: FiLogIn, label: 'Método de inicio de sesión', value: provider.label },
    { icon: FiImage, label: 'Foto de perfil', value: user?.image ? 'Obtenida del proveedor' : 'Sin foto (se muestran iniciales)' },
    { icon: FiCalendar, label: 'Sesión válida hasta', value: expires },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-fuchsia-300">
        <FiArrowLeft /> Volver al dashboard
      </Link>

      <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-indigo-500/10 backdrop-blur-md">
        {/* Portada */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500">
          <div className="bg-grid-dark absolute inset-0" />
          <div className="animate-blob absolute -left-10 -top-16 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
          <div className="animate-blob absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-cyan-300/30 blur-2xl" style={{ animationDelay: '-6s' }} />
        </div>

        <div className="relative px-6 pb-8 sm:px-10">
          <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Avatar name={user?.name} image={user?.image} size={112} className="shadow-2xl ring-4 ring-slate-950" />
              <div className="sm:pb-2">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{user?.name}</h1>
                <p className="text-slate-400">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:pb-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${provider.badge}`}>
                <FiShield className="h-3.5 w-3.5" /> {provider.label}
              </span>
            </div>
          </div>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-fuchsia-300">Información de la cuenta</h2>
          <dl className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-slate-950/30">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:gap-4">
                <dt className="flex items-center gap-3 text-sm text-slate-400 sm:w-64">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-indigo-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </dt>
                <dd className="break-all pl-11 text-sm font-medium text-white sm:pl-0">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex justify-end">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
