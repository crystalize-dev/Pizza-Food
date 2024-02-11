'use client';
import React, { useContext, useEffect, useState } from 'react';
import Icon from '@/components/icon/Icon';
import { UserDataContext } from '@/context/AppContext';
import { useParams, useRouter } from 'next/navigation';
import Input from '@/components/UI/Inputs/Input';
import PhoneInput from 'react-phone-input-2';
import Image from 'next/image';
import { useOrders } from '@/hooks/useOrders';
import { InfinitySpin } from 'react-loader-spinner';
import OrderItemCard from '@/components/cards/OrderItemCard';

const Page = () => {
    const { userData } = useContext(UserDataContext);
    const { id } = useParams();
    const router = useRouter();

    const { orders } = useOrders();
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        if (userData.admin) return;

        if (userData.orders.some((order) => order.id === id)) return;

        router.back();
    }, [id, router, userData]);

    useEffect(() => {
        setCurrentOrder(orders.find((order) => order.id === id));
    }, [id, orders]);

    console.log(currentOrder);

    return (
        <section className="mx-auto w-full lg:my-8">
            {!currentOrder ? (
                <div className={'mx-auto my-16 w-fit'}>
                    <InfinitySpin color={'var(--main)'} />
                </div>
            ) : (
                <>
                    <div
                        className={
                            'flex w-full flex-col items-center gap-8 md:flex-row'
                        }
                    >
                        <Icon
                            onClick={() => router.back()}
                            icon={'arrowLeft'}
                            className={
                                'rounded-full border border-solid border-black/10 transition-all hover:bg-primary hover:text-white'
                            }
                        />
                        <h1
                            className={
                                'max-w-full text-center text-2xl font-bold text-primary md:text-start md:text-4xl'
                            }
                        >
                            Order # {id}
                        </h1>
                    </div>

                    <div
                        className={
                            'flex h-full w-full flex-col gap-8 p-8 md:my-8 lg:flex-row'
                        }
                    >
                        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-between gap-16 px-8 md:mt-12 md:flex-row md:items-start">
                            <div
                                className={
                                    'relative h-32 min-h-[8rem] w-32 min-w-[8rem] overflow-hidden rounded-full'
                                }
                            >
                                <Image
                                    width={200}
                                    height={200}
                                    className={'h-full w-full object-cover'}
                                    src={
                                        currentOrder?.user?.image
                                            ? currentOrder.user.image
                                            : '/default-avatar.jpg'
                                    }
                                    alt={'orderImage'}
                                />
                            </div>
                            <div className="mt-3 flex w-full grow flex-col gap-8 md:w-fit">
                                <Input
                                    label={'Email'}
                                    type="email"
                                    disabled={true}
                                    value={currentOrder.user.email}
                                />
                                <Input
                                    disabled={true}
                                    label={'Your name'}
                                    type="text"
                                    value={currentOrder?.user?.name}
                                />
                                <PhoneInput
                                    specialLabel="Phone Number"
                                    country={'ru'}
                                    disabled={true}
                                    value={currentOrder?.user?.phone}
                                    containerClass="text-sm -mt-4 text-gray-400 transition-all"
                                    inputClass="w-full outline outline-2 text-black text-base text-font-semibold focus:outline-primary hover:outline-black/80 disabled:outline-black/20 outline-black/40 disabled:cursor-not-allowed bg-transparent disabled:text-gray-400 rounded-lg px-4 py-2 transition-all"
                                />

                                <Input
                                    disabled={true}
                                    value={currentOrder.address}
                                    label="Address"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div
                            className={
                                'flex h-full grow flex-col gap-4 [&>*:last-child]:border-b-0'
                            }
                        >
                            {currentOrder.orderItems.map((item) => (
                                <OrderItemCard key={item.id} orderItem={item} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default Page;
