'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useMenu } from '@/hooks/useMenu';
import axios from 'axios';
import { useCart } from '@/hooks/useCart';

export const UserDataContext = React.createContext(null);
export const MenuContext = React.createContext(null);
export const CartContext = React.createContext(null);
export const MenuItemModalContext = React.createContext(null);

export function AppProvider({ children }) {
    return (
        <SessionProvider>
            <MenuProvider>
                <MenuItemModalProvider>
                    <DataProvider>
                        <CartProvider>
                            <Toaster />
                            {children}
                        </CartProvider>
                    </DataProvider>
                </MenuItemModalProvider>
            </MenuProvider>
        </SessionProvider>
    );
}

function DataProvider({ children }) {
    const [userData, setUserData] = React.useState(null);
    const session = useSession();

    React.useEffect(() => {
        if (session.status === 'authenticated') {
            axios
                .get('/api/profile')
                .then((res) => {
                    if (res.status === 200) {
                        setUserData(res.data);
                    }
                })
                .catch((err) => toast.error(err));
        }
    }, [session, session.status]);

    return (
        <UserDataContext.Provider value={{ userData, setUserData, session }}>
            {(session.status === 'authenticated' && !userData) ||
            session.status === 'loading' ? (
                <div
                    className={
                        'absolute left-0 top-0 flex h-screen w-screen items-center justify-center'
                    }
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
    const { menuData, categoriesActions, menuActions } = useMenu();

    return (
        <MenuContext.Provider
            value={{
                menuData,
                categoriesActions,
                menuActions
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}

function CartProvider({ children }) {
    const session = useSession();
    const { userCart, addToCart, deleteFromCart, decreaseAmount } = useCart(
        session.data?.user
    );

    return (
        <CartContext.Provider
            value={{ userCart, addToCart, decreaseAmount, deleteFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

function MenuItemModalProvider({ children }) {
    const [menuItemModal, setMenuItemModal] = useState(false);
    const openMenuItemModal = (menuItem) => {
        setMenuItemModal(menuItem);
    };
    const closeMenuItemModal = () => {
        setMenuItemModal(false);
    };

    return (
        <MenuItemModalContext.Provider
            value={{ openMenuItemModal, closeMenuItemModal, menuItemModal }}
        >
            {children}
        </MenuItemModalContext.Provider>
    );
}
