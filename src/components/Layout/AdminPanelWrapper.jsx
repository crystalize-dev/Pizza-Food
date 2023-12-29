import React from 'react';
import AdminPanel from '@/components/Layout/AdminPanel';

const AdminPanelWrapper = ({ children, title, isAdmin = false }) => {
    return (
        <section className="mx-auto w-full max-w-xl">
            <h1 className="mb-8 text-center text-4xl capitalize text-primary">
                {title}
            </h1>

            {isAdmin && <AdminPanel active={title} />}

            {children}
        </section>
    );
};

export default AdminPanelWrapper;
