import React from 'react';
import { icons } from '@/components/icon/icons-database';

export default function Icon({ icon, ...props }) {
    const { className, ...otherProps } = props;

    return (
        <svg
            {...otherProps}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={
                'h-10 w-10 cursor-pointer p-2 hover:text-primary ' + className
            }
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={icons[icon]}
            />
        </svg>
    );
}
