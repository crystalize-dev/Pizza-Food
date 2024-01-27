import { Rubik } from 'next/font/google';
import './globals.css';
import React from 'react';
import { AppProvider } from '@/components/AppContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import MenuItemModal from '@/components/Modal/MenuItemModal';
import CartModal from '@/components/Modal/CartModal';

const roboto = Rubik({
    subsets: ['latin'],
    weight: ['400', '500', '600']
});

export const metadata = {
    title: 'Pizza Food - Best Pizza ever!',
    description: 'Pizza Pizza Pizza!'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" id={'root'}>
            <body className={roboto.className}>
                <main className="mx-auto flex h-screen w-full max-w-6xl flex-col gap-8 p-4 md:gap-0">
                    <AppProvider>
                        <Header />

                        <MenuItemModal />

                        <CartModal />

                        {children}

                        <Footer />
                    </AppProvider>
                </main>
            </body>
        </html>
    );
}
