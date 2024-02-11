'use client';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { customAxios } from '@/axios/customAxios';

export const useCart = (user) => {
    const [cart, setCart] = useState([]);
    const userCart = cart.filter((cartItem) => cartItem.user === user?.email); // Корзина конкретного пользователя

    const [fetching, setFetching] = useState(false);

    const router = useRouter();

    const url = 'profile';

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

    // Удалить из корзины
    const deleteFromCart = (item) => {
        setCart(cart.filter((cartItem) => !_.isEqual(cartItem, item)));
    };

    // Увеличить число продукта в корзине. Если больше 99, то не увеличивать
    const increaseAmount = (item) => {
        if (item.amount + 1 > 99) return;

        setCart(
            cart.map((cartItem) => {
                if (_.isEqual(item, cartItem))
                    return { ...item, amount: item.amount + 1 };
                else return cartItem;
            })
        );
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

    const formatDate = (date) => {
        return (
            date.toLocaleDateString('ru-RU') +
            ' ' +
            date.toLocaleTimeString('ru-RU')
        );
    };

    const proceedOrder = async ({ price, address }) => {
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
            return newCartItem; // Удаляем лишние поля
        });
        await customAxios('PUT', url, setFetching, {
            data: {
                user: user,
                order: {
                    price: price,
                    address: address,
                    orderItems: newCart,
                    date: formatDate(new Date())
                }
            },
            actionOnSuccess: (data) => {
                setCart([]);
                localStorage.setItem('cart', '[]');
                router.push(`/orders/${data.id}`);
            },
            actionOnFailure: (err) => {
                console.log(err);
            },
            loadingString: 'Proceeding order...',
            successString: 'Proceeded!'
        });
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
