'use client';
import React, { useContext, useEffect, useState } from 'react';
import WrapperModal from '@/components/Modal/WrapperModal';
import { CartContext, MenuItemModalContext } from '@/components/AppContext';
import Image from 'next/image';
import StyledSelect from '@/components/UI/StyledSelect';
import IngredientsPicker from '@/components/UI/IngredientsPicker';
import Button from '@/components/UI/Button';
import toast from 'react-hot-toast';

const MenuItemModal = () => {
    const { menuItemModal, closeMenuItemModal } =
        useContext(MenuItemModalContext);

    const { addToCart } = useContext(CartContext);

    const [activeSize, setActiveSize] = useState(null);
    const [pickedIngredients, setPickedIngredients] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();

        const { sizes, ingredients, ...newCartItem } = menuItemModal;

        addToCart(
            {
                ...newCartItem,
                price: calculateSum(),
                size: activeSize,
                ingredients: pickedIngredients
            },
            1
        );
        toast.success('Added to cart!');
        closeMenuItemModal();
    };

    const calculateSum = () => {
        let sum = menuItemModal.price;

        for (let ingredient of pickedIngredients) {
            sum += ingredient.price;
        }

        sum += activeSize?.price;

        return sum;
    };

    useEffect(() => {
        if (!menuItemModal) return;

        setActiveSize(menuItemModal.sizes[0]);
    }, [menuItemModal]);

    return (
        <WrapperModal visible={menuItemModal} setVisible={closeMenuItemModal}>
            <form
                className={
                    'scrollable relative flex h-full w-full flex-col gap-4 bg-white p-8 pr-0 md:h-fit md:max-h-[90%] md:w-1/3 md:min-w-[500px] md:flex-row md:rounded-lg'
                }
                onSubmit={(e) => submitForm(e)}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className={'relative h-96 w-full min-w-[40%] md:w-1/2'}>
                    <Image
                        src={menuItemModal.image}
                        alt={'menuItemImage'}
                        fill={true}
                        className={'object-contain'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className={'flex grow flex-col gap-2 pr-4'}>
                    <h1 className={'text-xl'}>{menuItemModal.name}</h1>
                    <p className={'text-sm text-gray-400'}>
                        {menuItemModal.description}
                    </p>

                    <StyledSelect
                        id={'sizes'}
                        options={menuItemModal.sizes}
                        active={activeSize}
                        setActive={setActiveSize}
                        order={{ Small: 1, Medium: 2, Large: 3 }}
                    />

                    <div
                        className={'scrollable gray-scroll flex flex-col gap-2'}
                    >
                        <h2 className={'text-lg font-bold'}>
                            Extra ingredients
                        </h2>
                        <IngredientsPicker
                            ingredients={menuItemModal.ingredients}
                            pickedIngredients={pickedIngredients}
                            setIngredients={setPickedIngredients}
                        />
                    </div>

                    <Button type={'submit'}>
                        Add to cart {calculateSum()}$
                    </Button>
                </div>
            </form>
        </WrapperModal>
    );
};

export default MenuItemModal;
