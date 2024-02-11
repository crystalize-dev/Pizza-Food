'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import Button from '@/components/UI/Buttons/Button';
import { CartContext, ModalContext } from '@/context/AppContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const MenuCard = ({ menuItem }) => {
    const { addToCart } = useContext(CartContext);
    const { openMenuItemModal } = useContext(ModalContext);
    const session = useSession();
    const router = useRouter();

    const addMenuItem = () => {
        if (session.status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        if (menuItem.sizes.length === 0 && menuItem.ingredients.length === 0) {
            const { sizes, ...newItem } = menuItem;
            addToCart(newItem);
            toast.success('Added to cart!');
            return;
        }

        openMenuItemModal(menuItem);
    };

    return (
        <div
            className={
                'group flex h-full max-h-[28rem] w-full flex-col gap-4 rounded-3xl bg-gray-100 p-4 pt-6 transition-all hover:bg-white hover:shadow-xl'
            }
        >
            <div className={'relative h-56 min-h-[14rem] w-full'}>
                <Image
                    src={menuItem.image}
                    alt={menuItem.name}
                    fill={true}
                    className={
                        'object-contain transition-all group-hover:scale-110'
                    }
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <h1 className={'text-center text-2xl font-bold text-black'}>
                {menuItem.name}
            </h1>
            <p
                className={
                    'line-clamp-2 text-center text-sm font-bold text-gray-500'
                }
            >
                {menuItem.description}
            </p>
            <Button
                onClick={() => addMenuItem(menuItem)}
                type={'button'}
                variant={'submit'}
                className={'mt-auto'}
            >
                Add to cart {menuItem.price}$
            </Button>
        </div>
    );
};

export default MenuCard;
