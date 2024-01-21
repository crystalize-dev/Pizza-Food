import AboutUs from '@/components/Layout/AboutUs';
import ContactUs from '@/components/Layout/ContactUs';
import Hero from '@/components/Layout/Hero';
import HomeMenu from '@/components/Layout/HomeMenu';
import React from 'react';

export default function Home() {
    return (
        <>
            <Hero />

            <HomeMenu />

            <AboutUs />

            <ContactUs />
        </>
    );
}
