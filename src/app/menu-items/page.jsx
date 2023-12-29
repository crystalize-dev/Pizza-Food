'use client';
import React, { useState } from 'react';
import AdminPanelWrapper from '@/components/Layout/AdminPanelWrapper';
import Button from '@/components/UI/Button';
import { AnimatePresence } from 'framer-motion';
import { useFetchMenu } from '@/hooks/useFetchMenu';
import MenuItem from '@/components/menu/MenuItem';

const Page = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('/default-menu.png');

    const clearInputs = () => {
        setName('');
        setDescription('');
        setImage('');
        setPrice('');
    };

    const {
        menuData,
        handleNewMenuItem,
        loading,
        setLoading,
        handleUpdate,
        handleDelete
    } = useFetchMenu({
        name,
        description,
        image,
        price,
        clearInputs
    });
    const onChangeMenuPhoto = (link) => {
        setImage(link);
    };

    return (
        <AdminPanelWrapper title={'menu-items'} isAdmin={true}>
            <Button
                type={'button'}
                variant={'submit'}
                className={'my-8 !w-fit !rounded-lg'}
            >
                Create new
            </Button>
            <ul className={'flex w-full flex-col gap-2'}>
                <AnimatePresence>
                    {menuData.menu.map((item, index) => (
                        <MenuItem key={item.id} menuItem={item} index={index} />
                    ))}
                </AnimatePresence>
            </ul>
        </AdminPanelWrapper>
    );
};

export default Page;
