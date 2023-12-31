import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/icon/Icon';
import ImageUpload from '@/components/UI/ImageUpload';
import toast from 'react-hot-toast';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import ToggleBar from '@/components/UI/ToggleBar';
import { v4 as uuid } from 'uuid';
import SizeIngredientItem from '@/components/menu/SizeIngredientItem';
import axios from 'axios';
import { MenuContext } from '@/components/AppContext';

const AdminMenuModal = ({ visible, setVisible, menuItem }) => {
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const [sizes, setSizes] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const { menuActions } = useContext(MenuContext);

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

        if (action === 'create') {
            const newItem = {
                name: name,
                description: description,
                price: parseInt(price),
                image: image,
                sizes: [
                    ...sizes.map((size) => {
                        return { name: size.name, price: size.price };
                    })
                ],
                ingredients: [
                    ...ingredients.map((item) => {
                        return { name: item.name, price: item.price };
                    })
                ]
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
        } else {
            const updatedItem = {
                id: menuItem.id,
                name: name,
                description: description,
                price: parseInt(price),
                image: image,
                sizes: [
                    ...sizes.map((size) => {
                        return { name: size.name, price: size.price };
                    })
                ],
                ingredients: [
                    ...ingredients.map((item) => {
                        return { name: item.name, price: item.price };
                    })
                ]
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

    const addSize = () => {
        setSizes([...sizes, { id: uuid(), name: '', price: 0 }]);
    };

    const changeSizes = ({ id, name, price }) => {
        setSizes([
            ...sizes.map((item) => {
                if (item.id === id) return { id: id, name: name, price: price };
                else return item;
            })
        ]);
    };

    const deleteSize = (id) => {
        setSizes([...sizes.filter((item) => item.id !== id)]);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { id: uuid(), name: '', price: 0 }]);
    };

    const changeIngredients = ({ id, name, price }) => {
        setIngredients([
            ...ingredients.map((item) => {
                if (item.id === id) return { id: id, name: name, price: price };
                else return item;
            })
        ]);
    };

    const deleteIngredient = (id) => {
        setIngredients([...ingredients.filter((item) => item.id !== id)]);
    };

    useEffect(() => {
        setAction(menuItem ? 'update' : 'create');
        setName(menuItem ? menuItem.name : '');
        setDescription(menuItem ? menuItem.description : '');
        setPrice(menuItem ? menuItem.price : '');
        setSizes(menuItem ? menuItem.sizes : []);
        setIngredients(menuItem ? menuItem.ingredients : []);

        setImage('/default-menu.png');
        if (menuItem) {
            if ('image' in menuItem) {
                if (menuItem.image) {
                    setImage(menuItem.image);
                }
            }
        }
    }, [menuItem]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    className={
                        'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70'
                    }
                    onMouseDown={() => setVisible(false)}
                >
                    <form
                        className={
                            'scrollable relative flex h-full w-full flex-col gap-4 bg-white px-8 py-4 pt-16 md:h-fit md:max-h-[90%] md:w-1/2 md:rounded-lg md:pt-4'
                        }
                        onSubmit={(e) => submitForm(e)}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <Icon
                            icon={'close'}
                            onClick={() => setVisible(false)}
                            className={
                                'absolute right-2 top-2 transition-all hover:scale-125 md:-right-8 md:-top-8 md:text-white'
                            }
                        />
                        <div className={'mt-4 flex h-fit w-full gap-8'}>
                            <ImageUpload
                                image={image}
                                fetching={loading}
                                setFetching={setLoading}
                                onChange={onChangeMenuPhoto}
                            />
                            <div
                                className={
                                    'mt-4 flex h-fit w-full flex-col gap-8'
                                }
                            >
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
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <Input
                                    label={'Price'}
                                    value={price}
                                    placeholder={'10$'}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={'flex h-fit w-full flex-col gap-4'}>
                            <ToggleBar title={`Sizes (${sizes.length})`}>
                                {sizes.length !== 0 ? (
                                    sizes.map((size) => (
                                        <SizeIngredientItem
                                            key={size.id}
                                            item={size}
                                            changeCallback={changeSizes}
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
                                <AnimatePresence>
                                    {ingredients.length !== 0 ? (
                                        ingredients.map((ingredient) => (
                                            <SizeIngredientItem
                                                key={ingredient.id}
                                                item={ingredient}
                                                changeCallback={
                                                    changeIngredients
                                                }
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
                                </AnimatePresence>

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

                        <Button type={'submit'} className={'!rounded-lg'}>
                            Submit
                        </Button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AdminMenuModal;
