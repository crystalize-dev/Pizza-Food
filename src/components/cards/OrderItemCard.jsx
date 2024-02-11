import React from 'react';
import Image from 'next/image';

const OrderItemCard = ({ orderItem }) => {
    return (
        <div
            className={
                'flex flex-col items-center gap-2 border-b border-solid border-black/10 p-4 lg:flex-row lg:items-start'
            }
        >
            <div className={'relative h-24 min-h-[6rem] w-24 min-w-[6rem]'}>
                <Image
                    width={200}
                    height={200}
                    className={'h-full w-full object-cover'}
                    src={
                        orderItem.image ? orderItem.image : '/default-menu.png'
                    }
                    alt={'menuItem image'}
                />
            </div>

            <div className={'flex h-full w-fit flex-col'}>
                <h1 className={'text-lg font-bold text-black'}>
                    {orderItem.name}
                </h1>
                <div className={'text-sm text-black/50'}>
                    {orderItem?.size?.name && (
                        <p className={'text-md text-zinc-600'}>
                            Size - {orderItem.size.name}
                        </p>
                    )}
                </div>
            </div>

            <div
                className={
                    'flex h-full w-fit flex-col text-center lg:ml-auto lg:text-end'
                }
            >
                {orderItem?.ingredients &&
                    orderItem.ingredients.map((extra) => (
                        <p className={'text-sm text-zinc-400'} key={extra.id}>
                            + extra {extra.name}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default OrderItemCard;
