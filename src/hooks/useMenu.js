import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { customAxios } from '@/axios/customAxios';

export const useMenu = () => {
    const [menuData, setMenuData] = React.useState({
        categories: [],
        menu: []
    });
    const [fetching, setFetching] = React.useState(false);
    const [loadingModal, setLoadingModal] = React.useState(false);

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

    const handleAddNewMenuItem = async (newItem, onSuccess) => {
        await customAxios('POST', 'menu', setLoadingModal, {
            data: newItem,
            actionOnSuccess: (data) => {
                newItem['id'] = data.id;
                addMenuItem(newItem);
                onSuccess && onSuccess();
            },
            loadingString: 'Loading...',
            successString: 'Success!'
        });
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

    const handleUpdateMenuItem = async (updatedItem, onSuccess) => {
        await customAxios('PUT', 'menu', setLoadingModal, {
            data: updatedItem,
            actionOnSuccess: (data) => {
                onSuccess && onSuccess();
                updateMenuItem(data.id, data);
            }
        });
    };

    const deleteMenuItem = (id) => {
        setMenuData({
            ...menuData,
            menu: menuData.menu.filter((item) => item.id !== id)
        });
    };

    const handleDeleteMenuItem = async (menuItem) => {
        await customAxios('DELETE', 'menu', setLoadingModal, {
            data: { data: menuItem },
            actionOnSuccess: () => {
                deleteMenuItem(menuItem.id);
            },
            loadingString: 'Deleting...',
            successString: 'Menu item deleted!'
        });
    };

    React.useEffect(() => {
        const newData = { menu: [], categories: [] };

        customAxios('GET', 'menu', setFetching, {
            actionOnSuccess: (data) => {
                newData.menu = data;

                customAxios('GET', 'categories', setFetching, {
                    actionOnSuccess: (data) => {
                        newData.categories = data;
                        setMenuData(newData);
                    }
                }).then(() => {});
            }
        }).then(() => {});
    }, []);

    return {
        menuData,
        menuActions: {
            handleAddNewMenuItem,
            handleUpdateMenuItem,
            handleDeleteMenuItem
        },
        categoriesActions: {
            addCategory,
            deleteCategory,
            updateCategory
        },
        fetching,
        loadingModal,
        setLoadingModal
    };
};
