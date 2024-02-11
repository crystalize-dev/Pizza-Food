'use client';
import React, { useContext, useState } from 'react';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import CardDataInput from '@/components/UI/Inputs/CardDataInput';
import Button from '@/components/UI/Buttons/Button';
import Input from '@/components/UI/Inputs/Input';
import { UserDataContext } from '@/context/AppContext';
import Icon from '@/components/icon/Icon';

const PaymentModal = ({ visible, setVisible }) => {
    const { userData } = useContext(UserDataContext);

    const [address, setAddress] = useState(userData.address);

    return (
        <ModalWrapper
            visible={visible}
            setVisible={setVisible}
            blockScroll={false}
        >
            <div
                className={
                    'scrollable relative flex h-full w-full flex-col justify-between gap-4 bg-[#f3f3f7] px-8 py-16 md:h-fit md:max-h-[90%] md:w-fit md:rounded-lg md:py-8'
                }
                onMouseDown={(e) => e.stopPropagation()}
            >
                <h1 className={'text-center text-4xl font-bold text-primary'}>
                    Proceed order
                </h1>

                <CardDataInput />

                <Input
                    type={'text'}
                    label={'Address'}
                    value={address}
                    className={'my-8'}
                    required={true}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <p
                    className={
                        'mx-auto flex w-full items-center gap-2 text-center text-sm text-zinc-400'
                    }
                >
                    <Icon
                        className={'cursor-default !text-zinc-400'}
                        icon={'clock'}
                    />{' '}
                    It will be ready in 30 - 50m
                </p>

                <Button type={'submit'}>Proceed</Button>
            </div>
        </ModalWrapper>
    );
};

export default PaymentModal;
