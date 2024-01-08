import React from 'react';
import Icon from '@/components/icon/Icon';

const CustomCheckbox = ({ value, setValue, label, disabled }) => {
    return (
        <div className={'flex w-fit items-center gap-2'}>
            <div
                className={`group h-6 w-6 cursor-pointer rounded-full border-2 border-solid border-black/40 p-1 transition-all ${
                    value
                        ? '!border-primary !bg-primary hover:opacity-50'
                        : 'hover:border-black'
                } ${
                    disabled &&
                    '!cursor-not-allowed !border-gray-600 !bg-gray-600 hover:opacity-100'
                }`}
                onClick={disabled ? undefined : () => setValue(!value)}
            >
                <Icon
                    icon={'ok'}
                    className={`!pointer-events-none hidden h-full w-full !p-0 !text-white group-hover:block ${
                        value && '!block'
                    }`}
                />
            </div>
            {label && <p>{label}</p>}
        </div>
    );
};

export default CustomCheckbox;
