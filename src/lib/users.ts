import dns from "dns";
import { MongoClient, ObjectId } from "mongodb";

// Algunas redes en Windows no resuelven las direcciones "mongodb+srv" (error querySrv ECONNREFUSED).
// Se usan DNS públicos solo en local; en Vercel no hace falta.
if (!process.env.VERCEL) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.promises.setServers(["8.8.8.8", "1.1.1.1"]); // el driver de MongoDB usa la versión con promesas
}

// Usuarios guardados en MongoDB Atlas (colección "users")
export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // hash generado con bcrypt
  failedAttempts: number;
  lockUntil: number | null; // timestamp (ms) hasta el que la cuenta está bloqueada
};

type UserDoc = Omit<User, "id"> & { _id: ObjectId; createdAt: Date };

export const MAX_ATTEMPTS = 3; // intentos fallidos permitidos
export const LOCK_TIME_MS = 5 * 60 * 1000; // 5 minutos de bloqueo

// Se reutiliza una sola conexión (evita abrir una nueva en cada recarga en desarrollo)
const globalForMongo = globalThis as unknown as { _mongo?: Promise<MongoClient> };

function getClient() {
  if (!process.env.MONGODB_URI) throw new Error("Falta MONGODB_URI en .env.local");
  globalForMongo._mongo ??= new MongoClient(process.env.MONGODB_URI).connect().catch((err) => {
    globalForMongo._mongo = undefined; // si falla, se reintenta en la siguiente petición
    throw err;
  });
  return globalForMongo._mongo;
}

async function users() {
  const client = await getClient();
  const col = client.db().collection<UserDoc>("users");
  await col.createIndex({ email: 1 }, { unique: true });
  return col;
}

function toUser(doc: UserDoc): User {
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const doc = await (await users()).findOne({ email: email.toLowerCase().trim() });
  return doc ? toUser(doc) : undefined;
}

export async function createUser(data: { name: string; email: string; password: string }) {
  const doc = {
    _id: new ObjectId(),
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    password: data.password,
    failedAttempts: 0,
    lockUntil: null,
    createdAt: new Date(),
  };
  await (await users()).insertOne(doc);
  return toUser(doc);
}

export async function updateUser(id: string, changes: Partial<Omit<User, "id">>) {
  await (await users()).updateOne({ _id: new ObjectId(id) }, { $set: changes });
}
