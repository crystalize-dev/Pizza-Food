'use client';
import React from 'react';
import AdminPanelWrapper from '@/components/PageSections/AdminPanelWrapper';
import { useOrders } from '@/hooks/useOrders';
import OrderCard from '@/components/cards/OrderCard';
import { InfinitySpin } from 'react-loader-spinner';

const Page = () => {
    const { orders, loading } = useOrders();

    const customSort = (array) => {
        const sortedArray = array.slice();

        sortedArray.sort(function (a, b) {
            const A = new Date(a.date);
            const B = new Date(b.date);
            return B - A;
        });

        return sortedArray;
    };

    return (
        <AdminPanelWrapper title={'Orders'}>
            {loading ? (
                <div className="mx-auto w-fit py-16">
                    <InfinitySpin color={'var(--main)'} />
                </div>
            ) : (
                <ul className="mb-4 mt-16 flex w-full flex-col items-center gap-2 md:my-8">
                    {orders.length === 0 ? (
                        <p className="my-8 text-3xl text-gray-400">
                            Nothing found!
                        </p>
                    ) : (
                        customSort(orders).map((order, index) => (
                            <OrderCard
                                key={index}
                                order={order}
                                index={index}
                            />
                        ))
                    )}
                </ul>
            )}
        </AdminPanelWrapper>
    );
};

export default Page;
