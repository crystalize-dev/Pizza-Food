import React from 'react';
import { customAxios } from '@/axios/customAxios';

export const useProfile = (session) => {
    const [userData, setUserData] = React.useState(null);
    const [fetchingUser, setFetchingUser] = React.useState(false);
    const [fetchingUpdate, setFetchingUpdate] = React.useState(false);

    React.useEffect(() => {
        if (session.status === 'authenticated') {
            customAxios('GET', 'profile', setFetchingUser, {
                actionOnSuccess: (data) => {
                    setUserData(data);
                }
            }).then(() => {});
        }
    }, [session, session.status]);

    const handleProfileUpdate = async (user) => {
        await customAxios('PUT', 'profile', setFetchingUpdate, {
            data: { user: user },
            actionOnSuccess: (data) => {
                setUserData(data);
            },
            loadingString: 'Updating profile...',
            successString: 'Profile updated!'
        });
    };

    return {
        userData,
        fetchingUser,
        fetchingUpdate,
        setFetchingUpdate,
        handleProfileUpdate
    };
};
