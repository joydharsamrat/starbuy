import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import SmallSpinner from '../../Components/SmallSpinner';
import { authContext } from '../../Context/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(authContext);
    console.log(user)
    const { data: products = [], isLoading, } = useQuery({
        queryKey: ["myProducts"],
        queryFn: async () => {
            const res = await fetch(`https://starbuy-server.vercel.app/myProducts?email=${user?.email}`)
            const data = await res.json()
            return data;
        }
    })

    if (isLoading) {
        return <div className='h-screen flex items-center justify-center'>
            <SmallSpinner></SmallSpinner>
        </div>
    }

    return (
        <>
            {
                products?.length ?
                    <div className='my-12 min-h-screen mx-12'>
                        <h1 className='text-5xl font-bold text-center dark:text-white my-12'>My Products</h1>

                        <div className="overflow-x-auto w-full ">
                            <table className="table w-full">
                                <thead>
                                    <tr >
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => <tr key={product._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squire w-20 h-20">
                                                            <img src={product.img} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {product.name}

                                            </td>
                                            <td>INR{product.price}</td>
                                            <th>
                                                {product.status}
                                            </th>
                                        </tr>
                                        )}


                                </tbody>
                            </table>
                        </div>



                    </div>


                    :
                    <div className='h-screen flex justify-center items-center'>
                        <h1 className='text-7xl text-red-700'>No Products To Show</h1>
                    </div>
            }

        </>
    );
};

export default MyProducts;