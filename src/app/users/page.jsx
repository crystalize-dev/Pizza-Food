import React from 'react';
import AdminPanelWrapper from '@/components/Layout/AdminPanelWrapper';

const Page = () => {
    return (
        <AdminPanelWrapper title={'users'} isAdmin={true}>
            Users!
        </AdminPanelWrapper>
    );
};

export default Page;
