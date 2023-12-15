import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { password, email } = body;

  if (!password || !email) {
    return Response.json({ error: "Error!" }, { status: 400 });
  }

  if (!password?.length || password.length < 5) {
    return Response.json({ error: "Error!" }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (exists) {
    return Response.json({ error: "Error!" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email: email, hashedPassword },
  });

  return Response.json(user, { status: 200 });
}
