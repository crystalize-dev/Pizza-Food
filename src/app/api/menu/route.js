import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { name, description, image, price, sizes, ingredients, category } =
        await req.json();

    // Создаем или обновляем массив Size
    const sizePromises = sizes.map(async (size) => {
        return prisma.size.upsert({
            where: { name: size.name },
            update: {},
            create: { name: size.name, price: size.price }
        });
    });

    const sizesPromises = await Promise.all(sizePromises);

    // Создаем или обновляем массив Ingredient
    const ingredientPromises = ingredients.map(async (ingredient) => {
        return prisma.ingredient.upsert({
            where: { name: ingredient.name },
            update: {},
            create: { name: ingredient.name, price: ingredient.price }
        });
    });

    const ingredientsPromises = await Promise.all(ingredientPromises);

    // Создаем новый MenuItem, связывая существующие или новые Size и Ingredient
    const createdMenuItem = await prisma.menuItems.create({
        data: {
            name: name,
            description: description,
            price: price,
            image: image,
            sizes: { connect: sizesPromises.map((size) => ({ id: size.id })) },
            ingredients: {
                connect: ingredientsPromises.map((ingredient) => ({
                    id: ingredient.id
                }))
            },
            category: {
                connectOrCreate: {
                    where: { id: category.id },
                    create: category
                }
            }
        }
    });

    return NextResponse.json(createdMenuItem, { status: 200 });
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
    const { id: menuItemId } = await req.json();
    // Находим связанные записи в Sizes.MenuItems
    const sizesWithMenuItem = await prisma.size.findMany({
        where: {
            menuItems: {
                some: {
                    id: menuItemId
                }
            }
        },
        include: {
            menuItems: true
        }
    });

    // Удаляем связи с Sizes.MenuItems
    await Promise.all(
        sizesWithMenuItem.map(async (size) => {
            const updatedMenuItems = size.menuItems.filter(
                (item) => item.id !== menuItemId
            );
            await prisma.size.update({
                where: {
                    id: size.id
                },
                data: {
                    menuItems: {
                        set: updatedMenuItems
                    }
                }
            });
        })
    );

    // Находим связанные записи в Ingredients.MenuItems
    const ingredientsWithMenuItem = await prisma.ingredient.findMany({
        where: {
            menuItems: {
                some: {
                    id: menuItemId
                }
            }
        },
        include: {
            menuItems: true
        }
    });

    // Удаляем связи с Ingredients.MenuItems
    await Promise.all(
        ingredientsWithMenuItem.map(async (ingredient) => {
            const updatedMenuItems = ingredient.menuItems.filter(
                (item) => item.id !== menuItemId
            );
            await prisma.ingredient.update({
                where: {
                    id: ingredient.id
                },
                data: {
                    menuItems: {
                        set: updatedMenuItems
                    }
                }
            });
        })
    );

    // Удаляем сам MenuItem
    const res = await prisma.menuItems.delete({
        where: {
            id: menuItemId
        }
    });

    return NextResponse.json(res, { status: 200 });
}
