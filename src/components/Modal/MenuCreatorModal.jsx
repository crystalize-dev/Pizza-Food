import React, { useContext, useEffect, useState } from 'react';
import ImageUpload from '@/components/UI/Inputs/ImageUpload';
import toast from 'react-hot-toast';
import Input from '@/components/UI/Inputs/Input';
import Button from '@/components/UI/Buttons/Button';
import ToggleMenu from '@/components/UI/ToggleMenu';
import ExtraItemCard from '@/components/cards/ExtraItemCard';
import { MenuContext } from '@/context/AppContext';
import { useExtra } from '@/hooks/useExtra';
import MySelect from '@/components/UI/Inputs/MySelect';
import ModalWrapper from '@/components/Modal/ModalWrapper';

const MenuCreatorModal = ({ visible, setVisible, menuItem }) => {
    const [action, setAction] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const {
        extra: ingredients,
        addExtra: addIngredient,
        changeExtra: changeIngredient,
        deleteExtra: deleteIngredient
    } = useExtra(category, 'ingredients');

    const {
        extra: sizes,
        addExtra: addSize,
        changeExtra: changeSize,
        deleteExtra: deleteSize
    } = useExtra(category, 'sizes');

    const { menuData, loadingModal, setLoadingModal, menuActions } =
        useContext(MenuContext);

    const onChangeMenuPhoto = (link) => {
        setImage(link);
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // Регулярное выражение для корректного ввода цены
        const regex = /^[1-9]\d*$/;

        if (!name) {
            toast.error('Provide a name!');
            return;
        }

        if (!regex.test(price)) {
            toast.error('Provide a correct price!');
            return;
        }

        if (!category) {
            toast.error('Provide a category!');
            return;
        }

        if (action === 'create') {
            const categoryFromMenu = menuData.categories.find(
                (item) => item.name === category.value
            );

            const newItem = {
                name: name,
                description: description,
                price: parseInt(price),
                image: image,
                category: categoryFromMenu,
                sizes: sizes.map((size) => {
                    return { name: size.name, price: size.price };
                }),
                ingredients: ingredients.map((item) => {
                    return { name: item.name, price: item.price };
                })
            };

            await menuActions.handleAddNewMenuItem(newItem, () =>
                setVisible(false)
            );
        } else {
            const categoryFromMenu = menuData.categories.find(
                (item) => item.name === category.value
            );

            const updatedItem = {
                id: menuItem.id,
                name: name,
                description: description,
                price: parseInt(price),
                category: categoryFromMenu,
                image: image,
                sizes: sizes.map((size) => {
                    return { name: size.name, price: size.price };
                }),
                ingredients: ingredients.map((item) => {
                    return { name: item.name, price: item.price };
                })
            };

            await menuActions.handleUpdateMenuItem(updatedItem, () =>
                setVisible(false)
            );
        }

        const root = document.getElementById('root');
        root.style.overflow = 'auto';
        root.style.marginRight = '0';
    };

    useEffect(() => {
        setAction(menuItem ? 'update' : 'create');
        setName(menuItem ? menuItem.name : '');
        setDescription(menuItem ? menuItem.description : '');
        setPrice(menuItem ? menuItem.price : '');
        setCategory(
            menuItem
                ? {
                      value: menuItem.category.name,
                      label: menuItem.category.name
                  }
                : ''
        );

        setImage('/default-menu.png');
        if (menuItem) {
            if ('image' in menuItem) {
                if (menuItem.image) {
                    setImage(menuItem.image);
                }
            }
        }
    }, [menuItem, visible]);

    const closeModal = (modal) => {
        const root = document.getElementById('root');
        root.style.overflow = 'auto';
        root.style.marginRight = '0';
        setVisible(modal);
    };

    return (
        <ModalWrapper
            visible={visible}
            setVisible={closeModal}
            closeColor={'white'}
        >
            <form
                className={
                    'scrollable relative flex h-full w-full flex-col justify-between gap-4 bg-white px-8 py-16 md:h-fit md:max-h-[90%] md:min-h-[500px] md:w-1/3 md:min-w-[500px] md:rounded-lg md:py-8'
                }
                onSubmit={(e) => submitForm(e)}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div
                    className={
                        'mt-4 flex h-fit w-full flex-col gap-8 md:flex-row'
                    }
                >
                    <ImageUpload
                        image={image}
                        fetching={loadingModal}
                        setFetching={setLoadingModal}
                        onChange={onChangeMenuPhoto}
                        imageClassname={
                            'border-none object-contain object-center'
                        }
                    />
                    <div className={'mt-4 flex h-fit w-full flex-col gap-8'}>
                        <Input
                            label={'Name'}
                            disabled={loadingModal}
                            value={name}
                            placeholder={'Pepperoni pizza'}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label={'Description (optional)'}
                            disabled={loadingModal}
                            value={description}
                            placeholder={'Very tasty pizza!'}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            label={'Price'}
                            disabled={loadingModal}
                            value={price}
                            placeholder={'10$'}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <MySelect
                            label={'Category'}
                            current={category}
                            setCurrent={setCategory}
                            placeholder={'Drinks'}
                            options={menuData.categories.map((item) => {
                                return {
                                    value: item.name,
                                    label: item.name
                                };
                            })}
                        />
                    </div>
                </div>

                {category.value === 'Pizza' && (
                    <div className={'flex h-fit w-full flex-col gap-4'}>
                        <ToggleMenu title={`Sizes (${sizes.length})`}>
                            {sizes.length !== 0 ? (
                                sizes.map((size) => (
                                    <ExtraItemCard
                                        key={size.id}
                                        item={size}
                                        changeCallback={changeSize}
                                        handleDelete={deleteSize}
                                    />
                                ))
                            ) : (
                                <p
                                    className={
                                        'text-center text-lg text-gray-500'
                                    }
                                >
                                    Nothing here!
                                </p>
                            )}

                            <Button
                                type={'button'}
                                variant={'inactive'}
                                className={
                                    '!rounded-md hover:!bg-black hover:!text-white'
                                }
                                disabled={loadingModal}
                                onClick={addSize}
                            >
                                Add size
                            </Button>
                        </ToggleMenu>

                        <ToggleMenu
                            title={`Extra ingredients (${ingredients.length})`}
                        >
                            {ingredients.length !== 0 ? (
                                ingredients.map((ingredient) => (
                                    <ExtraItemCard
                                        key={ingredient.id}
                                        item={ingredient}
                                        changeCallback={changeIngredient}
                                        handleDelete={deleteIngredient}
                                    />
                                ))
                            ) : (
                                <p
                                    className={
                                        'text-center text-lg text-gray-500'
                                    }
                                >
                                    Nothing here!
                                </p>
                            )}

                            <Button
                                type={'button'}
                                variant={'inactive'}
                                className={
                                    '!rounded-md hover:!bg-black hover:!text-white'
                                }
                                disabled={loadingModal}
                                onClick={addIngredient}
                            >
                                Add ingredient
                            </Button>
                        </ToggleMenu>
                    </div>
                )}

                <Button
                    type={'submit'}
                    className={'!mt-auto !rounded-lg'}
                    disabled={loadingModal}
                >
                    Submit
                </Button>
            </form>
        </ModalWrapper>
    );
};

export default MenuCreatorModal;
