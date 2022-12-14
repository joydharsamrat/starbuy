import React, { useEffect, useState } from 'react';
import ProductsCard from '../../Components/ProductsCard';
import SmallSpinner from '../../Components/SmallSpinner';

const Products = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [bought, setBought] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('https://starbuy-server.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProducts(data)
                setIsLoading(false)
            })
    }, [bought])
    return (
        <>

            {
                isLoading ? <div className='h-screen flex items-center justify-center'>
                    <SmallSpinner></SmallSpinner>
                </div> :
                    <div>

                        <h1 className='text-5xl text-center my-12 dark:text-white font-bold'>Products</h1>

                        {
                            products.length || <div className='h-screen flex justify-center items-center'>
                                <h1 className='text-7xl text-red-700'>No Products To Show</h1>
                            </div>
                        }

                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 lg:mx-12 my-12 min-h-screen'>
                            {
                                products?.map(product => <ProductsCard key={product._id} product={product} setBought={setBought}></ProductsCard>)
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default Products;