// noinspection JSCheckFunctionSignatures

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(await prisma.user.findMany(), { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(req) {
    const { id } = await req.json();

    try {
        return NextResponse.json(
            await prisma.user.delete({ where: { id: id } }),
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function PUT(req) {
    const { email, name, image, address, phone, admin } = await req.json();

    try {
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
            }),
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
