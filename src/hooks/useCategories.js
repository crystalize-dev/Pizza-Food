import { useContext, useState } from 'react';
import { MenuContext } from '@/components/AppContext';
import toast from 'react-hot-toast';

export const useCategories = () => {
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

    return {
        menuData,
        handleUpdate,
        handleDelete,
        handleNewCategory,
        loading,
        editing,
        setEditing,
        categoryName,
        setCategoryName
    };
};
