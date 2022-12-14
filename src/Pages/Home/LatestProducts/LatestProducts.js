import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductsCard from '../../../Components/ProductsCard';

const LatestProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch('https://starbuy-server.vercel.app/latestProducts')
            const data = await res.json()
            console.log('xyz')
            return data;

        }
    })
    return (
        <>
            {
                products?.length &&
                <div>
                    <h1 className='text-center text-5xl font-bold my-12 dark:text-white'>Latest Products</h1>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mx-12 my-12'>
                        {
                            products.map(product => <ProductsCard key={product._id} product={product} refetch={refetch}></ProductsCard>)
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default LatestProducts;