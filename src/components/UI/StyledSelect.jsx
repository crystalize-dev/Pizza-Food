import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';

const StyledSelect = ({ options, active, setActive, id, order }) => {
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
                'flex w-full items-center justify-between gap-2 rounded-3xl bg-gray-100 p-1'
            }
        >
            <LayoutGroup id={id}>
                {customSort(options).map((option) => {
                    return (
                        <motion.div
                            className={`relative z-30 flex grow cursor-pointer select-none items-center justify-center rounded-3xl p-2`}
                            key={option.id}
                            onClick={() => setActive(option)}
                        >
                            {active?.id === option?.id && (
                                <motion.div
                                    layoutId={id}
                                    className={
                                        'absolute -z-10 h-full w-full rounded-3xl bg-white shadow-md'
                                    }
                                />
                            )}

                            <p>{option.name}</p>
                        </motion.div>
                    );
                })}
            </LayoutGroup>
        </div>
    );
};

export default StyledSelect;
