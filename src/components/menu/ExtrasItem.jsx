import React, { useState } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Icon from '@/components/icon/Icon';
import { motion } from 'framer-motion';

const ExtrasItem = ({ item, changeCallback, handleDelete }) => {
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);

    const changeName = (e) => {
        changeCallback({ id: item.id, name: e.target.value, price: price });

        setName(e.target.value);
    };

    const changePrice = (e) => {
        changeCallback({ id: item.id, name, price: parseInt(e.target.value) });

        setPrice(e.target.value);
    };

    return (
        <motion.div
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className={
                'flex h-fit w-full items-center gap-4 rounded-md p-2 pt-8'
            }
        >
            <Input
                value={name}
                onChange={(e) => changeName(e)}
                label={'Size name'}
            />
            <Input
                value={price}
                onChange={(e) => changePrice(e)}
                label={'Extra price'}
            />
            <Button
                type={'button'}
                onClick={() => handleDelete(item.id)}
                className={'!w-fit !rounded-full !bg-white !p-0'}
            >
                <Icon
                    icon={'trash'}
                    className={
                        'h-9 w-9 rounded-full bg-red-400 text-white transition-all hover:bg-red-500 hover:!text-white'
                    }
                />
            </Button>
        </motion.div>
    );
};

export default ExtrasItem;
