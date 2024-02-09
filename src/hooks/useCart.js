'use client';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserDataContext } from '@/components/AppContext';
import { useRouter } from 'next/navigation';

export const useCart = (user) => {
    const [cart, setCart] = useState([]);
    const userCart = cart.filter((cartItem) => cartItem.user === user?.email);
    const [fetching, setFetching] = useState(false);

    const router = useRouter();

    const { setUserData } = useContext(UserDataContext);

    // Добавить в корзину. Если уже есть, то увеличить на 1 в корзине
    const addToCart = (item) => {
        const foundInCart = cart.find(
            (cartItem) =>
                cartItem.id === item.id && cartItem.user === user?.email
        );

        const newItem = { ...item, amount: 1, user: user?.email };

        if (_.isEqual(newItem, foundInCart)) increaseAmount(foundInCart);
        else setCart([...cart, newItem]);
    };

    // Увеличить число продукта в корзине. Если больше 99, то не увеличивать

    // Удалить из корзины
    const deleteFromCart = (item) => {
        setCart([...cart.filter((cartItem) => !_.isEqual(cartItem, item))]);
    };

    // Увеличить число продукта в корзине. Если больше 99, то не увеличивать
    const increaseAmount = (item) => {
        if (item.amount + 1 > 99) return;

        setCart([
            ...cart.map((cartItem) => {
                if (_.isEqual(item, cartItem))
                    return { ...item, amount: item.amount + 1 };
                else return cartItem;
            })
        ]);
    };

    // Уменьшить число продукта в корзине. Если меньше 1, то удалить из корзины
    const decreaseAmount = (item) => {
        if (item.amount - 1 === 0) deleteFromCart(item);
        else
            setCart(
                cart.map((cartItem) => {
                    if (_.isEqual(item, cartItem))
                        return { ...item, amount: item.amount - 1 };
                    else return cartItem;
                })
            );
    };

    const proceedOrder = async ({ price }) => {
        const newCart = userCart.map((cartItem) => {
            const {
                id,
                category,
                categoryId,
                MenuIds,
                sizeIds,
                ingredientsIds,
                user,
                description,
                ...newCartItem
            } = cartItem;
            return newCartItem;
        });

        setFetching(true);
        const promise = axios
            .put('/api/profile', {
                user: user,
                order: { price: price, orderItems: newCart }
            })
            .then((response) => {
                setFetching(false);
                if (response.status === 200) {
                    setUserData(response.data);
                    setCart([]);
                    localStorage.setItem('cart', '[]');

                    router.push(`/orders/${response.data.id}`);
                }
            });

        await toast.promise(promise, {
            loading: 'Please wait...',
            success: 'Order success!',
            error: 'Some error occurred!'
        });

        setFetching(false);
    };

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([])); // initialize here to prevent the null pointer in useEffect (cart.length)
        }
    }

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        setCart(storedCart);
    }, []);

    useEffect(() => {
        if (cart.length !== 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    return {
        userCart,
        addToCart,
        deleteFromCart,
        increaseAmount,
        decreaseAmount,
        proceedOrder,
        fetching
    };
};
