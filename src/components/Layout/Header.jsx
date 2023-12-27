'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Button from './Button';
import Icon from '../icon/Icon';
import Modal from './Modal';
import { DataContext } from '@/components/AppContext';

export default function Header() {
    const [sidebar, setSidebar] = useState(false);

    const { userData, session } = useContext(DataContext);

    return (
        <header className="flex h-16 items-center justify-between">
            <Modal visible={sidebar} setVisible={setSidebar} />

            <nav className="flex h-16 w-full items-center justify-between gap-4 px-4 text-inactive md:justify-normal">
                <Link
                    className="relative h-16 w-44 text-2xl font-semibold text-primary"
                    href="/"
                >
                    <Image
                        src="/logo.png"
                        alt="logo"
                        className="h-full object-contain"
                        priority={true}
                        width={250}
                        height={250}
                    />
                </Link>

                <div className="hidden h-full w-fit items-center gap-4 px-4 md:flex">
                    <Link
                        href={'/'}
                        className="group transition-all hover:!text-primary"
                    >
                        Home
                        <hr className="w-full scale-x-0 rounded-xl border border-primary transition-all group-hover:scale-x-100" />
                    </Link>
                    <Link
                        href={'/menu'}
                        className="group transition-all hover:text-primary"
                    >
                        Menu
                        <hr className="w-full scale-x-0 rounded-xl border border-primary transition-all group-hover:scale-x-100" />
                    </Link>
                    <Link
                        href={'/about'}
                        className="group transition-all hover:text-primary"
                    >
                        About
                        <hr className="w-full scale-x-0 rounded-xl border border-primary transition-all group-hover:scale-x-100" />
                    </Link>
                    <Link
                        href={'/contact'}
                        className="group transition-all hover:text-primary"
                    >
                        Contact
                        <hr className="w-full scale-x-0 rounded-xl border border-primary transition-all group-hover:scale-x-100" />
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    {session.status === 'authenticated' && (
                        <Link href={'/profile'}>
                            <Icon
                                path={
                                    'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                                }
                            />
                        </Link>
                    )}

                    <Icon
                        onClick={() => setSidebar(true)}
                        className={
                            'cursor-pointer transition-all hover:text-primary'
                        }
                        path={'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'}
                    />
                </div>
            </nav>

            <nav className="hidden items-center gap-4 px-4 text-inactive md:flex">
                {session.status === 'unauthenticated' ? (
                    <>
                        <Link
                            href={'/login'}
                            className="transition-all hover:text-primary"
                        >
                            Login
                        </Link>
                        <Link
                            className="whitespace-nowrap rounded-full border-2 border-solid border-transparent bg-primary px-8 py-2 text-white transition-all hover:border-primary hover:bg-transparent hover:text-primary"
                            href={'/register'}
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/profile"
                            className="whitespace-nowrap transition-all hover:text-primary"
                        >
                            {userData.name
                                ? 'Hello, ' + userData.name.split(' ')[0]
                                : userData.email}
                        </Link>
                        <Button onClick={() => signOut()}>Logout</Button>
                    </>
                )}
            </nav>
        </header>
    );
}
