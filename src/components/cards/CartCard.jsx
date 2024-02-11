import React, { useContext } from 'react';
import Image from 'next/image';
import Icon from '@/components/icon/Icon';
import { CartContext } from '@/context/AppContext';
import { motion } from 'framer-motion';
import AmountPicker from '@/components/UI/Inputs/AmountPicker';

const CartCard = ({ cartItem, index }) => {
    const { deleteFromCart, increaseAmount, decreaseAmount } =
        useContext(CartContext);

    const CartCardVariants = {
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.05 }
        }),
        hidden: {
            opacity: 0,
            x: 150,
            transition: { delay: 0 }
        }
    };

    const getIngredientsString = () => {
        if (cartItem.ingredients?.length > 1)
            return cartItem.ingredients?.reduce((acc, curr, index, array) => {
                // Проверяем, является ли текущий элемент последним в массиве
                const isLast = index === array.length - 1;

                // Если это последний элемент, добавляем только его имя, иначе добавляем имя и запятую
                return acc + curr.name + (isLast ? '' : ', ');
            }, '');
        else return cartItem.ingredients[0]?.name;
    };

    return (
        <motion.div
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            custom={index}
            variants={CartCardVariants}
            className={
                'flex h-fit min-h-fit w-full flex-col items-center gap-4 rounded-md bg-white p-4'
            }
        >
            <div className={'flex h-fit w-full items-center gap-8'}>
                <div className={'relative h-16 min-h-[4rem] w-16'}>
                    <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fill={true}
                        className={'object-contain'}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={'relative flex h-full grow flex-col'}>
                    <h1>{cartItem.name}</h1>
                    <p className={'text-sm text-gray-400'}>
                        {cartItem.category?.name === 'Pizza'
                            ? cartItem.size?.name
                            : cartItem.category?.name === 'Drinks' &&
                              cartItem.description}
                    </p>
                    {cartItem.category?.name === 'Pizza' &&
                        cartItem.ingredients?.length !== 0 && (
                            <p className={'text-sm text-gray-400'}>
                                + {getIngredientsString()}
                            </p>
                        )}

                    <Icon
                        icon={'trash'}
                        onClick={() => deleteFromCart(cartItem)}
                        className={
                            'absolute right-1 top-1 h-8 w-8 rounded-full bg-red-400 text-white transition-all hover:bg-red-500 hover:!text-white'
                        }
                    />
                </div>
            </div>
            <hr className={'w-full'} />
            <div
                className={
                    'flex h-fit w-full items-center justify-between px-2'
                }
            >
                <p className={'text-lg font-bold'}>
                    {cartItem.price * cartItem.amount}$
                </p>
                <AmountPicker
                    amount={cartItem.amount}
                    decrement={() => decreaseAmount(cartItem)}
                    increment={() => increaseAmount(cartItem)}
                />
            </div>
        </motion.div>
    );
};

export default CartCard;
