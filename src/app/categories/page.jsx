'use client';
import React, { useContext, useState } from 'react';
import AdminPanel from '@/components/Layout/AdminPanel';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import toast from 'react-hot-toast';
import { MenuContext } from '@/components/AppContext';
import CategoryItem from '@/components/menu/CategoryItem';
import { AnimatePresence } from 'framer-motion';

const Page = () => {
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(null);

    const { menuData, addCategory, updateCategory, deleteCategory } =
        useContext(MenuContext);

    const handleNewCategory = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            toast.error('Write a category name!');
            return;
        }

        setLoading(true);
        const promise = fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: categoryName })
        })
            .then((res) => res.json())
            .then((data) => {
                addCategory(data.category);
                setCategoryName('');
            });

        await toast.promise(promise, {
            loading: 'Saving...',
            success: 'Category saved!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    const handleUpdate = async (category) => {
        setLoading(true);

        const promise = fetch('/api/categories', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        }).then((res) => {
            if (res.ok) {
                updateCategory(category.id, category.name);
            }
        });

        let res;
        await toast.promise(promise, {
            loading: 'Updating...',
            success: () => {
                res = true;
                return 'Category updated!';
            },
            error: () => {
                res = false;
                return 'Some error occurred!';
            }
        });

        setLoading(false);

        return res;
    };

    const handleDelete = async (categoryId) => {
        setLoading(true);

        const promise = fetch('/api/categories', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: categoryId })
        }).then(() => {
            deleteCategory(categoryId);
        });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Category deleted!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    return (
        <section className={'mx-auto w-full max-w-xl'}>
            <h1 className="mb-8 text-center text-4xl text-primary">
                Categories
            </h1>

            <AdminPanel active={'categories'} />

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
        </section>
    );
};

export default Page;
