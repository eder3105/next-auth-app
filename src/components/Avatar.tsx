import Image from 'next/image';

type Props = {
  name?: string | null;
  image?: string | null;
  size?: number;
  className?: string;
};

// Muestra la foto del usuario (Google/GitHub) o sus iniciales si no tiene foto
export default function Avatar({ name, image, size = 40, className = '' }: Props) {
  const initials =
    (name ?? '?')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || '?';

  if (image) {
    return (
      <Image
        src={image}
        alt={name ?? 'Usuario'}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
