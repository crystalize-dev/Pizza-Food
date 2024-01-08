'use client';
import React, { useContext, useState } from 'react';
import AdminPanelWrapper from '@/components/Layout/AdminPanelWrapper';
import Button from '@/components/UI/Button';
import { AnimatePresence } from 'framer-motion';
import MenuItem from '@/components/SingleItems/MenuItem';
import MenuModal from '@/components/UI/Modal/MenuModal';
import { MenuContext } from '@/components/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Icon from '@/components/icon/Icon';

const Page = () => {
    const [active, setActive] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { menuData, menuActions } = useContext(MenuContext);

    const openModal = (menuItem) => {
        setActive(menuItem);
        setModal(true);
    };

    const handleDelete = async (id) => {
        setLoading(true);

        const promise = axios
            .delete('/api/menu', { data: { id: id } })
            .then((res) => {
                if (res.status === 200) {
                    menuActions.deleteMenuItem(id);
                } else {
                    toast.error('Error on DataBase!');
                }
            })
            .catch((err) => toast.error(err));

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Menu item deleted!',
            error: 'Some error occurred!'
        });

        setLoading(false);
    };

    return (
        <AdminPanelWrapper title={'menu-items'} isAdmin={true}>
            <MenuModal
                menuItem={active}
                visible={modal}
                setVisible={setModal}
            />

            <Button
                type={'button'}
                variant={'submit'}
                className={'mb-4 mt-16 !w-fit !rounded-lg md:my-8'}
                disabled={loading}
                onClick={() => openModal(null)}
            >
                <Icon icon={'plus'} className={'h-6 w-6 !p-0'} />
                Create new
            </Button>
            <ul className={'flex w-full flex-col gap-2'}>
                <AnimatePresence>
                    {menuData?.menu.length === 0 ? (
                        <p
                            className={
                                'my-8 text-center text-3xl text-gray-400'
                            }
                        >
                            Nothing found!
                        </p>
                    ) : (
                        menuData.menu.map((item, index) => (
                            <MenuItem
                                key={item.id}
                                menuItem={item}
                                loading={loading}
                                index={index}
                                openModal={openModal}
                                handleDeleteItem={handleDelete}
                            />
                        ))
                    )}
                </AnimatePresence>
            </ul>
        </AdminPanelWrapper>
    );
};

export default Page;
