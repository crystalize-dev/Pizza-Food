import AboutUs from '@/components/PageSections/AboutUs';
import ContactUs from '@/components/PageSections/ContactUs';
import Hero from '@/components/PageSections/Hero';
import HomeMenu from '@/components/PageSections/HomeMenu';
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
