import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/icon/Icon';
import ImageUpload from '@/components/UI/ImageUpload';
import toast from 'react-hot-toast';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

const AdminMenuModal = ({ visible, setVisible, menuItem }) => {
    const [action, setAction] = useState('');
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const onChangeMenuPhoto = (link) => {
        setImage(link);
    };

    const submitForm = (e) => {
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
            console.log('Item created!');
        } else {
            console.log('Item updated!');
        }
    };

    useEffect(() => {
        setAction(menuItem ? 'update' : 'create');
        setName(menuItem ? menuItem.name : '');
        setDescription(menuItem ? menuItem.description : '');
        setPrice(menuItem ? menuItem.price : '');

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
                        'absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/70'
                    }
                    onMouseDown={() => setVisible(false)}
                >
                    <form
                        className={
                            'relative flex h-full w-full gap-4 bg-white p-4 md:h-fit md:w-fit md:rounded-lg'
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

                        <ImageUpload
                            image={image}
                            fetching={loading}
                            setFetching={setLoading}
                            onChange={onChangeMenuPhoto}
                        />

                        <div className={'mt-4 flex flex-col gap-8'}>
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

                            <Button type={'submit'} className={'!rounded-lg'}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AdminMenuModal;
