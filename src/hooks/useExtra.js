import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const useExtra = (category, extraType) => {
    const [extra, setExtra] = useState([]);

    const addExtra = () => {
        setExtra([...extra, { id: uuid(), name: '', price: 0 }]);
    };

    const changeExtra = (item) => {
        setExtra(
            extra.map((current) => {
                if (current.id === item.id) return item;
                else return current;
            })
        );
    };

    const deleteExtra = (id) => {
        setExtra(extra.filter((item) => item.id !== id));
    };

    useEffect(() => {
        if (category.value === 'Pizza') {
            if (extraType === 'ingredients') {
                setExtra([
                    {
                        id: uuid(),
                        name: 'Cheese',
                        price: 5
                    },
                    {
                        id: uuid(),
                        name: 'Salami',
                        price: 4
                    },
                    {
                        id: uuid(),
                        name: 'Mushrooms',
                        price: 2
                    }
                ]);
            } else if (extraType === 'sizes') {
                setExtra([
                    {
                        id: uuid(),
                        name: 'Small',
                        price: 0
                    },
                    {
                        id: uuid(),
                        name: 'Medium',
                        price: 5
                    },
                    {
                        id: uuid(),
                        name: 'Large',
                        price: 10
                    }
                ]);
            } else {
                setExtra([]);
            }
        } else {
            setExtra([]);
        }
    }, [category, extraType]);

    return { extra, changeExtra, addExtra, deleteExtra };
};
