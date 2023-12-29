import Image from 'next/image';
import React from 'react';
import SectionHeaders from '../UI/SectionHeaders';

export default function HomeMenu() {
    return (
        <section className="my-16">
            <div className="absolute left-0 right-0">
                <div className="absolute -top-24 left-0 -z-10 h-48 w-64">
                    <Image
                        src="/salad1.png"
                        alt="salad1"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="absolute -top-48 right-0 h-48 w-64">
                    <Image
                        src="/salad2.png"
                        alt="salad1"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>

            <SectionHeaders subHeader={'Check out'} mainHeader={'Menu'} />
        </section>
    );
}
