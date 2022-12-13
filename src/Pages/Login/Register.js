import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import SmallSpinner from '../../Components/SmallSpinner';
import { authContext } from '../../Context/AuthProvider';

const Register = () => {
    const [loading, setLoading] = useState(false)
    const { createUser, GoogleSignIn, updateUser } = useContext(authContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const imgHostKey = process.env.REACT_APP_ImgBB_Key;
    console.log(imgHostKey)
    const handelCreateUser = (data, e) => {
        setLoading(true)
        e.preventDefault()
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const photo = data.photo[0];
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
                    createUser(email, password)
                        .then(result => {
                            const user = {
                                name,
                                email,
                                img: data.data.url
                            }
                            console.log(result.user)
                            handelSetUserToDatabase(user)
                            handelUpdateUser(name, data.data.url)
                            e.target.reset()
                        })
                        .catch(err => {
                            console.log(err)
                            setLoading(false)
                        })
                }
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })

    }



    const handelGoogleSignIn = () => {
        GoogleSignIn()
            .then(result => {
                console.log(result.user)
                const user = {
                    name: result.user.displayName,
                    email: result.user.email,
                    img: result.user.photoURL,
                }
                handelSetUserToDatabase(user)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handelUpdateUser = (name, photo) => {
        const profile = {
            displayName: name,
            photoURL: photo
        }
        updateUser(profile)
            .then(result => { }
            )
            .catch(err => console.error(err))
    }

    const handelSetUserToDatabase = (user) => {
        fetch('https://starbuy-server.vercel.app/users', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('User created successfully')
                    setLoading(false)
                    navigate('/')
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <div className='lg:flex justify-around items-center my-12'>
            <div className='hidden md:block'>
                <img className='rounded-xl' src="https://i.ibb.co/xfNJbz6/login-3.jpg" alt="" />
            </div>
            <div>
                <div>
                    <div className='bg-white dark:bg-gray-600 w-full lg:w-[30vw] shadow-lg rounded-xl h-fit  p-5'>
                        <h2 className='text-center text-3xl font-bold text-white'>Register</h2>
                        <form onSubmit={handleSubmit(handelCreateUser)}>
                            <div className="form-control w-full  my-3">
                                <input {...register("name", { required: "Name is required" })} type="text" placeholder='Full Name' className="input input-bordered w-full " />
                                {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                            </div>
                            <div className="form-control w-full  my-3">
                                <input {...register("email", { required: "Email is required" })} type="email" placeholder='Email Address' className="input input-bordered w-full " />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full  my-3">
                                <input {...register("password", { required: "Password is required" })} type="password" placeholder='Password' className="input input-bordered w-full " />
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                            </div>
                            <label className='dark:text-white ' htmlFor="photo">Your Photo</label>
                            <input id='photo' type="file"{...register("photo")} placeholder="Your Photo" className="file-input w-full  mb-3" />
                            {
                                loading ? <p className='flex justify-center'><SmallSpinner></SmallSpinner></p> :
                                    <input className='btn btn-outline w-full dark:text-white ' type="submit" value="Register" />
                            }
                        </form>
                        <button onClick={handelGoogleSignIn} className='btn bg-[#004aad] w-full my-3 text-3xl'><FcGoogle></FcGoogle></button>
                    </div>
                </div>
                <div className='text-center my-3 dark:text-white'>
                    <p>Already have an account ? <Link className='text-blue-600 font-bold' to='/login'>Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;