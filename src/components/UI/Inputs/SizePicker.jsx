import React from 'react';
import { motion } from 'framer-motion';

const SizePicker = ({ options, active, setActive, id, order }) => {
    const customSort = (array) => {
        const sortedArray = array.slice();

        sortedArray.sort(function (a, b) {
            const orderA = order[a.name] || 9999; // Если элемент не входит в указанные, ставим его в конец
            const orderB = order[b.name] || 9999;

            // Сравниваем порядковые номера
            return orderA - orderB;
        });

        return sortedArray;
    };

    return (
        <div
            className={
                'z-30 flex w-full items-center justify-between gap-2 rounded-3xl bg-gray-100 p-1'
            }
        >
            {customSort(options).map((option) => {
                return (
                    <motion.div
                        className={`relative flex grow cursor-pointer select-none items-center justify-center rounded-3xl p-2 text-black`}
                        key={option.name}
                        onClick={() => setActive(option)}
                    >
                        <motion.p className={'z-30 !text-black'}>
                            {option.name}
                        </motion.p>

                        {active?.name === option?.name && (
                            <motion.div
                                layoutId={id}
                                className={
                                    'absolute z-20 h-full w-full rounded-3xl bg-white shadow-md'
                                }
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default SizePicker;
