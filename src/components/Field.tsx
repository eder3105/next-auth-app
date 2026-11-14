'use client';

import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: IconType;
};

// Campo de formulario con ícono y botón para ver la contraseña
export default function Field({ label, icon: Icon, type = 'text', ...props }: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          {...props}
          type={isPassword && show ? 'text' : type}
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {show ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </label>
  );
}
