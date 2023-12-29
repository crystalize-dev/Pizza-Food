import { useContext, useState } from 'react';
import { MenuContext } from '@/components/AppContext';
import toast from 'react-hot-toast';

export const useMenu = ({ name, description, image, price, clearInputs }) => {
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
        const promise = fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description,
                image: image,
                price: parseInt(price)
            })
        })
            .then((res) => res.json())
            .then((data) => {
                addMenuItem(data.menuItem);
                clearInputs();
            });

        await toast.promise(promise, {
            loading: 'Saving...',
            success: 'Menu item saved!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    const handleUpdate = async (menuItem) => {
        setLoading(true);

        const promise = fetch('/api/menu', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: menuItem.id, data: menuItem })
        }).then((res) => {
            if (res.ok) {
                updateMenuItem(menuItem.id, menuItem);
            }
        });

        let res;
        await toast.promise(promise, {
            loading: 'Updating...',
            success: () => {
                res = true;
                return 'Menu item updated!';
            },
            error: () => {
                res = false;
                return 'Some error occurred!';
            }
        });

        setLoading(false);

        return res;
    };

    const handleDelete = async (id) => {
        setLoading(true);

        const promise = fetch('/api/menu', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        }).then(() => {
            deleteMenuItem(id);
        });

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
