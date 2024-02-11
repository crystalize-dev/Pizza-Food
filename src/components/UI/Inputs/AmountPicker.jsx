import React from 'react';

const AmountPicker = ({ amount, increment, decrement }) => {
    return (
        <div
            className={
                'flex select-none items-center rounded-l-full rounded-r-full bg-[#f3f3f7]'
            }
        >
            <p
                onClick={decrement}
                className={'cursor-pointer rounded-l-lg px-4 py-2'}
            >
                -
            </p>
            <p className={'p-2'}>{amount}</p>
            <p
                onClick={increment}
                className={'cursor-pointer rounded-r-lg px-4 py-2'}
            >
                +
            </p>
        </div>
    );
};

export default AmountPicker;
