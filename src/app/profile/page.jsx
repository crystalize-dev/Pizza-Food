'use client';
import React, { useContext, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Input from '../../components/Layout/Input';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '../../components/Layout/Button';
import { DataContext } from '@/components/AppContext';

export default function ProfilePage() {
    const { userData, setUserData } = useContext(DataContext);

    const [userName, setUserName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [image, setImage] = useState(
        userData.image ? userData.image : '/default-avatar.jpg'
    );
    const [phoneNumber, setPhoneNumber] = useState(userData?.phone);
    const [address, setAddress] = useState(userData?.address);
    const [fetching, setFetching] = useState(false);

    const handleProfileInfoUpdate = async (e) => {
        e.preventDefault();
        setFetching(true);
        const promise = fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userName,
                image: image,
                address: address,
                phone: phoneNumber
            })
        }).then(() => {
            setUserData({
                ...userData,
                name: userName,
                image: image,
                phone: phoneNumber,
                address: address
            });
        });

        await toast.promise(promise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Some error occurred!'
        });

        setFetching(false);
    };

    const handleImageChange = async (e) => {
        const files = e.target.files;

        const data = new FormData();
        data.set('image', files[0]);
        setFetching(true);
        const promise = fetch('/api/upload', {
            method: 'POST',
            body: data
        })
            .then((res) => {
                return res.json();
            })
            .then((link) => {
                if (link) {
                    setImage(link);
                    setUserData({ ...userData, image: link });
                }
            });

        await toast.promise(promise, {
            loading: 'Loading...',
            success: 'Uploaded!',
            error: 'Some error occurred!'
        });

        setFetching(false);
    };

    const changeLabelColor = (e) => {
        const previousElement = e.target.previousElementSibling;
        if (previousElement) {
            previousElement.classList.toggle('highlight');
        }
    };

    return (
        <section className="mt-8">
            <h1 className="mb-4 text-center text-4xl text-primary">Profile</h1>
            <div className="mx-auto flex max-w-md flex-col items-center">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <div className="flex w-full flex-col items-center self-start rounded-lg p-2 md:w-fit">
                        <div className="relative h-36 w-32">
                            {image && (
                                <Image
                                    className="mb-2 rounded-lg object-bottom"
                                    src={image}
                                    alt="logo"
                                    priority={true}
                                    fill={true}
                                />
                            )}
                        </div>

                        <label className={'w-full'}>
                            <input
                                disabled={fetching}
                                accept="image/*"
                                multiple={false}
                                type="file"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <span
                                className={`mt-2 block w-44 cursor-pointer rounded-lg border p-2 text-center transition-all hover:bg-black hover:text-white md:w-full ${
                                    fetching &&
                                    'cursor-not-allowed bg-gray-300 text-white hover:bg-gray-300'
                                }`}
                            >
                                Edit
                            </span>
                        </label>
                    </div>

                    <form
                        className="flex grow flex-col gap-3"
                        onSubmit={handleProfileInfoUpdate}
                    >
                        <Input
                            withLabel={true}
                            label={'Email'}
                            type="email"
                            disabled={true}
                            value={email}
                        />
                        <Input
                            placeholder="John Anderson"
                            withLabel={true}
                            disabled={fetching}
                            label={'Your name'}
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <PhoneInput
                            disabled={fetching}
                            specialLabel="Phone Number"
                            country={'ru'}
                            containerClass="text-sm text-gray-400 transition-all"
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
                            withLabel={true}
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
            </div>
        </section>
    );
}
