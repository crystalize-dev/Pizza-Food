import React from 'react';
import Button from '@/components/UI/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TimerButton from '@/components/UI/TimerButton';

export default function MenuItem({
    menuItem,
    index,
    openModal,
    loading,
    handleDeleteItem
}) {
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
            className="flex w-full justify-between gap-4 rounded-lg bg-gray-100 p-4"
        >
            <div className="relative max-h-[10rem] min-h-[10rem] min-w-[10rem] max-w-[10rem]">
                <Image
                    className="rounded-md object-contain"
                    src={menuItem.image ? menuItem.image : '/default-menu.png'}
                    alt="item-img"
                    fill={true}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className={'max-h-[10rem] w-full grow overflow-hidden'}>
                <h1 className={'text-xl font-bold capitalize'}>
                    {menuItem.name}
                </h1>
                <p className={'mt-2 line-clamp-4 text-sm text-black/50'}>
                    {menuItem.description}
                </p>
            </div>

            <div
                className={'flex grow flex-col items-end justify-between gap-2'}
            >
                <Button
                    type={'button'}
                    variant={'inactive'}
                    disabled={loading}
                    className={'!h-fit !w-full !rounded-md'}
                    onClick={() => openModal(menuItem)}
                >
                    Edit
                </Button>

                <TimerButton
                    type={'button'}
                    variant={'inactive'}
                    className={
                        '!w-fit !rounded-md transition-all hover:bg-red-500'
                    }
                    disabled={loading}
                    confirmAction={() => handleDeleteItem(menuItem.id)}
                    loadingClass={'!bg-red-500'}
                >
                    Delete
                </TimerButton>

                <p className={'mt-4 pb-2 pr-2 text-lg font-semibold'}>
                    {menuItem.price + '$'}
                </p>
            </div>
        </motion.div>
    );
}
