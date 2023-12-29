import { useContext, useState } from 'react';
import { MenuContext } from '@/components/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useFetchCategories = ({ categoryName, setCategoryName }) => {
    const [loading, setLoading] = useState(false);

    const { menuData, categoriesActions } = useContext(MenuContext);

    const handleNewCategory = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            toast.error('Write a category name!');
            return;
        }

        setLoading(true);

        const promise = axios
            .post('/api/categories', { name: categoryName })
            .then((res) => {
                if (res.status === 200) {
                    categoriesActions.addCategory(res.data);
                    setCategoryName('');
                } else {
                    toast.error('Error on DataBase!');
                }
            })
            .catch((err) => toast.error(err));

        await toast.promise(promise, {
            loading: 'Saving...',
            success: 'Category saved!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    const handleUpdate = async (category) => {
        setLoading(true);
        let response;

        const promise = axios
            .put('/api/categories', category)
            .then((res) => {
                if (res.status === 200) {
                    categoriesActions.updateCategory(
                        category.id,
                        category.name
                    );
                } else {
                    toast.error('Error on DataBase!');
                    response = false;
                }
            })
            .catch((err) => toast.error(err));

        await toast.promise(promise, {
            loading: 'Updating...',
            success: () => {
                response = true;
                return 'Category updated!';
            },
            error: () => {
                response = false;
                return 'Some error occurred!';
            }
        });

        setLoading(false);

        return response;
    };

    const handleDelete = async (categoryId) => {
        setLoading(true);

        const promise = axios
            .delete('/api/categories', { data: { id: categoryId } })
            .then((res) => {
                if (res.status === 200) {
                    categoriesActions.deleteCategory(categoryId);
                } else {
                    toast.error('Error on DataBase!');
                }
            })
            .catch((err) => toast.error(err));

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
        loading
    };
};
