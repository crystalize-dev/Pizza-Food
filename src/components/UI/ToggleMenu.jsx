import React, { useState } from 'react';
import Icon from '@/components/icon/Icon';
import { AnimatePresence, motion } from 'framer-motion';

const ToggleMenu = ({ title, children }) => {
    const [toggled, setToggled] = useState(false);

    const variants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };

    return (
        <div
            className={
                'flex h-fit w-full flex-col gap-4 rounded-lg bg-gray-100 p-4'
            }
        >
            <div
                className={
                    'flex w-full cursor-pointer items-center rounded-md bg-gray-100 p-2 px-4'
                }
                onClick={() => setToggled(!toggled)}
            >
                <h1 className={'text-lg font-normal'}>{title}</h1>
                <Icon
                    icon={'arrowDown'}
                    className={`transition-all ${toggled && 'rotate-180'}`}
                />
            </div>

            <AnimatePresence>
                {toggled && (
                    <motion.div
                        className={'flex flex-col gap-2 overflow-hidden'}
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToggleMenu;
