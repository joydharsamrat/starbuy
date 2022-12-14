import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductsCard from '../../Components/ProductsCard';
import SmallSpinner from '../../Components/SmallSpinner';

const Products = () => {

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch('https://starbuy-server.vercel.app/products')
            const data = await res.json()
            return data;
        }
    })
    return (
        <>

            {
                isLoading ? <SmallSpinner></SmallSpinner> :
                    <div>
                        {
                            products.length || <div className='h-screen flex justify-center items-center'>
                                <h1 className='text-7xl text-red-700'>No Products To Show</h1>
                            </div>
                        }

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mx-12 my-12 min-h-screen'>
                            {
                                products?.map(product => <ProductsCard key={product._id} product={product} refetch={refetch}></ProductsCard>)
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default Products;