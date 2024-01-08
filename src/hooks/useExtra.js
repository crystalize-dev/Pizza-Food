import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const useExtra = (defaultValue) => {
    const [extra, setExtra] = useState(defaultValue ? defaultValue : []);

    const addExtra = () => {
        setExtra([...extra, { id: uuid(), name: '', price: 0 }]);
    };

    const changeExtra = (item) => {
        setExtra([
            ...extra.map((current) => {
                if (current.id === item.id) return item;
                else return current;
            })
        ]);
    };

    const deleteExtra = (id) => {
        setExtra([...extra.filter((item) => item.id !== id)]);
    };

    useEffect(() => {
        setExtra(defaultValue ? defaultValue : []);
    }, [defaultValue]);

    return { extra, changeExtra, addExtra, deleteExtra };
};
