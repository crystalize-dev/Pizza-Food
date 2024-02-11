import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/icon/Icon';

const ModalWrapper = ({
    visible,
    setVisible,
    children,
    closeColor = 'white'
}) => {
    const closeModal = () => {
        const root = document.getElementById('root');
        root.style.overflow = 'auto';
        root.style.marginRight = '0';
        setVisible(false);
    };

    useEffect(() => {
        const root = document.getElementById('root');

        if (visible) {
            root.style.overflow = 'hidden';
            root.style.marginRight = '9px';
        }
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    className={
                        'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70'
                    }
                    onMouseDown={closeModal}
                >
                    <Icon
                        icon={'close'}
                        onClick={closeModal}
                        className={`absolute right-2 top-2 z-50 transition-all hover:scale-125 ${
                            closeColor !== 'white'
                                ? `!text-${closeColor} md:!text-${closeColor}`
                                : 'text-black md:text-white'
                        }`}
                    />

                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalWrapper;
