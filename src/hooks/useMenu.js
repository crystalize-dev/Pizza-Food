import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const useMenu = () => {
    const [menuData, setMenuData] = React.useState({
        categories: [],
        menu: []
    });
    const [fetching, setFetching] = React.useState(false);

    const addCategory = (category) => {
        setMenuData({
            ...menuData,
            categories: [...menuData.categories, category]
        });
    };

    const updateCategory = (categoryId, newValue) => {
        setMenuData({
            ...menuData,
            categories: menuData.categories.map((category) => {
                if (category.id === categoryId)
                    return { id: categoryId, name: newValue };
                else return category;
            })
        });
    };

    const deleteCategory = (categoryId) => {
        setMenuData({
            ...menuData,
            categories: menuData.categories.filter(
                (category) => category.id !== categoryId
            )
        });
    };

    const addMenuItem = (menuItem) => {
        setMenuData({ ...menuData, menu: [...menuData.menu, menuItem] });
    };

    const updateMenuItem = (id, menuItem) => {
        setMenuData({
            ...menuData,
            menu: menuData.menu.map((item) => {
                if (item.id === id) return menuItem;
                else return item;
            })
        });
    };

    const deleteMenuItem = (id) => {
        setMenuData({
            ...menuData,
            menu: menuData.menu.filter((item) => item.id !== id)
        });
    };

    React.useEffect(() => {
        const newData = {};
        setFetching(true);
        axios
            .get('/api/categories')
            .then((res) => {
                if (res.status === 200) {
                    newData['categories'] = res.data;
                } else {
                    toast.error('Error on DataBase!');
                }
            })
            .then(() => {
                axios
                    .get('/api/menu')
                    .then((res) => {
                        if (res.status === 200) {
                            newData['menu'] = res.data;
                        } else {
                            toast.error('Error on DataBase!');
                        }
                    })
                    .then(() => {
                        setMenuData(newData);
                        setFetching(false);
                    })
                    .catch((err) => toast.error(err));
            })
            .catch((err) => toast.error(err));
    }, []);

    return {
        menuData,
        categoriesActions: {
            addCategory,
            updateCategory,
            deleteCategory
        },
        menuActions: {
            addMenuItem,
            updateMenuItem,
            deleteMenuItem
        },
        fetching
    };
};
