'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';

export const DataContext = React.createContext(null);

export function AppProvider({ children }) {
    return (
        <SessionProvider>
            <DataProvider>{children}</DataProvider>
        </SessionProvider>
    );
}

export function DataProvider({ children }) {
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
        <DataContext.Provider value={{ userData, setUserData, session }}>
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
        </DataContext.Provider>
    );
}
