import { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '@/context/AppContext';
import { customAxios } from '@/axios/customAxios';

export const useOrders = () => {
    const { userData } = useContext(UserDataContext);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        customAxios('GET', 'orders', setLoading, {
            actionOnSuccess: (data) => {
                setOrders(data);
            }
        }).then(() => {});
    }, [userData]);

    return {
        orders,
        loading
    };
};
