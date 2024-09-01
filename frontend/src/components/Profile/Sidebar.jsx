import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';
import { authActions } from '../../store/Auth';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = ({data}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const role = useSelector((state) =>state.auth.role);
  return (
    <div className='bg-black text-white p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
      <div className='flex items-center flex-col justify-center'>
          <img src= '/profile.png' className='h-[12vh] rounded'/>
          <p className='mt-3 text-xl text-white font-semibold'>
            {data.username}
          </p>
          <p className='mt-1 text-normal text-white mb-2'>
            {data.email}
          </p>
          <div className='w-full mt-4 h-[1px] bg-black hidden lg:block'></div>
      </div>

      {role==="user" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex'>
            <Link to='/profile' className="text-white font-semibold w-full py-2 text-center hover:bg-gray-500 bg-gray-600  rounded 
              transition-all duration-300">
                Favourites
            </Link>

            <Link 
            to="/profile/orderHistory"
            className='text-white font-semibold w-full py-2 mt-4 text-center hover:bg-gray-500 bg-gray-600 rounded transition-all duration-300'
            >
              Order History
            </Link>

            <Link
            to="/profile/settings"
            className='text-white font-semibold w-full py-2 mt-4 text-center hover:bg-gray-500 bg-gray-600 rounded transition-all duration-300'
            >
              Settings
            </Link>
        </div>
      )}
      {role==="admin" && (
            <div className='w-full flex-col items-center justify-center hidden gap-10 lg:flex'>
            <Link to='/profile' className="text-black font-semibold w-full h-8  text-center hover:bg-gray-400 bg-gray-500  rounded 
              transition-all duration-300 ">
                All Orders
            </Link>
    
            <Link 
            to="/profile/add-book"
            className='text-black font-semibold w-full h-8 text-center hover:bg-gray-400 bg-gray-500 rounded transition-all duration-300'
            >
              Add Book
            </Link>
    
            
        </div>
        )}


      <button className='bg-orange-600 w-3/6 lg:w-full mt lg:mt-0 text-white font-semibold flex items-center justify-center 
      py-2 rounded hover:bg-orange-400 transition-all duration-300'
      onClick={() =>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history("/")
        alert("Logged Out");
      }}>
        Log Out<FaSignOutAlt className='ms-4'
        />
      </button>
    </div>
  )
}

export default Sidebar;