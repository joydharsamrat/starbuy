import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductsCard from './ProductsCard';

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
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 m-12'>
            {
                products.map(product => <ProductsCard key={product._id} product={product}></ProductsCard>)
            }
        </div>
    );
};

export default Products;