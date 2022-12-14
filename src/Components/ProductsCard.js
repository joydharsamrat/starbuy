import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Context/AuthProvider';
import { FaRupeeSign } from "react-icons/fa";

const ProductsCard = ({ product, refetch, setBought }) => {
    const { user } = useContext(authContext)
    const { name, price, img, seller, _id } = product;



    const handelBuyProduct = () => {

        const product = {
            buyer: user.email,
            id: _id
        }

        fetch(`https://starbuy-server.vercel.app/products`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success("Product Purchased Successfully")
                }
                refetch()
                setBought(true)
            })
    }

    return (
        <div className="card w-96 max-h-[500px] bg-gray-300 shadow-xl dark:bg-gray-600 dark:text-white">
            <figure>
                <img src={img} alt={name} />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <div className='flex items-center gap-2'>Price: <p className='flex items-center'><FaRupeeSign></FaRupeeSign>{price}</p></div>
                {
                    user?.email === seller || <button onClick={handelBuyProduct} className="btn btn-outline dark:text-white">Buy Now</button>
                }
            </div>
        </div>
    );
};

export default ProductsCard;