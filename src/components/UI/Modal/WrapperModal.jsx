import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/icon/Icon';

const WrapperModal = ({ visible, setVisible, children }) => {
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
                    onMouseDown={() => setVisible(false)}
                >
                    <Icon
                        icon={'close'}
                        onClick={() => setVisible(false)}
                        className={
                            'absolute right-2 top-2 z-50 transition-all hover:scale-125 md:text-white'
                        }
                    />

                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WrapperModal;
