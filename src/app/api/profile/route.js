// noinspection JSCheckFunctionSignatures

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req) {
    const { user, order } = await req.json();

    if (!order) {
        try {
            return NextResponse.json(
                await prisma.user.update({
                    where: { email: user.email },
                    data: user
                }),
                { status: 200 }
            );
        } catch (err) {
            return NextResponse.json(
                {
                    error: err.message
                },
                { status: 400 }
            );
        }
    } else {
        try {
            const newOrder = await prisma.order.create({
                data: {
                    price: order.price,
                    user: {
                        connect: {
                            email: user.email
                        }
                    }
                }
            });

            await Promise.all(
                order.orderItems.map(async (item) => {
                    const sizeIds = item.size ? [item.size.id] : [];
                    const ingredientsIds = item.ingredients
                        ? item.ingredients.map((item) => item.id)
                        : [];

                    const sizes = await prisma.size.findMany({
                        where: { id: { in: sizeIds } }
                    });

                    const ingredients = ingredientsIds
                        ? await prisma.ingredient.findMany({
                              where: { id: { in: ingredientsIds } }
                          })
                        : [];

                    return prisma.orderItem.create({
                        data: {
                            ...item,
                            size:
                                sizes.length > 0
                                    ? { connect: { id: sizes[0].id } }
                                    : undefined,
                            ingredients:
                                ingredients.length > 0
                                    ? {
                                          connect: ingredients.map((i) => ({
                                              id: i.id
                                          }))
                                      }
                                    : undefined,
                            order: {
                                connect: { id: newOrder.id }
                            }
                        }
                    });
                })
            );

            await prisma.user.update({
                where: { email: user.email },
                data: {
                    orders: { connect: [{ id: newOrder.id }] }
                }
            });

            return NextResponse.json(newOrder, { status: 200 });
        } catch (err) {
            return NextResponse.json(
                {
                    error: err.message
                },
                { status: 400 }
            );
        }
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    return NextResponse.json(
        await prisma.user.findUnique({
            where: { email },
            include: {
                orders: {
                    include: {
                        orderItems: {
                            include: {
                                size: true,
                                ingredients: true
                            }
                        }
                    }
                }
            }
        }),
        { status: 200 }
    );
}
