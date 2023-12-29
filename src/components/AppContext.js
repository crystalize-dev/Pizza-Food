'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export const UserDataContext = React.createContext(null);
export const MenuContext = React.createContext(null);

export function AppProvider({ children }) {
    return (
        <SessionProvider>
            <MenuProvider>
                <UserDataProvider>{children}</UserDataProvider>
            </MenuProvider>
        </SessionProvider>
    );
}

function UserDataProvider({ children }) {
    const [userData, setUserData] = React.useState(null);
    const session = useSession();

    React.useEffect(() => {
        if (session.status === 'authenticated') {
            fetch('/api/profile', { method: 'GET' })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setUserData({
                            name: data.name,
                            image: data.image,
                            address: data.address,
                            phone: data.phone,
                            email: data.email,
                            admin: data.admin
                        });
                    }
                })
                .catch(() => {
                    toast.error('Error on connecting to DataBase!');
                });
        }
    }, [session, session.status]);

    return (
        <UserDataContext.Provider value={{ userData, setUserData, session }}>
            <Toaster />

            {(session.status === 'authenticated' && !userData) ||
            session.status === 'loading' ? (
                <div
                    className={'flex h-full w-full items-center justify-center'}
                >
                    <InfinitySpin color={'var(--main)'} />
                </div>
            ) : (
                children
            )}
        </UserDataContext.Provider>
    );
}

function MenuProvider({ children }) {
    const [menuData, setMenuData] = React.useState({
        categories: [],
        menu: []
    });

    React.useEffect(() => {
        fetch('/api/categories', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setMenuData({ ...menuData, categories: data });
            })
            .catch(() => {
                toast.error('Error on connecting to DataBase!');
            });
    }, []);

    const addCategory = (category) => {
        setMenuData({
            ...menuData,
            categories: [...menuData.categories, category]
        });
    };

    const updateCategory = (categoryId, newValue) => {
        setMenuData({
            ...menuData,
            categories: [
                ...menuData.categories.map((category) => {
                    if (category.id === categoryId)
                        return { id: categoryId, name: newValue };
                    else return category;
                })
            ]
        });
    };

    const deleteCategory = (categoryId) => {
        setMenuData({
            ...menuData,
            categories: [
                ...menuData.categories.filter(
                    (category) => category.id !== categoryId
                )
            ]
        });
    };

    const addMenuItem = (menuItem) => {
        setMenuData({ ...menuData, menu: [...menuData.menu, menuItem] });
    };

    const updateMenuItem = (id, menuItem) => {
        setMenuData({
            ...menuData,
            menu: [
                ...menuData.menu.map((item) => {
                    if (item.id === id) return menuItem;
                    else return item;
                })
            ]
        });
    };

    const deleteMenuItem = (id) => {
        setMenuData({
            ...menuData,
            menu: [...menuData.menu.filter((item) => item.id !== id)]
        });
    };

    return (
        <MenuContext.Provider
            value={{
                menuData,
                addCategory,
                updateCategory,
                deleteCategory,
                addMenuItem,
                updateMenuItem,
                deleteMenuItem
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}
