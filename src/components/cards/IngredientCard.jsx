import React from 'react';

const IngredientCard = ({ ingredient, onClick, picked }) => {
    return (
        <div
            onClick={() => onClick(ingredient)}
            className={`h-fit w-full cursor-pointer select-none overflow-hidden rounded-lg border border-solid border-transparent bg-white px-4 py-2 shadow-lg transition-all hover:shadow-md ${
                picked && '!border-primary !shadow-none'
            }`}
        >
            <h1 className={'w-full overflow-hidden text-ellipsis'}>
                {ingredient.name}
            </h1>
            <p>{ingredient.price}$</p>
        </div>
    );
};

export default IngredientCard;
