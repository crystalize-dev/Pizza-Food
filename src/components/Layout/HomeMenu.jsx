'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../UI/SectionHeaders';
import { MenuContext } from '@/components/AppContext';
import MenuCard from '@/components/cards/MenuCard';

export default function HomeMenu() {
    const { menuData } = useContext(MenuContext);

    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        setPizzas(
            menuData.menu
                .filter((pizza) => pizza.category.name === 'Pizza')
                .slice(-3)
        );
    }, [menuData.menu]);

    return (
        <section className={'h-fit w-full'}>
            <div className="absolute left-0 right-0 hidden md:block">
                <div className="absolute -top-24 left-0 -z-10 h-72 w-80 object-contain">
                    <Image
                        src="/salad1.png"
                        alt="salad1"
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="absolute -top-48 right-0 h-72 w-80 object-contain">
                    <Image
                        src="/salad2.png"
                        alt="salad1"
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>

            <SectionHeaders
                subHeader={'Check out'}
                mainHeader={'Our best sellers'}
            />

            {pizzas.length === 0 ? (
                <h1 className={'mt-16 text-center text-3xl text-gray-300'}>
                    Nothing found!
                </h1>
            ) : (
                <div
                    className={
                        'flex h-fit w-full flex-col items-center gap-4 md:flex-row'
                    }
                >
                    {pizzas.map((pizza) => (
                        <MenuCard key={pizza.id} menuItem={pizza} />
                    ))}
                </div>
            )}
        </section>
    );
}
