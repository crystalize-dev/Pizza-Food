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

    const category = await prisma.categories.create({ data: { name: name } });

    return NextResponse.json({ category }, { status: 200 });
}
export async function GET() {
    return NextResponse.json(await prisma.categories.findMany());
}
export async function PUT(req) {
    const data = await req.json();

    const res = await prisma.categories.update({
        where: { id: data.id },
        data: { name: data.name }
    });

    return NextResponse.json(res);
}
export async function DELETE(req) {
    const { id } = await req.json();

    const res = await prisma.categories.delete({ where: { id: id } });

    return NextResponse.json(res);
}
