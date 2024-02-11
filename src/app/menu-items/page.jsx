'use client';
import React, { useContext, useState } from 'react';
import AdminPanelWrapper from '@/components/PageSections/AdminPanelWrapper';
import Button from '@/components/UI/Buttons/Button';
import { AnimatePresence } from 'framer-motion';
import MenuItemCard from '@/components/cards/MenuItemCard';
import MenuCreatorModal from '@/components/Modal/MenuCreatorModal';
import { MenuContext } from '@/context/AppContext';
import Icon from '@/components/icon/Icon';
import CategorySelector from '@/components/UI/Inputs/CategorySelector';

const Page = () => {
    const [active, setActive] = useState(null);
    const [modal, setModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState({
        value: 'All',
        label: 'All'
    });

    const { menuData, menuActions, loadingModal } = useContext(MenuContext);

    const openModal = (menuItem) => {
        setActive(menuItem);
        setModal(true);
    };

    const handleDelete = async (menuItem) => {
        await menuActions.handleDeleteMenuItem(menuItem);
    };

    const customSort = (array) => {
        const sortedArray = array.slice();

        sortedArray.sort(function (a, b) {
            const order = { Pizza: 1, Drinks: 2, Deserts: 3 };

            const orderA = order[a.category.name] || 9999; // Если элемент не входит в указанные, ставим его в конец
            const orderB = order[b.category.name] || 9999;

            // Сравниваем порядковые номера
            return orderA - orderB;
        });

        if (activeFilter.value === 'All') {
            return sortedArray;
        } else {
            return sortedArray.filter(
                (item) => item.category.name === activeFilter.value
            );
        }
    };

    return (
        <AdminPanelWrapper title={'menu-items'}>
            <MenuCreatorModal
                menuItem={active}
                visible={modal}
                setVisible={setModal}
            />

            <div
                className={
                    'flex h-fit w-full items-center justify-between gap-4'
                }
            >
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

                <CategorySelector
                    type={'selector'}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />
            </div>

            <ul className={'flex w-full flex-col gap-2'}>
                <AnimatePresence mode={'wait'}>
                    {menuData?.menu.length === 0 ? (
                        <p
                            className={
                                'my-8 text-center text-3xl text-zinc-300'
                            }
                        >
                            Nothing found!
                        </p>
                    ) : (
                        customSort(menuData.menu).map((item, index) => (
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
