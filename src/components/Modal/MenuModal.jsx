import React, { useContext, useEffect, useState } from 'react';
import ImageUpload from '@/components/UI/ImageUpload';
import toast from 'react-hot-toast';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import ToggleBar from '@/components/UI/ToggleBar';
import ExtrasItem from '@/components/SingleItems/ExtrasItem';
import axios from 'axios';
import { MenuContext } from '@/components/AppContext';
import { useExtra } from '@/hooks/useExtra';
import MySelect from '@/components/UI/MySelect';
import WrapperModal from '@/components/Modal/WrapperModal';
import { v4 as uuid } from 'uuid';

const MenuModal = ({ visible, setVisible, menuItem }) => {
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);

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
    } = useExtra(
        menuItem?.ingredients
            ? menuItem?.ingredients
            : [
                  {
                      id: uuid(),
                      name: 'Cheese',
                      price: 5
                  },
                  {
                      id: uuid(),
                      name: 'Salami',
                      price: 5
                  },
                  {
                      id: uuid(),
                      name: 'Mushrooms',
                      price: 2
                  }
              ]
    );

    const {
        extra: sizes,
        addExtra: addSize,
        changeExtra: changeSize,
        deleteExtra: deleteSize
    } = useExtra(
        menuItem?.sizes
            ? menuItem?.sizes
            : [
                  {
                      id: uuid(),
                      name: 'Small',
                      price: 0
                  },
                  {
                      id: uuid(),
                      name: 'Medium',
                      price: 3
                  },
                  {
                      id: uuid(),
                      name: 'Large',
                      price: 5
                  }
              ]
    );

    const { menuData, menuActions } = useContext(MenuContext);

    const onChangeMenuPhoto = (link) => {
        setImage(link);
    };

    const submitForm = async (e) => {
        e.preventDefault();
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

            const promise = axios.post('/api/menu', newItem).then((res) => {
                if (res.status === 200) {
                    setVisible(false);
                    newItem['id'] = res.data.id;
                    menuActions.addMenuItem(newItem);
                } else {
                    toast.error('Error on Database!');
                }
            });

            await toast.promise(promise, {
                loading: 'Loading...',
                success: 'Success!',
                error: (err) => `${err}`
            });

            return;
        }

        if (action === 'update') {
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

            const promise = axios.put('/api/menu', updatedItem).then((res) => {
                if (res.status === 200) {
                    setVisible(false);
                    menuActions.updateMenuItem(updatedItem.id, updatedItem);
                } else {
                    toast.error('Error on Database!');
                }
            });

            await toast.promise(promise, {
                loading: 'Loading...',
                success: 'Success!',
                error: (err) => `${err}`
            });
        }
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

    return (
        <WrapperModal visible={visible} setVisible={setVisible}>
            <form
                className={
                    'scrollable relative flex h-full w-full flex-col gap-4 bg-white px-8 py-24 pt-16 md:h-fit md:max-h-[90%] md:w-1/3 md:min-w-[500px] md:rounded-lg md:pt-8'
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
                        fetching={loading}
                        setFetching={setLoading}
                        onChange={onChangeMenuPhoto}
                        imageClassname={
                            'border-none object-contain object-center'
                        }
                    />
                    <div className={'mt-4 flex h-fit w-full flex-col gap-8'}>
                        <Input
                            label={'Name'}
                            value={name}
                            placeholder={'Pepperoni pizza'}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label={'Description (optional)'}
                            value={description}
                            placeholder={'Very tasty pizza!'}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            label={'Price'}
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
                        <ToggleBar title={`Sizes (${sizes.length})`}>
                            {sizes.length !== 0 ? (
                                sizes.map((size) => (
                                    <ExtrasItem
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
                                onClick={addSize}
                            >
                                Add size
                            </Button>
                        </ToggleBar>

                        <ToggleBar
                            title={`Extra ingredients (${ingredients.length})`}
                        >
                            {ingredients.length !== 0 ? (
                                ingredients.map((ingredient) => (
                                    <ExtrasItem
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
                                onClick={addIngredient}
                            >
                                Add ingredient
                            </Button>
                        </ToggleBar>
                    </div>
                )}

                <Button type={'submit'} className={'!rounded-lg'}>
                    Submit
                </Button>
            </form>
        </WrapperModal>
    );
};

export default MenuModal;
