'use client';
import React, { useEffect, useState } from 'react';
import AdminPanelWrapper from '@/components/Layout/AdminPanelWrapper';
import axios from 'axios';
import UserItem from '@/components/SingleItems/UserItem';
import toast from 'react-hot-toast';
import { InfinitySpin } from 'react-loader-spinner';
import { UserDataContext } from '@/components/AppContext';
import UsersModal from '@/components/Modal/UsersModal';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [active, setActive] = useState(null);

    const { userData } = React.useContext(UserDataContext);

    useEffect(() => {
        setLoading(true);

        axios
            .get('/api/users')
            .then((res) => {
                if (res.status === 200) {
                    setUsers(
                        res.data.filter((user) => user.id !== userData.id)
                    );
                }
            })
            .then(() => setLoading(false));
    }, []);

    const openModal = (user) => {
        setActive(user);
        setModal(true);
    };

    const deleteUser = async (id) => {
        setLoading(true);

        const promise = axios
            .delete('/api/users', { data: { id: id } })
            .then((res) => {
                if (res.status === 200) {
                    setUsers(users.filter((user) => user.id !== id));
                }
            })
            .catch((err) => {
                return Promise.reject(err.response.data.error);
            });

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'User deleted!',
            error: (err) => `${err}`
        });

        setLoading(false);
    };

    const updateUser = async (userToUpdate) => {
        setUsers(
            users.map((user) =>
                user.id === userToUpdate.id ? userToUpdate : user
            )
        );
    };

    return (
        <AdminPanelWrapper title={'users'} isAdmin={true}>
            <UsersModal
                updateUser={updateUser}
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
                        <UserItem
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
