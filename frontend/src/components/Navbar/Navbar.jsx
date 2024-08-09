import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
const Navbar = () => {
    const links =[
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
    ];

    const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
    <nav className='relative z-50 '>
        <div className='bg-black py-2 text-white items-center text-xl text-center'>10% OFF ON FIRST PURCHASE
            
        </div>
        <div className="flex bg-white text-black px-4 py-5 items-center justify-between">
            
            <Link to='/' className='flex items-center'>
                <img className='h-10 me-2' src="./logo_book.png" alt='logo'/>
                <h1 className='text-3xl font-cursive font-bold'>Bookoholic</h1>
            </Link>
            <div className='nav-links-bookheaven block md:flex gap-6 items-center'>
                <div className='hidden md:flex gap-4'>
                {links.map((items, i)=>(
                    <Link to={items.link}
                    className='hover:text-gray-400 transition-all
                 duration-300 text-xl cursor-pointer font-semibold text-black p-1.5
                 rounded'

                 key={i}> {items.title}{" "}
                 </Link>
                 ))}
                </div>
                <div className='hidden md:flex gap-4 '>
                     <Link to='LogIn' className='px-4 py-2 border-2 border-blue-500 font-semibold hover:bg-blue-500 rounded'>LogIn</Link>
                     <Link to='SignUp' className='px-4 py-2 bg-orange-700 text-white font-semibold hover:bg-orange-400 rounded'>SignUp</Link>
                </div>
                <button className='text-2xl block hover:text-gray-400 lg:hidden md:hidden' onClick={()=> MobileNav=== "hidden" ? setMobileNav("block"): setMobileNav("hidden")}>
                    <FiMenu />
                </button>
            </div>
        </div>
        <div className='bg-black py-1 text-white items-center  text-center'> </div>
    </nav>
    

    <div className={`${MobileNav } bg-black h-screen top-8 absolute left-0 w-full z-40 
            flex flex-col items-center justify-center mt-4`}>
                {links.map((items, i)=>(
                    <Link to={items.link}
                    className={`hover:text-gray-400 transition-all
                 duration-300 text-2xl cursor-pointer font-semibold text-white mt-8
                 rounded` }

                 key={i}
                 onClick={()=> MobileNav=== "hidden" ? setMobileNav("block"): setMobileNav("hidden")}
                 > {items.title}{" "} 
                  
                  
                 </Link>
                 
                 ))}
                 
                <Link to='LogIn' className={`px-8 mt-6 py-2 border-2 text-white border-blue-500 font-semibold hover:bg-blue-500 rounded`}>LogIn</Link>
                <Link to='SignUp' className={`px-8 mt-6 py-2 bg-orange-700 text-white font-semibold hover:bg-orange-400 rounded`}>SignUp</Link>
                
    </div>
    </>
  )
}

export default Navbar