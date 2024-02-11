import React, { useEffect, useState } from 'react';
import { customAxios } from '@/axios/customAxios';
import { UserDataContext } from '@/context/AppContext';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userData } = React.useContext(UserDataContext);

    const deleteUser = async (id) => {
        await customAxios('DELETE', 'users', setLoading, {
            data: { data: { id: id } },
            actionOnSuccess: () => {
                setUsers(users.filter((user) => user.id !== id));
            },
            loadingString: 'Deleting user...',
            successString: 'User deleted successfully!'
        });
    };

    const updateUser = async (userToUpdate) => {
        setUsers(
            users.map((user) =>
                user.id === userToUpdate.id ? userToUpdate : user
            )
        );
    };

    const handleUpdateUser = async (userToUpdate, onSuccess) => {
        await customAxios('PUT', 'users', setLoading, {
            data: userToUpdate,
            actionOnSuccess: (data) => {
                updateUser(data);
                onSuccess && onSuccess();
            },
            loadingString: 'Updating user...',
            successString: 'User updated successfully!'
        });
    };

    useEffect(() => {
        customAxios('GET', 'users', setLoading, {
            actionOnSuccess: (data) => {
                setUsers(data.filter((user) => user.id !== userData.id));
            }
        }).then(() => {});
    }, [userData.id]);

    return { users, loading, setLoading, deleteUser, handleUpdateUser };
};
