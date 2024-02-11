import React from 'react';

export default function Input({ label = 'Default label', ...props }) {
    const { className, ...otherProps } = props;
    let withLabel = false;

    if (label !== 'Default label') {
        withLabel = true;
    }

    return (
        <label className="relative flex h-fit w-full flex-col-reverse">
            <input
                className="text-font-semibold w-full rounded-lg bg-transparent px-4 py-2 outline outline-2 outline-black/40 transition-all hover:outline-black/80 focus:outline-primary disabled:cursor-not-allowed disabled:text-gray-400 disabled:outline-black/20"
                {...otherProps}
            />
            {withLabel && (
                <p className="absolute -top-6 left-2 text-sm text-gray-400 transition-all">
                    {label}
                </p>
            )}
        </label>
    );
}
