'use client';
import React, { useContext, useState } from 'react';
import Input from '@/components/UI/Inputs/Input';
import Button from '@/components/UI/Buttons/Button';
import CategoryCard from '@/components/cards/CategoryCard';
import { AnimatePresence } from 'framer-motion';
import { useCategories } from '@/hooks/useCategories';
import AdminPanelWrapper from '@/components/PageSections/AdminPanelWrapper';
import { MenuContext } from '@/context/AppContext';

const Page = () => {
    const [currentEditing, setCurrentEditing] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    const { handleUpdate, handleDelete, handleNewCategory, loading } =
        useCategories({ categoryName, setCategoryName });

    const { menuData } = useContext(MenuContext);

    return (
        <AdminPanelWrapper title={'categories'}>
            <form
                onSubmit={handleNewCategory}
                className={
                    'my-12 flex w-full items-center gap-4 md:items-start'
                }
            >
                <Input
                    value={categoryName}
                    disabled={loading}
                    onChange={(e) => setCategoryName(e.target.value)}
                    label={'New category'}
                    className={'!w-full'}
                    placeholder={'Write a new category...'}
                />

                <Button
                    disabled={loading}
                    className={'!w-1/3 !rounded-lg'}
                    type="submit"
                >
                    Submit
                </Button>
            </form>

            <ul className={'flex w-full flex-col gap-2'}>
                <AnimatePresence>
                    {menuData?.categories.length === 0 ? (
                        <p
                            className={
                                'my-8 text-center text-3xl text-gray-400'
                            }
                        >
                            Nothing found!
                        </p>
                    ) : (
                        menuData.categories.map((category, index) => (
                            <CategoryCard
                                key={category.id}
                                index={index}
                                category={category}
                                active={currentEditing}
                                setActive={setCurrentEditing}
                                handleUpdate={handleUpdate}
                                handleDelete={handleDelete}
                                fetching={loading}
                            />
                        ))
                    )}
                </AnimatePresence>
            </ul>
        </AdminPanelWrapper>
    );
};

export default Page;
