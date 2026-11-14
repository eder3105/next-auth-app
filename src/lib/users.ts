import fs from "fs";
import path from "path";

// "Base de datos" simple en un archivo JSON.
// En local se guarda en /data/users.json. En Vercel el disco es de solo lectura,
// así que se usa /tmp (los datos se pierden cuando la función se reinicia).
export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // hash generado con bcrypt
  failedAttempts: number;
  lockUntil: number | null; // timestamp (ms) hasta el que la cuenta está bloqueada
};

export const MAX_ATTEMPTS = 3; // intentos fallidos permitidos
export const LOCK_TIME_MS = 5 * 60 * 1000; // 5 minutos de bloqueo

const DATA_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "users.json");

function readUsers(): User[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}

export function findUserByEmail(email: string): User | undefined {
  return readUsers().find((u) => u.email === email.toLowerCase().trim());
}

export function createUser(data: { name: string; email: string; password: string }): User {
  const users = readUsers();
  const user: User = {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    password: data.password,
    failedAttempts: 0,
    lockUntil: null,
  };
  users.push(user);
  writeUsers(users);
  return user;
}

export function updateUser(id: string, changes: Partial<User>) {
  const users = readUsers().map((u) => (u.id === id ? { ...u, ...changes } : u));
  writeUsers(users);
}
