import React from 'react';
import Button from '@/components/UI/Buttons/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TimerButton from '@/components/UI/Buttons/TimerButton';
import Icon from '@/components/icon/Icon';

export default function MenuItemCard({
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
            className="flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 md:flex-row md:items-start"
        >
            <div
                className={
                    'flex h-full w-full flex-col-reverse items-center gap-4 text-center md:flex-row md:items-start md:text-start'
                }
            >
                <div className="relative min-h-[16rem] w-full min-w-[10rem] md:max-h-[10rem] md:min-h-[10rem] md:max-w-[10rem]">
                    <Image
                        className="rounded-md object-fill md:object-contain"
                        src={
                            menuItem.image
                                ? menuItem.image
                                : '/default-menu.png'
                        }
                        alt="item-img"
                        fill={true}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className={'max-h-[10rem] w-full grow overflow-hidden'}>
                    <h1 className={'text-3xl font-bold capitalize md:text-xl'}>
                        {menuItem.name}
                    </h1>
                    <p className={'mt-2 line-clamp-4 text-sm text-black/50'}>
                        {menuItem.description}
                    </p>
                </div>
            </div>

            <div
                className={
                    'flex w-full grow flex-col-reverse items-end justify-between gap-2 md:w-fit md:flex-col'
                }
            >
                <Button
                    type={'button'}
                    variant={'inactive'}
                    disabled={loading}
                    className={'!h-fit !w-full !rounded-md'}
                    onClick={() => openModal(menuItem)}
                >
                    Edit
                    <Icon
                        icon={'pen'}
                        className={'h-5 w-5 !p-0 hover:!text-white'}
                    />
                </Button>

                <TimerButton
                    type={'button'}
                    variant={'inactive'}
                    className={
                        '!rounded-md transition-all hover:bg-red-500 md:!w-fit'
                    }
                    disabled={loading}
                    confirmAction={() => handleDeleteItem(menuItem)}
                    loadingClass={'!bg-red-500'}
                >
                    Delete
                    <Icon
                        icon={'trash'}
                        className={'h-5 w-5 !p-0 hover:!text-white'}
                    />
                </TimerButton>

                <p
                    className={
                        'mt-4 pb-2 pr-2 text-2xl font-semibold text-primary'
                    }
                >
                    {menuItem.price + '$'}
                </p>
            </div>
        </motion.div>
    );
}
