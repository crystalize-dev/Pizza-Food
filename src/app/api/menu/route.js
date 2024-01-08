import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { name, description, image, price, sizes, ingredients, category } =
        await req.json();

    const menuItem = await prisma.menuItems.create({
        data: {
            name: name,
            description: description ? description : null,
            image: image ? image : null,
            price: price,
            sizes: sizes ? { create: [...sizes] } : [],
            category: {
                connectOrCreate: {
                    where: { id: category.id },
                    create: category
                }
            },
            ingredients: ingredients ? { create: [...ingredients] } : []
        }
    });

    return NextResponse.json(menuItem, { status: 200 });
}
export async function GET() {
    return NextResponse.json(
        await prisma.menuItems.findMany({
            include: { ingredients: true, sizes: true, category: true }
        })
    );
}
export async function PUT(req) {
    const {
        id,
        name,
        description,
        image,
        price,
        sizes,
        ingredients,
        category
    } = await req.json();

    await sizes.forEach((size) => {
        prisma.size.update({ where: { id: size.id }, data: size });
    });

    await ingredients.forEach((ingredient) => {
        prisma.ingredient.update({
            where: { id: ingredient.id },
            data: ingredient
        });
    });

    const updatedMenuitem = await prisma.menuItems.update({
        where: { id },
        data: {
            name: name,
            description: description ? description : null,
            image: image ? image : null,
            price: price,
            category: {
                connectOrCreate: {
                    where: { id: category.id },
                    create: category
                }
            }
        }
    });

    return NextResponse.json(updatedMenuitem);
}
export async function DELETE(req) {
    const { id } = await req.json();

    await prisma.size.deleteMany({
        where: { MenuId: id }
    });

    await prisma.ingredient.deleteMany({ where: { MenuId: id } });

    const res = await prisma.menuItems.delete({ where: { id: id } });

    return NextResponse.json(res);
}
