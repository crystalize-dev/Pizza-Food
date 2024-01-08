import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/UI/Button';
import Icon from '@/components/icon/Icon';
import TimerButton from '@/components/UI/TimerButton';
import Image from 'next/image';

const UserItem = ({ user, index, loading, handleDeleteItem, openModal }) => {
    const userVariants = {
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
            variants={userVariants}
            custom={index}
            className={`flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 md:flex-row md:items-start ${
                user.admin && 'border-2 border-solid border-primary'
            }`}
        >
            <div
                className={
                    'flex h-full w-full  flex-col items-center gap-4 md:flex-row'
                }
            >
                <div
                    className={
                        'relative min-h-[6rem] min-w-[6rem]  overflow-hidden rounded-full md:min-h-[3rem] md:min-w-[3rem]'
                    }
                >
                    <Image
                        priority={true}
                        fill={true}
                        src={user.image ? user.image : '/default-avatar.jpg'}
                        alt={'userImage'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <p className={'w-full'}>{user.name ? user.name : 'No name'}</p>

                <p className={'w-full'}>{user.email}</p>
            </div>

            <div
                className={
                    'flex w-full grow flex-col items-end justify-between gap-2 md:w-fit md:flex-row'
                }
            >
                <Button
                    type={'button'}
                    variant={'inactive'}
                    disabled={loading}
                    className={'!h-fit !w-full !rounded-md'}
                    onClick={() => openModal(user)}
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
                    confirmAction={() => handleDeleteItem(user.id)}
                    loadingClass={'!bg-red-500'}
                >
                    Delete
                    <Icon
                        icon={'trash'}
                        className={'h-5 w-5 !p-0 hover:!text-white'}
                    />
                </TimerButton>
            </div>
        </motion.div>
    );
};

export default UserItem;
