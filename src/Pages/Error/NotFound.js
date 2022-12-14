import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ background: 'url(https://i.ibb.co/1mpc5sm/undraw-Page-not-found-re-e9o6.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }} className='h-screen  flex justify-center'>
            <div >
                <h1 className='text-8xl text-red-600 font-bold'>Oops !!!</h1>
                <h2 className='text-5xl text-red-600 my-10'> Page not found !</h2>
                <Link to='/' className='text-2xl'>Home</Link>
            </div>
        </div>
    );
};

export default NotFound;