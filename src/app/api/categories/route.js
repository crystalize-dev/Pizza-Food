// noinspection JSCheckFunctionSignatures

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json(
            {
                error: 'Empty name for category!'
            },
            { status: 400 }
        );
    }

    try {
        const category = await prisma.categories.create({ data: { name } });

        return NextResponse.json(category, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: err.message
            },
            { status: 400 }
        );
    }
}
export async function GET() {
    try {
        const categories = await prisma.categories.findMany();

        return NextResponse.json(categories, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: err.message
            },
            { status: 400 }
        );
    }
}
export async function PUT(req) {
    const data = await req.json();

    try {
        const res = await prisma.categories.update({
            where: { id: data.id },
            data: { name: data.name }
        });

        return NextResponse.json(res, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: err.message
            },
            { status: 400 }
        );
    }
}
export async function DELETE(req) {
    const { id } = await req.json();

    try {
        const isMenuItemsExists = !!(await prisma.menuItems.findFirst({
            where: { categoryId: id }
        }));

        if (isMenuItemsExists) {
            return NextResponse.json(
                { error: 'This category have some menu items!' },
                { status: 400 }
            );
        }

        const res = await prisma.categories.delete({ where: { id: id } });

        return NextResponse.json(res, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            {
                error: err.message
            },
            { status: 400 }
        );
    }
}
