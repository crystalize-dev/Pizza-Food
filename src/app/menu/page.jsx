'use client';
import React, { useContext, useState } from 'react';
import { MenuContext } from '@/context/AppContext';
import MenuCard from '@/components/cards/MenuCard';
import Button from '@/components/UI/Buttons/Button';

const Page = () => {
    const { menuData } = useContext(MenuContext);

    const [activeFilter, setActiveFilter] = useState('All');
    const customSort = (array) => {
        const sortedArray = array.slice();

        sortedArray.sort(function (a, b) {
            const order = { Pizza: 1, Drinks: 2, Deserts: 3 };

            const orderA = order[a.name] || 9999; // Если элемент не входит в указанные, ставим его в конец
            const orderB = order[b.name] || 9999;

            // Сравниваем порядковые номера
            return orderA - orderB;
        });

        if (activeFilter === 'All') {
            return sortedArray;
        } else {
            return sortedArray.filter((item) => item.name === activeFilter);
        }
    };

    return (
        <section className={'my-8 flex flex-col gap-8'}>
            <nav className={'flex w-full items-center justify-center gap-4'}>
                <Button
                    type={'button'}
                    variant={activeFilter === 'All' ? 'submit' : 'inactive'}
                    className={`!w-fit ${
                        activeFilter === 'All' &&
                        'hover:!bg-primary hover:!text-white'
                    }`}
                    onClick={() => setActiveFilter('All')}
                >
                    All
                </Button>

                {menuData.categories.map((category) => (
                    <Button
                        type={'button'}
                        variant={
                            activeFilter === category.name
                                ? 'submit'
                                : 'inactive'
                        }
                        key={category.id}
                        className={`!w-fit ${
                            activeFilter === category.name &&
                            'hover:!bg-primary hover:!text-white'
                        }`}
                        onClick={() => setActiveFilter(category.name)}
                    >
                        {category.name}
                    </Button>
                ))}
            </nav>

            {customSort(menuData.categories).map((category) => (
                <div key={category.id} className={'flex flex-col gap-4'}>
                    {activeFilter === 'All' && (
                        <h1 className={'text-center text-4xl text-primary'}>
                            {category.name}
                        </h1>
                    )}

                    {menuData?.menu?.length !== 0 ? (
                        <div
                            className={
                                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
                            }
                        >
                            {menuData.menu
                                .filter(
                                    (menuItem) =>
                                        menuItem.category.name === category.name
                                )
                                .map((item) => (
                                    <MenuCard key={item.id} menuItem={item} />
                                ))}
                        </div>
                    ) : (
                        <h1
                            className={
                                'my-4 text-center text-2xl font-bold text-zinc-300'
                            }
                        >
                            Nothing found!
                        </h1>
                    )}
                </div>
            ))}
        </section>
    );
};

export default Page;
