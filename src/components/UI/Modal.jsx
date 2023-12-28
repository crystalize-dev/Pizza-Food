'use client';
import React from 'react';
import Icon from '../icon/Icon';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Modal({ visible, setVisible }) {
    const session = useSession();
    const { status } = session;

    return (
        <div
            className={`absolute top-0 z-50 flex h-full w-full items-center justify-center bg-white transition-all ${
                visible ? 'left-0' : '!-left-full'
            }`}
        >
            <Icon
                icon={'close'}
                onClick={() => setVisible(false)}
                className={
                    'absolute right-4 top-4 cursor-pointer transition-all hover:scale-125'
                }
            />
            <div className="flex flex-col gap-8 text-center text-2xl">
                <Link href="/" onClick={() => setVisible(false)}>
                    Home
                </Link>
                <Link href="/menu" onClick={() => setVisible(false)}>
                    Menu
                </Link>
                <Link href="/about" onClick={() => setVisible(false)}>
                    About
                </Link>
                <Link href="/contact" onClick={() => setVisible(false)}>
                    Contact
                </Link>
                {status === 'unauthenticated' ? (
                    <>
                        <Link href="/login" onClick={() => setVisible(false)}>
                            Login
                        </Link>
                        <Link
                            href="/register"
                            onClick={() => setVisible(false)}
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <div className={'cursor-pointer'} onClick={() => signOut()}>
                        Sign out
                    </div>
                )}
            </div>
        </div>
    );
}
