import React from 'react';

export default function SectionHeader({ subHeader, mainHeader }) {
    return (
        <div className="mb-4 text-center">
            <h3 className="font-semibold uppercase leading-4 text-gray-500">
                {subHeader}
            </h3>
            <h2 className="text-4xl font-bold italic text-primary">
                {mainHeader}
            </h2>
        </div>
    );
}
