import React from 'react';

export default function Input({ variant, children, ...props }) {
    const { className, type, ...otherProps } = props;

    const constructStyles = () => {
        let res =
            'flex w-full text-center items-center justify-center text-gray-700 font-semibold transition-all border-2 rounded-xl border-solid border-transparent px-4 py-2';

        if (type === 'submit' || variant === 'submit') {
            res +=
                ' border-0 w-fit gap-2 hover:bg-transparent hover:text-primary hover:border-primary !rounded-full bg-primary text-white disabled:cursor-wait disabled:bg-zinc-500 disabled:!border-zinc-500 disabled:!text-white';
        }

        if (variant === 'black') {
            res +=
                ' bg-black text-white hover:text-black hover:!bg-transparent hover:border-black';
        }

        if (className) {
            res += ' ' + className;
        }

        return res;
    };

    return (
        <button className={constructStyles()} {...otherProps}>
            {children}
        </button>
    );
}
