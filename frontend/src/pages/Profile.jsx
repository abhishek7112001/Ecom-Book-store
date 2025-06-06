import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import {useSelector} from "react-redux";
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';


const Profile = () => {
  // const isLoggedIn = useSelector();


  const [Profile, setProfile] =useState();

  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get-user-information`,{headers});
      setProfile(response.data);
    };
  
  fetch();
  }, []);

  return (
    <div className='md:px-12 px-2 flex md:flex-row flex-col py-8 gap-4 text-black'>
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
        )}
      {Profile &&
      <>
      <div className='w-full md:w-1/6 h-auto lg:h-screen'>
        <Sidebar data={Profile}/>
        <MobileNav />
      </div>
      <div className='w-5/6'>
        <Outlet />
      </div>
      </>}
    </div>
  )
}

export default Profile;