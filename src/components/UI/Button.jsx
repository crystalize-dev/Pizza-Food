import React from 'react';

export default function Button({ variant, children, ...props }) {
    const { className, type, ...otherProps } = props;

    const constructStyles = () => {
        let res =
            'flex w-full text-center  gap-2 items-center outline-none whitespace-nowrap justify-center text-gray-700 font-semibold transition-all border-2 rounded-full border-solid border-transparent px-4 py-2';

        if (type === 'submit' || variant === 'submit') {
            res +=
                ' border-0 w-fit gap-2 hover:bg-transparent hover:!text-primary hover:border-primary !rounded-full bg-primary text-white disabled:cursor-wait disabled:bg-zinc-500 disabled:!border-zinc-500 disabled:!text-white';
        }

        if (variant === 'black') {
            res +=
                ' bg-black text-white hover:text-black hover:!bg-transparent hover:border-black';
        }

        if (variant === 'inactive') {
            res +=
                ' bg-gray-300 hover:bg-primary text-white disabled:bg-gray-400 disabled:cursor-not-allowed';
        }

        if (className) {
            res += ' ' + className;
        }

        return res;
    };

    return (
        <button type={type} className={constructStyles()} {...otherProps}>
            {children}
        </button>
    );
}
