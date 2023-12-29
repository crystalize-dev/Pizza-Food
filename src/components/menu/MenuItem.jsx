import React from 'react';
import Button from '@/components/UI/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MenuItem({ menuItem, index, openModal }) {
    const menuItemVariants = {
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1 }
        }),
        hidden: {
            opacity: 0,
            x: -50,
            transition: {
                delay: 0
            }
        }
    };

    return (
        <motion.div
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            variants={menuItemVariants}
            custom={index}
            className="flex w-full justify-between gap-4 rounded-lg bg-gray-100 py-2 pl-4 pr-2"
        >
            <div className="relative max-h-[8rem] min-h-[8rem] min-w-[8rem] max-w-[8rem]">
                <Image
                    className="rounded-md object-contain"
                    src={menuItem.image ? menuItem.image : '/default-menu.png'}
                    alt="item-img"
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className={'max-h-[8rem] w-full overflow-hidden'}>
                <h1 className={'text-xl font-bold capitalize'}>
                    {menuItem.name}
                </h1>
                <p className={'mt-2 line-clamp-4 text-sm text-black/50'}>
                    {menuItem.description}
                </p>
            </div>

            <div className={'flex grow flex-col items-end justify-between'}>
                <Button
                    type={'button'}
                    variant={'inactive'}
                    className={'!h-fit !w-fit !rounded-md'}
                >
                    Edit
                </Button>

                <p className={'pb-2 pr-2'}>{menuItem.price + '$'}</p>
            </div>
        </motion.div>
    );
}
