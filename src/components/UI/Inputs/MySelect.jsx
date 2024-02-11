import React from 'react';
import Select from 'react-select';

const MySelect = ({ options, current, setCurrent, placeholder, label }) => {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            outline: state.isFocused
                ? '2px solid var(--main)'
                : '2px solid rgba(0,0,0,0.4)',
            borderRadius: '8px'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#808080'
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
            borderRadius: '8px'
        }),
        menu: (provided) => ({
            ...provided,
            padding: 0,
            borderRadius: '8px'
        }),
        option: (provided, state) => ({
            ...provided,
            borderTopLeftRadius:
                state.data && state.data.value === options[0].value
                    ? '8px'
                    : '0',
            borderTopRightRadius:
                state.data && state.data.value === options[0].value
                    ? '8px'
                    : '0',
            borderBottomLeftRadius:
                state.data &&
                state.data.value === options[options.length - 1].value
                    ? '8px'
                    : '0',
            borderBottomRightRadius:
                state.data &&
                state.data.value === options[options.length - 1].value
                    ? '8px'
                    : '0',
            cursor: 'pointer',
            backgroundColor:
                state.data && state.data.value === current.value
                    ? 'var(--main) !important'
                    : state.isFocused
                      ? 'color-mix(in srgb, var(--main) 20%, white)'
                      : 'inherit',
            color:
                state.data && state.data.value === current.value
                    ? 'white'
                    : 'inherit',
            '&:hover': {
                backgroundColor: 'color-mix(in srgb, var(--main) 20%, white)'
            }
        })
    };

    return (
        <div className={'relative flex h-fit w-full flex-col-reverse'}>
            <Select
                placeholder={placeholder}
                value={current}
                onChange={setCurrent}
                options={options}
                styles={customStyles}
            />
            {label && (
                <p className="absolute -top-6 left-2 text-sm text-gray-400 transition-all">
                    {label}
                </p>
            )}
        </div>
    );
};

export default MySelect;
