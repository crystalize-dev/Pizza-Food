import React from 'react';
import Image from 'next/image';
import Button from '@/components/UI/Buttons/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero flex justify-between">
            <div className="py-4 transition-all md:py-12 md:pl-16 xl:pl-0">
                <h1 className="mx-auto max-w-md text-center text-5xl font-bold md:text-start">
                    Everything
                    <br />
                    is better
                    <br /> with a&nbsp;
                    <span className="text-primary">Pizza</span>
                </h1>

                <p className="text-md mx-auto my-6 max-w-md text-center text-gray-500 md:text-start">
                    Pizza is a missing pieace that makes every day complete, a
                    simple yet delicious joy in life
                </p>

                <div className="flex w-full items-center justify-center gap-4">
                    <Link href={'/menu'}>
                        <Button
                            type={'button'}
                            variant={'submit'}
                            className={'!w-fit !px-8'}
                        >
                            Order now
                        </Button>
                    </Link>

                    <Link href={'/about'}>
                        <Button
                            type={'button'}
                            className={'!w-fit !px-8 hover:!text-primary'}
                        >
                            Learn more
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="relative hidden w-full md:block">
                <Image
                    src={'/pizza.png'}
                    alt={'pizza'}
                    priority={true}
                    className={'object-contain'}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
        </section>
    );
}
