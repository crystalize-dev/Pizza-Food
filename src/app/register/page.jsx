'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const promise = axios
            .post('/api/register', { email, password })
            .then((res) => {
                if (res.status !== 200) {
                    toast.error('Please check your password and email!');
                }
            });

        setLoading(false);

        toast.promise(
            promise,
            {
                loading: 'Loading...',
                success: (
                    <p>
                        Success! Now you can{' '}
                        <Link
                            href="/login"
                            className="cursor-pointer text-purple-700"
                        >
                            login
                        </Link>
                    </p>
                ),
                error: (err) => `${err}`
            },
            {
                success: {
                    duration: 5000
                },
                error: {
                    duration: 10000
                }
            }
        );
    };

    const authWithGoogle = () => {
        setLoading(true);
        signIn('google', { callbackUrl: '/' });
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
