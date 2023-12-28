import React from 'react';
import Button from '@/components/UI/Button';

export default function MenuItem() {
    return (
        <div className="gover rounded-lg bg-gray-200 p-8 text-center transition-all hover:bg-white hover:shadow-md hover:shadow-black/20">
            <div className="text-center">
                <img
                    src="/pizza.png"
                    alt="pizza"
                    className="max-h-auto mx-auto block max-h-24"
                />
            </div>
            <h4 className="my-3 text-xl font-semibold">Pepperoni Pizza</h4>
            <p className="text-sm text-gray-500">Some description ok, yes?</p>
            <Button variant={'submit'} type={'button'} className="mx-auto mt-4">
                Add to cart $12
            </Button>
        </div>
    );
}
