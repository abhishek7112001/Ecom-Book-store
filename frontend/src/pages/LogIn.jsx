import React from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
  return (
    <div className='h-auto sm:h-screen px-12 py-8 flex items-center justify-center'>
      <div className='bg-gray-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-white text-xl'>
          Sign Up
        </p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-white'>
              Username
            </label>
            <input 
            type='text'
            className='w-full mt-2 bg-black text-white p-2 outline-none'
            placeholder='username'
            name="username"
            required
            />
            
          </div>
          
          <div className='mt-4'>
            <label htmlFor='' className='text-white'>
              Password
            </label>
            <input
            type='password'
            className='w-full mt-2 bg-black text-white p-2 outline-none'
            placeholder='password'
            name="password"
            required
            />
          </div>
          
          <div className='mt-4'>
            <button className='w-full mt-8 bg-blue-600 font-semibold hover:bg-blue-400 text-white p-2 rounded-lg'>
              Log In
            </button>
          </div>

          <p className='flex mt-4 items-center justify-center text-white font-semibold'>or</p>
          <p className=' items-center justify-center flex mt-4 text-white'>
            Dont't have an account? &nbsp;
            <Link to="/SignUp" className='text-blue-500 font-semibold'>
              <u>Sign In</u>
            </Link> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogIn