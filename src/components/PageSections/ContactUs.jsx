import React from 'react';
import SectionHeader from '../UI/SectionHeader';

export default function ContactUs() {
    return (
        <section className="my-8 text-center">
            <SectionHeader
                subHeader={"Dont't hesitate"}
                mainHeader={'Contact us'}
            />
            <div className="mt-8">
                <a
                    className="text-4xl text-gray-500 underline"
                    href="tel:+79772954630"
                >
                    +7 (977) 295 46 30
                </a>
            </div>
        </section>
    );
}
