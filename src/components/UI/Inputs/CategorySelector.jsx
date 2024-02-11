'use client';
import React, { useContext } from 'react';
import Button from '@/components/UI/Buttons/Button';
import { MenuContext } from '@/context/AppContext';
import MySelect from '@/components/UI/Inputs/MySelect';

const CategorySelector = ({
    activeFilter,
    setActiveFilter,
    type = 'buttons'
}) => {
    const { menuData } = useContext(MenuContext);

    const options = [
        { value: 'All', label: 'All' },
        ...menuData.categories.map((category) => ({
            value: category.name,
            label: category.name
        }))
    ];

    return (
        <>
            {type === 'buttons' ? (
                <nav
                    className={'flex w-full items-center justify-center gap-4'}
                >
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
            ) : (
                <MySelect
                    className={'!w-fit !min-w-[8rem]'}
                    options={options}
                    current={activeFilter}
                    setCurrent={setActiveFilter}
                />
            )}
        </>
    );
};

export default CategorySelector;
