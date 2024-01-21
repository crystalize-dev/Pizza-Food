import React from 'react';

const IngredientCard = ({ ingredient, onClick, picked }) => {
    return (
        <div
            onClick={() => onClick(ingredient)}
            className={`h-fit w-full min-w-fit cursor-pointer select-none rounded-lg border border-solid border-transparent bg-white px-4 py-2 shadow-lg transition-all hover:shadow-md ${
                picked && '!border-primary !shadow-none'
            }`}
        >
            <h1 className={'min-w-0 max-w-full text-ellipsis'}>
                {ingredient.name}
            </h1>
            <p>{ingredient.price}$</p>
        </div>
    );
};

export default IngredientCard;
