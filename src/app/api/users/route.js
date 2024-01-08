import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    return NextResponse.json(await prisma.user.findMany());
}

export async function DELETE(req) {
    const { id } = await req.json();

    return NextResponse.json(await prisma.user.delete({ where: { id: id } }));
}

export async function PUT(req) {
    const { email, name, image, address, phone, admin } = await req.json();

    return NextResponse.json(
        await prisma.user.update({
            where: { email },
            data: {
                name: name,
                image: image,
                address: address,
                phone: phone,
                admin: admin
            }
        })
    );
}
