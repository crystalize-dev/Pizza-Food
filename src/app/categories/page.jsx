'use client';
import React from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import CategoryItem from '@/components/menu/CategoryItem';
import { AnimatePresence } from 'framer-motion';
import { useCategories } from '@/hooks/useCategories';
import AdminPanelWrapper from '@/components/Layout/AdminPanelWrapper';

const Page = () => {
    const {
        handleUpdate,
        handleDelete,
        handleNewCategory,
        loading,
        editing,
        setEditing,
        categoryName,
        setCategoryName,
        menuData
    } = useCategories();

    return (
        <AdminPanelWrapper title={'categories'} isAdmin={true}>
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
                    {menuData.categories.map((category, index) => (
                        <CategoryItem
                            key={category.id}
                            index={index}
                            category={category}
                            active={editing}
                            setActive={setEditing}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                            fetching={loading}
                        />
                    ))}
                </AnimatePresence>
            </ul>
        </AdminPanelWrapper>
    );
};

export default Page;
