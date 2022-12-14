import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../../Components/SmallSpinner';
import { authContext } from '../../Context/AuthProvider';
const AddProducts = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(authContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const imgHostKey = process.env.REACT_APP_ImgBB_Key;
    const handelAddProduct = (data, e) => {
        setLoading(true)
        const name = data.name
        const price = data.price
        const photo = data.photo[0];
        const seller = user.email
        const formData = new FormData()
        formData.append('image', photo)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    const product = {
                        name,
                        price,
                        seller,
                        img: data.data.url,
                        status: "unsold"
                    }

                    fetch('https://starbuy-server.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.acknowledged) {
                                toast.success('Product added successfully')
                                setLoading(false)
                                navigate('/')
                            }
                        })
                        .catch(err => {
                            setLoading(false)
                            console.log(err)
                        })
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })

    }
    return (
        <div className='flex justify-center items-center h-screen dark:text-white'>
            <div className='bg-gray-300 dark:bg-gray-600 p-10 rounded-xl shadow-lg'>
                <h1 className='text-5xl font-bold'>Add A Product</h1>
                <hr />
                <form className='mt-10' onSubmit={handleSubmit(handelAddProduct)}>
                    <div className="form-control w-full  my-3">
                        <input {...register("name", { required: "Name is required" })} type="text" placeholder='Product Name' className="input input-bordered w-full dark:text-black" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full  my-3">
                        <input {...register("price", { required: "price is required" })} type="text" placeholder='Price' className="input input-bordered w-full dark:text-black" />
                        {errors.price && <p className='text-red-600'>{errors.price?.message}</p>}
                    </div>

                    <div className="form-control w-full  my-3">
                        <label className='dark:text-white ' htmlFor="photo">Product Photo</label>
                        <input id='photo' type="file"{...register("photo", { required: "photo is required" })} placeholder="Your Photo" className="file-input w-full dark:text-black mb-3" />
                        {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}
                    </div>
                    {
                        loading ? <p className='flex justify-center'><SmallSpinner></SmallSpinner></p> :
                            <input className='btn btn-outline w-full dark:text-white ' type="submit" value="ADD" />
                    }
                </form>
            </div>
        </div>
    );
};

export default AddProducts;