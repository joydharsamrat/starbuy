import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SmallSpinner from '../../Components/SmallSpinner';
import { authContext } from '../../Context/AuthProvider';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const { logIn, GoogleSignIn } = useContext(authContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";


    const handelLogin = (data, e) => {
        setLoading(true)
        const email = data.email;
        const password = data.password;
        logIn(email, password)
            .then(result => {
                console.log(result.user)
                setLoading(false)
                navigate(from, { replace: true })
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
            .catch(err => console.log(err))
    }

    const handelSetUserToDatabase = (user) => {
        fetch('', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLoading(false)
                navigate(from, { replace: true })
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
                        <h2 className='text-center text-3xl font-bold text-white'>Sign In</h2>
                        <form onSubmit={handleSubmit(handelLogin)}>
                            <div className="form-control w-full  my-3">
                                <input {...register("email", { required: "Email is required" })} type="email" placeholder='Email Address' className="input input-bordered w-full " />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full  my-3">
                                <input {...register("password", { required: "Password is required" })} type="password" placeholder='Password' className="input input-bordered w-full " />
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                            </div>
                            {
                                loading ? <p className='flex justify-center'> <SmallSpinner></SmallSpinner></p> :
                                    <input className='btn btn-outline w-full dark:text-white ' type="submit" value="Sign In" />
                            }
                        </form>
                        <button onClick={handelGoogleSignIn} className='btn bg-[#004aad] w-full my-3 text-3xl'><FcGoogle></FcGoogle></button>
                    </div>
                </div>
                <div className='text-center my-3 dark:text-white'>
                    <p>New To Star Buy ? <Link className='text-blue-600 font-bold' to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;