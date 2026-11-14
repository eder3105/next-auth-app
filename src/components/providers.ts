// Nombre y colores de cada método de inicio de sesión
export const PROVIDERS: Record<string, { label: string; badge: string }> = {
  google: { label: 'Google', badge: 'bg-red-500/15 text-red-300 ring-red-400/30' },
  github: { label: 'GitHub', badge: 'bg-white/10 text-white ring-white/25' },
  credentials: { label: 'Correo y contraseña', badge: 'bg-indigo-500/15 text-indigo-300 ring-indigo-400/30' },
};

export function providerInfo(provider?: string) {
  return PROVIDERS[provider ?? ''] ?? { label: 'Sesión activa', badge: 'bg-white/10 text-slate-200 ring-white/20' };
}
