'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../../components/UI/Buttons/Button';
import Input from '../../components/UI/Inputs/Input';
import { customAxios } from '@/axios/customAxios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await customAxios('POST', 'register', setLoading, {
            data: { email, password },
            actionOnSuccess: () => {
                router.push('/login');
            },
            loadingString: 'Loading...',
            successString: 'Registration Success!'
        });
    };

    const authWithGoogle = async () => {
        setLoading(true);
        await signIn('google', { callbackUrl: '/' });
    };

    return (
        <section className="mt-8">
            <h1 className="mb-8 text-center text-4xl text-primary">Register</h1>
            <form
                className="mx-auto flex max-w-xs flex-col gap-4"
                onSubmit={handleFormSubmit}
            >
                <Input
                    disabled={loading}
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    disabled={loading}
                    type="password"
                    placeholder="********"
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="!w-full !rounded-lg"
                >
                    Register
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
                    className="flex justify-center gap-4 rounded-lg border px-4 py-2 transition-all hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-300 disabled:text-white"
                >
                    <Image
                        src="/google.png"
                        alt="goole"
                        width={24}
                        height={24}
                    />{' '}
                    Login with google
                </button>
            </form>
        </section>
    );
}
