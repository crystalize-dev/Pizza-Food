import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserDataContext } from '@/context/AppContext';

const variants = {
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { opacity: { delay: i * 0.05 }, x: { delay: i * 0.05 } }
    }),
    hidden: (i) => ({
        opacity: 0,
        x: -50,
        transition: { opacity: { delay: i * 0.05 }, x: { delay: i * 0.05 } }
    })
};

const OrderCard = ({ index, order }) => {
    const router = useRouter();
    const { userData } = useContext(UserDataContext);

    return (
        <motion.div
            custom={index}
            exit={'hidden'}
            animate={'visible'}
            initial={'hidden'}
            variants={variants}
            whileHover={{
                backgroundColor: 'rgba(255,255,255)',
                boxShadow:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
            onClick={() => router.push('/orders/' + order.id)}
            className="flex w-full cursor-pointer flex-col gap-4 rounded-lg bg-gray-100 p-4 lg:flex-row"
        >
            <div className={'flex w-full items-center gap-4'}>
                {userData.admin && (
                    <div
                        className={
                            'min-h-6 min-w-6 relative h-12 w-12 overflow-hidden rounded-full'
                        }
                    >
                        <Image
                            src={
                                order.user.image
                                    ? order.user.image
                                    : '/default-avatar.jpg'
                            }
                            alt={'user avatar'}
                            width={50}
                            height={50}
                            className={'h-full w-full object-cover'}
                        />
                    </div>
                )}

                <div className={'flex w-fit flex-col gap-2 text-zinc-500'}>
                    <h1 className={'font-bold'}>
                        {userData.admin
                            ? order.user.email
                            : 'Order # ' + order.id}
                    </h1>
                    <p className={'text-sm'}>
                        Menu items - {order.orderItems.length}
                    </p>
                </div>
            </div>

            <h1 className={'ml-auto w-fit whitespace-nowrap font-bold'}>
                {order.date}
            </h1>
        </motion.div>
    );
};

export default OrderCard;
