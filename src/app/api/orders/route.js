// noinspection JSCheckFunctionSignatures

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);

    try {
        if (session.user.admin) {
            return NextResponse.json(
                await prisma.order.findMany({
                    include: {
                        user: true,
                        orderItems: {
                            include: { size: true, ingredients: true }
                        }
                    }
                }),
                {
                    status: 200
                }
            );
        } else {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            });

            return NextResponse.json(
                await prisma.order.findMany({
                    where: { userId: user.id },
                    include: {
                        user: true,
                        orderItems: {
                            include: {
                                size: true,
                                ingredients: true
                            }
                        }
                    }
                }),
                {
                    status: 200
                }
            );
        }
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
