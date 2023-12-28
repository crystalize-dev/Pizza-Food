import React from 'react';
import SectionHeaders from '../UI/SectionHeaders';

export default function AboutUs() {
    return (
        <section className="my-16 text-center">
            <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
            <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-4 text-gray-500">
                <p>
                    Consectetur proident laborum aute ullamco incididunt. Sint
                    enim nostrud ut magna nisi sint proident consectetur. Velit
                    duis sit aute cupidatat excepteur nulla.
                </p>
                <p>
                    Consectetur proident laborum aute ullamco incididunt. Sint
                    enim nostrud ut magna nisi sint proident consectetur. Velit
                    duis sit aute cupidatat excepteur nulla.
                </p>
            </div>
        </section>
    );
}
