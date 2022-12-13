import React from 'react';

const ProductsCard = ({ product }) => {

    const { name, price, img } = product;

    return (
        <div className="card  bg-gray-300 shadow-xl dark:bg-gray-600 dark:text-white">
            <figure className="px-10 pt-10">
                <img src={img} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>Price: INR{price}</p>
                <div className="card-actions">
                    <button className="btn btn-outline dark:text-white">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;