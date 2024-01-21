'use client';
import _ from 'lodash';
import { useEffect, useState } from 'react';

export const useCart = (user) => {
    const [cart, setCart] = useState([]);
    const userCart = cart.filter((cartItem) => cartItem.user === user.email);

    // Добавить в корзину. Если уже есть, то увеличить на 1 в корзине
    const addToCart = (item, amount) => {
        const foundInCart = cart.find(
            (cartItem) =>
                cartItem.id === item.id && cartItem.user === user.email
        );
        const newItem = { ...item, amount: amount, user: user.email };

        if (_.isEqual(newItem, foundInCart))
            increaseAmount(foundInCart, amount);
        else setCart([...cart, { ...item, amount: amount, user: user.email }]);
    };

    // Удалить из корзины
    const deleteFromCart = (item) => {
        setCart([
            ...cart.filter(
                (cartItem) =>
                    cartItem.id !== item.id && cartItem.user === user.email
            )
        ]);
    };

    // Увеличить число продукта в корзине. Если больше 99, то не увеличивать
    const increaseAmount = (item, amount) => {
        if (item.amount + 1 > 99) return;

        setCart([
            ...cart.map((cartItem) => {
                if (cartItem.id === item.id)
                    return { ...item, amount: item.amount + amount };
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
                    if (cartItem.id === item.id && cartItem.user === user.email)
                        return { ...item, amount: item.amount - 1 };
                    else return cartItem;
                })
            );
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
        decreaseAmount
    };
};
