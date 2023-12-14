import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  const data = await req.json();
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  await prisma.user.update({
    where: { email },
    data: data,
  });

  return NextResponse.json(true);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session.user.email;

  return NextResponse.json(await prisma.user.findUnique({ where: { email } }));
}
