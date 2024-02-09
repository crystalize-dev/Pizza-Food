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
export const ModalContext = React.createContext(null);

export function AppProvider({ children }) {
    return (
        <SessionProvider>
            <MenuProvider>
                <ModalProvider>
                    <UserProvider>
                        <CartProvider>
                            <Toaster />
                            {children}
                        </CartProvider>
                    </UserProvider>
                </ModalProvider>
            </MenuProvider>
        </SessionProvider>
    );
}

function UserProvider({ children }) {
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
    const { menuData, categoriesActions, menuActions, fetching } = useMenu();

    return (
        <MenuContext.Provider
            value={{
                menuData,
                categoriesActions,
                menuActions
            }}
        >
            {fetching ? (
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
        </MenuContext.Provider>
    );
}

function CartProvider({ children }) {
    const session = useSession();
    const {
        userCart,
        addToCart,
        deleteFromCart,
        decreaseAmount,
        increaseAmount,
        proceedOrder,
        fetching
    } = useCart(session.data?.user);

    return (
        <CartContext.Provider
            value={{
                userCart,
                addToCart,
                decreaseAmount,
                deleteFromCart,
                increaseAmount,
                proceedOrder,
                fetching
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

function ModalProvider({ children }) {
    const [menuItemModal, setMenuItemModal] = useState(false);
    const [cartModal, setCartModal] = useState(false);
    const openMenuItemModal = (menuItem) => {
        setMenuItemModal(menuItem);
    };
    const closeMenuItemModal = () => {
        setMenuItemModal(false);
    };

    const toggleCartModal = (option) => {
        setCartModal(option);
    };

    return (
        <ModalContext.Provider
            value={{
                openMenuItemModal,
                closeMenuItemModal,
                menuItemModal,
                cartModal,
                toggleCartModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
