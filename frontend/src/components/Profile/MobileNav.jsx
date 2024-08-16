import React from 'react'
import { Link } from 'react-router-dom'


const MobileNav = () => {
  return (
    <div className='w-full flex items-center justify-between mt-4 gap-2 lg:hidden'>
        <Link to='/profile' className="text-black font-semibold w-full h-7  text-center hover:bg-gray-500 bg-gray-600  rounded 
          transition-all duration-300">
            Favourites
        </Link>

        <Link 
        to="/profile/orderHistory"
        className='text-black font-semibold w-full h-7 text-center hover:bg-gray-500 bg-gray-600 rounded transition-all duration-300'
        >
          Order History
        </Link>

        <Link
        to="/profile/settings"
        className='text-black font-semibold w-full h-7  text-center hover:bg-gray-500 bg-gray-600 rounded transition-all duration-300'
        >
          Settings
        </Link>
    </div>
  )
}

export default MobileNav