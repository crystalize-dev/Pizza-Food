'use client';
import React, { useContext } from 'react';
import AdminPanel from '@/components/PageSections/AdminPanel';
import { UserDataContext } from '@/context/AppContext';

const AdminPanelWrapper = ({ children, title }) => {
    const { userData } = useContext(UserDataContext);

    return (
        <section className="mx-auto mb-16 w-full max-w-3xl">
            <h1 className="mb-8 text-center text-4xl capitalize text-primary">
                {title}
            </h1>

            <AdminPanel active={title} isAdmin={userData.admin} />

            {children}
        </section>
    );
};

export default AdminPanelWrapper;
