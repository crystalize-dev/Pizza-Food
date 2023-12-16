import React from 'react';

export default function Icon({ path, ...props }) {
    const { className, ...otherProps } = props;

    return (
        <svg
            {...otherProps}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={'h-10 w-10 p-2 ' + className}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d={path} />
        </svg>
    );
}
