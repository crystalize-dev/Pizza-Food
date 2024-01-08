'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/UI/Input';
import Button from '../../components/UI/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    async function handleFormSubmit(ev) {
        ev.preventDefault();

        setLoading(true);
        const promise = signIn('credentials', {
            email,
            password,
            redirect: false
        }).then((res) => {
            setLoading(false);

            if (!res.ok) {
                throw new Error('Please check your password and email!');
            } else {
                router.push('/');
            }
        });

        await toast.promise(promise, {
            loading: 'Loading...',
            success: 'Success!',
            error: (err) => `${err}`
        });
    }
    const authWithGoogle = () => {
        setLoading(true);
        signIn('google', { callbackUrl: '/' });
    };

    return (
        <section className="mt-8">
            <h1 className="mb-8 text-center text-4xl text-primary">Login</h1>
            <form
                className="mx-auto flex max-w-xs flex-col gap-4"
                onSubmit={handleFormSubmit}
            >
                <Input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="example@mail.com"
                    value={email}
                    required={true}
                    disabled={loading}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={password}
                    required={true}
                    disabled={loading}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className={'!w-full !rounded-lg'}
                >
                    Login
                </Button>
                <div className="relative my-4 flex items-center justify-center">
                    <hr className="w-full" />
                    <div className="absolute bg-white px-4 py-2 text-center text-gray-500">
                        or
                    </div>
                </div>
                <button
                    type="button"
                    disabled={loading}
                    onClick={authWithGoogle}
                    className="flex justify-center gap-4 rounded-lg border px-4 py-2 transition-all hover:border hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-300 disabled:text-white"
                >
                    <Image
                        src={'/google.png'}
                        alt={''}
                        width={24}
                        height={24}
                    />
                    Login with google
                </button>
            </form>
        </section>
    );
}
