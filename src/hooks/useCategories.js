import { useContext, useState } from 'react';
import { MenuContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { customAxios } from '@/axios/customAxios';

export const useCategories = ({ categoryName, setCategoryName }) => {
    const [loading, setLoading] = useState(false);
    const url = 'categories';

    const { menuData, categoriesActions } = useContext(MenuContext);

    const handleNewCategory = async (e) => {
        e.preventDefault();

        // Если поле имя пустое
        if (!categoryName) {
            toast.error('Type a category name!');
            return;
        }

        // Если категория уже существует
        if (
            menuData.categories.find(
                (category) => category.name === categoryName
            )
        ) {
            toast.error('This category already exists!');
            return;
        }

        await customAxios('POST', url, setLoading, {
            data: {
                name: categoryName
            },
            actionOnSuccess: (data) => {
                categoriesActions.addCategory(data);
                setCategoryName('');
            },
            loadingString: 'Saving...',
            successString: 'Category created!'
        });
    };

    const handleUpdate = async (category) => {
        let response;

        // Если категория уже существует
        if (
            menuData.categories.find(
                (oldCategory) => oldCategory.name === category.name
            )
        ) {
            toast.error('This category already exists!');
            response = false;
            setLoading(false);
            return;
        }

        await customAxios('PUT', url, setLoading, {
            data: category,
            actionOnSuccess: (data) => {
                response = true;
                categoriesActions.updateCategory(data.id, data.name);
            },
            actionOnFailure: () => {
                response = false;
            },
            loadingString: 'Updating...',
            successString: 'Category updated!'
        });

        return response;
    };

    const handleDelete = async (categoryId) => {
        await customAxios('DELETE', url, setLoading, {
            data: {
                data: { id: categoryId }
            },
            actionOnSuccess: () => {
                categoriesActions.deleteCategory(categoryId);
            },
            loadingString: 'Deleting...',
            successString: 'Category deleted!'
        });
    };

    return {
        handleUpdate,
        handleDelete,
        handleNewCategory,
        loading
    };
};
