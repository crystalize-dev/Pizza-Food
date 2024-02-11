'use client';
import React, { useState } from 'react';
import AdminPanelWrapper from '@/components/PageSections/AdminPanelWrapper';
import UserCard from '@/components/cards/UserCard';
import { InfinitySpin } from 'react-loader-spinner';
import UserEditModal from '@/components/Modal/UserEditModal';
import { useUsers } from '@/hooks/useUsers';

const Page = () => {
    const [modal, setModal] = useState(false);
    const [active, setActive] = useState(null);

    const { users, loading, setLoading, deleteUser, handleUpdateUser } =
        useUsers();

    const openModal = (user) => {
        setActive(user);
        setModal(true);
    };

    return (
        <AdminPanelWrapper title={'users'} isAdmin={true}>
            <UserEditModal
                updateUser={handleUpdateUser}
                loading={loading}
                setLoading={setLoading}
                visible={modal}
                setVisible={setModal}
                user={active}
            />

            <ul
                className={
                    'mb-4 mt-16 flex w-full flex-col items-center gap-2 md:my-8'
                }
            >
                {loading ? (
                    <InfinitySpin color={'var(--main)'} />
                ) : users.length === 0 ? (
                    <p className={'my-8 text-3xl text-gray-400'}>
                        Nothing found!
                    </p>
                ) : (
                    users.map((user, index) => (
                        <UserCard
                            key={index}
                            index={index}
                            user={user}
                            loading={loading}
                            openModal={openModal}
                            handleDeleteItem={deleteUser}
                        />
                    ))
                )}
            </ul>
        </AdminPanelWrapper>
    );
};

export default Page;
