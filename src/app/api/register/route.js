import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const { password, email } = body;

  if (!password || !email) {
    return new NextResponse("Email or password missing!", {
      status: 400,
    });
  }

  if (!password?.length || password.length < 5) {
    return new NextResponse("password must be at least 5 characters", {
      status: 400,
    });
  }

  const exists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (exists) {
    return new NextResponse("User already exists!", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email: email, hashedPassword },
  });

  return NextResponse.json(user);
}
