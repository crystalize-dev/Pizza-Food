'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../../components/Layout/Button';
import Input from '../../components/Layout/Input';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        const promice = fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            setLoading(false);
            if (!res.ok) {
                throw new Error('Please check your password and email!');
            }
        });

        toast.promise(
            promice,
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
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex justify-center gap-4 rounded-lg border px-4 py-2 transition-all hover:border-black hover:bg-black hover:text-white"
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
