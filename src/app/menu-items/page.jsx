'use client';
import React, { useContext, useState } from 'react';
import AdminPanelWrapper from '@/components/PageSections/AdminPanelWrapper';
import Button from '@/components/UI/Buttons/Button';
import { AnimatePresence } from 'framer-motion';
import MenuItemCard from '@/components/cards/MenuItemCard';
import MenuCreatorModal from '@/components/Modal/MenuCreatorModal';
import { MenuContext } from '@/context/AppContext';
import Icon from '@/components/icon/Icon';

const Page = () => {
    const [active, setActive] = useState(null);
    const [modal, setModal] = useState(false);

    const { menuData, menuActions, loadingModal } = useContext(MenuContext);

    const openModal = (menuItem) => {
        setActive(menuItem);
        setModal(true);
    };

    const handleDelete = async (menuItem) => {
        await menuActions.handleDeleteMenuItem(menuItem);
    };

    return (
        <AdminPanelWrapper title={'menu-items'} isAdmin={true}>
            <MenuCreatorModal
                menuItem={active}
                visible={modal}
                setVisible={setModal}
            />

            <Button
                type={'button'}
                variant={'submit'}
                className={'mb-4 mt-16 !w-fit !rounded-lg md:my-8'}
                disabled={loadingModal}
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
                                'my-8 text-center text-3xl text-zinc-300'
                            }
                        >
                            Nothing found!
                        </p>
                    ) : (
                        menuData.menu.map((item, index) => (
                            <MenuItemCard
                                key={item.id}
                                menuItem={item}
                                loading={loadingModal}
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
