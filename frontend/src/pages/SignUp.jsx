import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [Values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === '' ||
        Values.email === '' ||
        Values.password === '' ||
        Values.address === ''
      ) {
        alert('Please fill all the fields');
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/sign-up`,
          Values
        );
        alert(response.data.message);
        navigate('/LogIn');
      }
    } catch (error) {
      console.error('SignUp Error:', error);
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong!';
      alert(errorMessage);
    }
  };

  return (
    <div className='h-auto px-12 py-8 flex items-center justify-center'>
      <div className='bg-gray-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-white text-xl'>Sign Up</p>
        <div className='mt-4'>
          <div>
            <label htmlFor='username' className='text-white'>
              Username
            </label>
            <input
              type='text'
              id='username'
              className='w-full mt-2 bg-black text-white p-2 outline-none'
              placeholder='username'
              name='username'
              required
              value={Values.username}
              onChange={change}
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='email' className='text-white'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full mt-2 bg-black text-white p-2 outline-none'
              placeholder='xyz@example.com'
              name='email'
              required
              value={Values.email}
              onChange={change}
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='password' className='text-white'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='w-full mt-2 bg-black text-white p-2 outline-none'
              placeholder='password'
              name='password'
              required
              value={Values.password}
              onChange={change}
            />
          </div>

          <div className='mt-4'>
            <label htmlFor='address' className='text-white'>
              Address
            </label>
            <input
              type='text'
              id='address'
              className='w-full mt-2 bg-black text-white p-2 outline-none'
              placeholder='address'
              name='address'
              required
              value={Values.address}
              onChange={change}
            />
          </div>

          <div className='mt-4'>
            <button
              className='w-full mt-8 bg-orange-500 font-semibold hover:bg-orange-400 text-white p-2 rounded-lg'
              onClick={submit}
            >
              Sign Up
            </button>
          </div>

          <p className='flex mt-4 items-center justify-center text-white font-semibold'>
            or
          </p>
          <p className='flex mt-4 justify-center text-white'>
            Already have an account? &nbsp;
            <Link to='/LogIn' className='text-blue-500 font-semibold underline'>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
