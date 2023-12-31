import { Rubik } from 'next/font/google';
import './globals.css';
import React from 'react';
import { AppProvider } from '@/components/AppContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const roboto = Rubik({
    subsets: ['latin'],
    weight: ['500', '600', '700']
});

export const metadata = {
    title: 'Pizza Food - Best Pizza ever!',
    description: 'Pizza Pizza Pizza!'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <main className="mx-auto flex h-full w-full max-w-6xl flex-col gap-8 p-4">
                    <AppProvider>
                        <Header />

                        {children}

                        <Footer />
                    </AppProvider>
                </main>
            </body>
        </html>
    );
}
