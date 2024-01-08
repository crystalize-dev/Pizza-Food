'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Button from '../UI/Button';
import Icon from '../icon/Icon';
import MobileModal from '../UI/Modal/MobileModal';
import { UserDataContext } from '@/components/AppContext';

export default function Header() {
    const [sidebar, setSidebar] = useState(false);

    const { userData, session } = useContext(UserDataContext);

    return (
        <header className="flex max-h-[6rem] min-h-[6rem] items-center justify-between">
            <MobileModal visible={sidebar} setVisible={setSidebar} />

            <nav className="flex h-full max-h-full w-full items-center justify-between gap-4 px-4 text-inactive md:justify-normal">
                <Link className="relative h-24 w-24" href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        priority={true}
                        fill={true}
                        className={'scale-150'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                            <Icon icon={'profile'} />
                        </Link>
                    )}

                    <Icon onClick={() => setSidebar(true)} icon={'menu'} />
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
                            href={'/profile'}
                            className="whitespace-nowrap transition-all hover:text-primary"
                        >
                            {userData.name
                                ? 'Hello, ' + userData.name.split(' ')[0]
                                : userData.email}
                        </Link>
                        <Button variant={'submit'} onClick={() => signOut()}>
                            Logout
                        </Button>
                    </>
                )}
            </nav>
        </header>
    );
}
