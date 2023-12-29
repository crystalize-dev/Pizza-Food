import { useContext, useState } from 'react';
import { MenuContext } from '@/components/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useFetchMenu = ({
    name,
    description,
    image,
    price,
    clearInputs
}) => {
    const [loading, setLoading] = useState(false);
    const { menuData, addMenuItem, updateMenuItem, deleteMenuItem } =
        useContext(MenuContext);

    const handleNewMenuItem = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error('Provide a name!');
            return;
        }

        const regex = /^[1-9]\d*$/;

        if (!regex.test(price)) {
            toast.error('Provide a correct price!');
            return;
        }

        setLoading(true);

        const promise = axios
            .post('/api/menu', {
                name: name,
                description: description,
                image: image,
                price: price
            })
            .then((res) => {
                if (res.status === 200) {
                    addMenuItem(res.data);
                    clearInputs();
                } else {
                    toast.error('Error on DataBase!');
                }
            })
            .catch((err) => toast.error(err));

        await toast.promise(promise, {
            loading: 'Saving...',
            success: 'Menu item saved!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    const handleUpdate = async (menuItem) => {
        setLoading(true);
        let response;

        const promise = axios
            .put('/api/menu', { id: menuItem.id, data: menuItem })
            .then((res) => {
                if (res.status === 200) {
                    updateMenuItem(menuItem.id, menuItem);
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
                return 'Menu item updated!';
            },
            error: () => {
                response = false;
                return 'Some error occurred!';
            }
        });

        setLoading(false);

        return response;
    };

    const handleDelete = async (id) => {
        setLoading(true);

        const promise = axios
            .delete('/api/menu', { data: { id: id } })
            .then((res) => {
                if (res.status === 200) {
                    deleteMenuItem(id);
                } else {
                    toast.error('Error on DataBase!');
                }
            })
            .catch((err) => toast.error(err));

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Menu item deleted!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    return {
        menuData,
        handleNewMenuItem,
        loading,
        setLoading,
        handleUpdate,
        handleDelete
    };
};
