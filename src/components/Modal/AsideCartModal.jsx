'use client';
import React, { useContext } from 'react';
import { CartContext, ModalContext } from '@/context/AppContext';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import CartCard from '@/components/cards/CartCard';
import Image from 'next/image';
import Button from '@/components/UI/Buttons/Button';

const AsideCartModal = () => {
    const { cartModal, toggleCartModal } = useContext(ModalContext);
    const { userCart, proceedOrder, fetching } = useContext(CartContext);

    const calculateSum = () => {
        return userCart.reduce((acc, curr) => {
            return acc + curr.price * curr.amount;
        }, userCart[0]?.price);
    };

    const submitForm = (e) => {
        e.preventDefault();

        proceedOrder({ price: calculateSum() });

        toggleCartModal(false);
    };

    return (
        <ModalWrapper
            closeColor={'black'}
            visible={cartModal}
            setVisible={toggleCartModal}
        >
            <motion.form
                initial={{ right: '-33%' }}
                animate={{ right: 0 }}
                exit={{ right: '-33%' }}
                onSubmit={(e) => submitForm(e)}
                onMouseDown={(e) => e.stopPropagation()}
                className={
                    'relative ml-auto flex h-full w-full flex-col bg-[#f3f3f7] md:min-w-[500px] md:max-w-[25%]'
                }
            >
                {userCart.length === 0 ? (
                    <div
                        className={
                            'relative flex h-full w-full flex-col items-center justify-center gap-2'
                        }
                    >
                        <div className={'relative h-48 min-h-[12rem] w-full'}>
                            <Image
                                src={'/nothing.svg'}
                                alt={'nothing found'}
                                fill={true}
                                className={'object-fill'}
                                priority={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <h1 className={'mt-4 text-center text-2xl'}>
                            Ops, Nothing found!
                        </h1>
                        <p className={'max-w-[60%] text-center text-gray-400'}>
                            Your cart is empty, open &quot;Menu&quot; and select
                            the product you like.
                        </p>
                    </div>
                ) : (
                    <>
                        <h1
                            className={'px-4 py-8 text-2xl font-normal'}
                            onClick={calculateSum}
                        >
                            <span className={'text-primary'}>
                                {userCart.length}
                            </span>{' '}
                            items worth{' '}
                            <span className={'text-primary'}>
                                {calculateSum()}$
                            </span>
                        </h1>

                        <div
                            className={
                                'scrollable flex h-fit w-full flex-col gap-2 px-4 pb-4'
                            }
                        >
                            <AnimatePresence>
                                {userCart.map((cartItem, index) => (
                                    <CartCard
                                        index={index}
                                        key={cartItem.id}
                                        cartItem={cartItem}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        <div
                            className={
                                'sticky bottom-0 mt-auto flex h-60 min-h-[15rem] w-full flex-col gap-2 bg-white p-6 shadow-top'
                            }
                        >
                            <div
                                className={
                                    'flex w-full items-center justify-between'
                                }
                            >
                                <p>
                                    {userCart.length + ' '}
                                    items
                                </p>
                                <p>{calculateSum()}$</p>
                            </div>
                            <div
                                className={
                                    'flex w-full items-center justify-between'
                                }
                            >
                                <p>Extra bonuses</p>
                                <p>+{Math.floor(calculateSum() / 13) + ' '}B</p>
                            </div>
                            <hr className={'w-full'} />
                            <div
                                className={
                                    'flex w-full items-center justify-between text-lg font-bold'
                                }
                            >
                                <p>Order price</p>
                                <p>{calculateSum()}$</p>
                            </div>
                            <Button
                                disabled={fetching}
                                className={'mt-auto'}
                                type={'submit'}
                            >
                                Checkout
                            </Button>
                        </div>
                    </>
                )}
            </motion.form>
        </ModalWrapper>
    );
};

export default AsideCartModal;
