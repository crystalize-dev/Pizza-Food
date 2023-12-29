'use client';
import React, { useState } from 'react';
import AdminPanelWrapper from '@/components/Layout/AdminPanelWrapper';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import ImageUpload from '@/components/UI/ImageUpload';
import { AnimatePresence } from 'framer-motion';
import { useMenu } from '@/hooks/useMenu';

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
    } = useMenu({
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
            <form
                className={'my-16 flex h-fit w-full flex-col gap-8 md:flex-row'}
                onSubmit={(e) => handleNewMenuItem(e)}
            >
                <ImageUpload
                    image={image}
                    fetching={loading}
                    setFetching={setLoading}
                    onChange={onChangeMenuPhoto}
                />

                <div className={'flex w-full flex-col gap-8'}>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label={'Name'}
                        placeholder={'Pepperoni pizza'}
                    />
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        label={'Description (optional)'}
                        placeholder={'Very tasty!'}
                    />
                    <Input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        label={'Base price'}
                        placeholder={'10 $'}
                    />
                    <Button className={'!rounded-lg'} type={'submit'}>
                        Save
                    </Button>
                </div>
            </form>
            <ul className={'flex w-full flex-col gap-2'}>
                <AnimatePresence>
                    {menuData.menu.map((item) => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </AnimatePresence>
            </ul>
        </AdminPanelWrapper>
    );
};

export default Page;
