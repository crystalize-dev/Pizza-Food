'use client';
import React, { useContext, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Input from '../../components/UI/Inputs/Input';
import Button from '../../components/UI/Buttons/Button';
import { UserDataContext } from '@/context/AppContext';
import AdminPanelWrapper from '@/components/PageSections/AdminPanelWrapper';
import ImageUpload from '@/components/UI/Inputs/ImageUpload';

export default function ProfilePage() {
    const {
        userData,
        handleProfileUpdate,
        session,
        fetchingUpdate,
        setFetchingUpdate
    } = useContext(UserDataContext);

    const [userName, setUserName] = useState(
        userData.name ? userData.name : ''
    );
    const [email, setEmail] = useState(userData.email);
    const [image, setImage] = useState(
        userData.image ? userData.image : '/default-avatar.jpg'
    );
    const [phoneNumber, setPhoneNumber] = useState(
        userData.phone ? userData.phone : ''
    );
    const [address, setAddress] = useState(
        userData.address ? userData.address : ''
    );

    const handleProfileInfoUpdate = async (e) => {
        e.preventDefault();

        await handleProfileUpdate({
            email: email,
            name: userName,
            image: image,
            address: address,
            phone: phoneNumber
        });
    };

    const onChangeAvatar = (link) => {
        setImage(link);
        setUserData({ ...userData, image: link });
    };

    const changeLabelColor = (e) => {
        const previousElement = e.target.previousElementSibling;
        if (previousElement) {
            previousElement.classList.toggle('highlight');
        }
    };

    return (
        <AdminPanelWrapper title={'profile'} isAdmin={session.data.user.admin}>
            <div className="mx-auto mt-12 flex w-full max-w-2xl flex-col items-center justify-between gap-16 px-8 md:flex-row md:items-start">
                <ImageUpload
                    image={image}
                    fetching={fetchingUpdate}
                    setFetching={setFetchingUpdate}
                    onChange={onChangeAvatar}
                />

                <form
                    className="mt-3 flex w-full grow flex-col gap-8 md:w-fit"
                    onSubmit={handleProfileInfoUpdate}
                >
                    <Input
                        label={'Email'}
                        type="email"
                        disabled={true}
                        value={email}
                    />
                    <Input
                        placeholder="John Anderson"
                        disabled={fetchingUpdate}
                        label={'Your name'}
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <PhoneInput
                        disabled={fetchingUpdate}
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
                        disabled={fetchingUpdate}
                        placeholder="Moscow city, 13"
                        label="Address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <Button
                        disabled={fetchingUpdate}
                        type="submit"
                        className="mt-2 !w-full !rounded-lg"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </AdminPanelWrapper>
    );
}
