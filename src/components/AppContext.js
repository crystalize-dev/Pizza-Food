'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useMenu } from '@/hooks/useMenu';
import axios from 'axios';

export const UserDataContext = React.createContext(null);
export const MenuContext = React.createContext(null);

export function AppProvider({ children }) {
    return (
        <SessionProvider>
            <MenuProvider>
                <DataProvider>
                    <Toaster />

                    {children}
                </DataProvider>
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
