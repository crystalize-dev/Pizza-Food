import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { name, description, image, price } = await req.json();

    if (!name || !image) {
        return NextResponse.json(
            {
                error: 'Empty name for category!'
            },
            { status: 400 }
        );
    }

    const menuItem = await prisma.menuItems.create({
        data: {
            name: name,
            description: description ? description : null,
            image: image ? image : null,
            price: price
        }
    });

    return NextResponse.json(menuItem, { status: 200 });
}
export async function GET() {
    return NextResponse.json(await prisma.menuItems.findMany());
}
export async function PUT(req) {
    const { id, data } = await req.json();

    const res = await prisma.menuItems.update({
        where: { id: id },
        data: data
    });

    return NextResponse.json(res);
}
export async function DELETE(req) {
    const { id } = await req.json();

    const res = await prisma.menuItems.delete({ where: { id: id } });

    return NextResponse.json(res);
}
