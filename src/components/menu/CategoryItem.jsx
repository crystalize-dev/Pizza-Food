import React, { useState } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Icon from '@/components/icon/Icon';
import { motion } from 'framer-motion';
import TimerButton from '@/components/UI/TimerButton';

const CategoryItem = ({
    category,
    active,
    index,
    setActive,
    handleUpdate,
    handleDelete,
    fetching
}) => {
    const [value, setValue] = useState(category.name);

    const handleCancel = () => {
        setActive(null);
        setValue(category.name);
    };
    const handleConfirm = async () => {
        const res = await handleUpdate({ id: category.id, name: value });

        if (res) {
            setActive(null);
        }
    };
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await handleConfirm();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const categoryVariants = {
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
        <motion.li
            className={`flex w-full items-center gap-3 whitespace-nowrap rounded-lg bg-gray-100 py-2 pl-4 pr-2 text-black/70 ${
                active === category.id && 'pl-2'
            }`}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            variants={categoryVariants}
            custom={index}
        >
            {active === category.id ? (
                <Input
                    value={value}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus={true}
                />
            ) : (
                <p>{value}</p>
            )}

            {active === category.id ? (
                <div className={'flex items-center gap-2'}>
                    <Icon
                        className={`rounded-lg bg-green-400 text-green-600 transition-all hover:text-white ${
                            fetching &&
                            '!cursor-not-allowed !bg-gray-400 !text-gray-600'
                        }`}
                        onClick={!fetching ? () => handleConfirm() : undefined}
                        icon={'ok'}
                    />
                    <Icon
                        className={`rounded-lg bg-red-400 text-red-600 transition-all hover:text-white ${
                            fetching &&
                            '!cursor-not-allowed !bg-gray-400 !text-gray-600'
                        }`}
                        onClick={!fetching ? () => handleCancel() : undefined}
                        icon={'close'}
                    />
                </div>
            ) : (
                <>
                    {' '}
                    <Button
                        type={'button'}
                        variant={'inactive'}
                        className={'ml-auto !w-fit !rounded-md'}
                        disabled={fetching}
                        onClick={() => setActive(category.id)}
                    >
                        Edit
                    </Button>
                    <TimerButton
                        type={'button'}
                        variant={'inactive'}
                        className={
                            '!w-fit !rounded-md transition-all hover:bg-red-500'
                        }
                        disabled={fetching}
                        confirmAction={() => handleDelete(category.id)}
                        cancelAction={() => handleCancel()}
                        loadingClass={'!bg-red-500'}
                    >
                        Delete
                    </TimerButton>
                </>
            )}
        </motion.li>
    );
};

export default CategoryItem;
