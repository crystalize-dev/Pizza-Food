'use client';
import React, { useEffect, useState } from 'react';
import WrapperModal from '@/components/UI/Modal/WrapperModal';
import ImageUpload from '@/components/UI/ImageUpload';
import Input from '@/components/UI/Input';
import PhoneInput from 'react-phone-input-2';
import Button from '@/components/UI/Button';
import CustomCheckbox from '@/components/UI/CustomCheckbox';
import axios from 'axios';
import toast from 'react-hot-toast';

const UsersModal = ({ visible, setVisible, user, updateUser }) => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [fetching, setFetching] = useState(false);
    const [image, setImage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();

        setFetching(true);
        const promise = axios
            .put('/api/users', {
                email: email,
                name: userName,
                image: image,
                address: address,
                phone: phoneNumber,
                admin: isAdmin
            })
            .then((response) => {
                setFetching(false);
                if (response.status === 200) {
                    updateUser(response.data);
                    setVisible(false);
                }
            });

        await toast.promise(promise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Some error occurred!'
        });

        setFetching(false);
    };

    const onChangeAvatar = (link) => {
        setImage(link);
    };

    const changeLabelColor = (e) => {
        const previousElement = e.target.previousElementSibling;
        if (previousElement) {
            previousElement.classList.toggle('highlight');
        }
    };

    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setEmail(user.email);
            setPhoneNumber(user.phone);
            setAddress(user.address);
            setIsAdmin(user.admin);

            if (user.image) setImage(user.image);
            else setImage('/default-avatar.jpg');
        }
    }, [user, visible]);

    return (
        <WrapperModal visible={visible} setVisible={setVisible}>
            <div
                className={
                    'scrollable relative flex h-full w-full flex-col gap-4 bg-white px-8 py-8 pt-16 md:h-fit md:max-h-[90%] md:w-1/3 md:min-w-[500px] md:flex-row md:rounded-lg md:pt-8'
                }
                onMouseDown={(e) => e.stopPropagation()}
            >
                <ImageUpload
                    image={image}
                    fetching={fetching}
                    setFetching={setFetching}
                    onChange={onChangeAvatar}
                />

                <form
                    onSubmit={(e) => submitForm(e)}
                    className="mt-3 flex w-full grow flex-col gap-8 md:w-fit"
                >
                    <Input
                        label={'Email'}
                        type="email"
                        disabled={true}
                        value={email}
                    />

                    <Input
                        placeholder="John Anderson"
                        disabled={fetching}
                        label={'Your name'}
                        type="text"
                        value={userName}
                        required={true}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <PhoneInput
                        disabled={fetching}
                        specialLabel="Phone Number"
                        country={'ru'}
                        containerClass="text-sm -mt-4 text-gray-400 transition-all"
                        onFocus={(e) => changeLabelColor(e)}
                        onBlur={(e) => changeLabelColor(e)}
                        inputClass="w-full outline outline-2 text-black text-base text-font-semibold focus:outline-primary hover:outline-black/80 disabled:outline-black/20 outline-black/40 disabled:cursor-not-allowed bg-transparent disabled:text-gray-400 rounded-lg px-4 py-2 transition-all"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                    />

                    <Input
                        disabled={fetching}
                        placeholder="Moscow city, 13"
                        label="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <CustomCheckbox
                        value={isAdmin}
                        setValue={setIsAdmin}
                        disabled={fetching}
                        label={'Administrator'}
                    />

                    <Button
                        disabled={fetching}
                        type="submit"
                        className="mt-2 !w-full !rounded-lg"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </WrapperModal>
    );
};

export default UsersModal;
