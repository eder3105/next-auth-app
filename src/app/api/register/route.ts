import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "@/lib/users";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  }
  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "Ese correo ya está registrado" }, { status: 409 });
  }

  // Cifrado de la contraseña con bcrypt (10 rondas de salt)
  const hashed = await bcrypt.hash(password, 10);
  createUser({ name, email, password: hashed });

  return NextResponse.json({ ok: true }, { status: 201 });
}
