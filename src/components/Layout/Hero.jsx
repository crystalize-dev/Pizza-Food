import React from 'react';
import Image from 'next/image';
import Button from '../../components/Layout/Button';

export default function Hero() {
    return (
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-6xl font-bold ">
                    Everything
                    <br />
                    is better
                    <br /> with a&nbsp;
                    <span className="text-primary">Pizza</span>
                </h1>

                <p className="my-6 text-gray-500">
                    Pizza is a missing pieace that makes every day complete, a
                    simple yet delicious joy in life
                </p>

                <div className="flex items-center gap-4">
                    <Button>Order now</Button>

                    <div className="group flex cursor-pointer items-center gap-1 border-none text-gray-600">
                        Learn more
                    </div>
                </div>
            </div>

            <div className="relative">
                <Image
                    src={'/pizza.png'}
                    alt={'pizza'}
                    className="w-full"
                    width={250}
                    height={250}
                />
            </div>
        </section>
    );
}
