import React from 'react';
import IngredientCard from '@/components/cards/IngredientCard';

const IngredientsPicker = ({
    ingredients,
    pickedIngredients,
    setIngredients
}) => {
    const toggleIngredient = (ingredient) => {
        if (
            pickedIngredients.find(
                (pickedIngredient) => pickedIngredient.id === ingredient.id
            )
        ) {
            setIngredients(
                pickedIngredients.filter(
                    (pickedIngredient) => pickedIngredient.id !== ingredient.id
                )
            );
        } else {
            setIngredients([...pickedIngredients, ingredient]);
        }
    };

    return (
        <div
            className={
                'grid h-fit w-full grid-cols-2 items-center gap-4 px-2 py-5'
            }
        >
            {ingredients.map((ingredient) => (
                <IngredientCard
                    onClick={toggleIngredient}
                    key={ingredient.id}
                    picked={pickedIngredients.find(
                        (pickedIngredient) =>
                            pickedIngredient.id === ingredient.id
                    )}
                    ingredient={ingredient}
                />
            ))}
        </div>
    );
};

export default IngredientsPicker;
