import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center gap-10'>
            <h1 className='text-7xl text-red-500'>Something Went Wrong</h1>
            <Link to='/' className='text-blue-400 text-xl'>Home</Link>
        </div>
    );
};

export default ErrorPage;