import React from 'react'
import { Link } from 'react-router-dom';

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

  return (
    <>
        <div className='bg-black py-2 text-white items-center text-xl text-center'>GET FLAT 10% OFF ON YOUR FIRST PURCHASE~~
            <span className='underline text-white'>HURRY UP!</span>
        </div>
        <div className="flex bg-white text-black px-4 py-5 items-center justify-between">
            
            <div className='flex items-center'>
                <img className='h-10 me-2' src="./logo_book.png" alt='logo'/>
                <h1 className='text-3xl font-cursive font-bold'>Bookoholic</h1>
            </div>
            <div className='nav-links-bookheaven flex gap-6 items-center'>
                <div className='flex gap-6'>
                {links.map((items, i)=>(
                    <Link to={items.link}
                    className='hover:text-gray-400 transition-all
                 duration-300 text-xl cursor-pointer font-semibold text-black p-1.5
                 rounded'

                 key={i}> {items.title}{" "}
                 </Link>
                 ))}
                </div>
                <div className='flex gap-5 '>
                     <Link to='LogIn' className='px-4 py-2 border-2 border-blue-500 font-semibold hover:bg-blue-500 rounded'>LogIn</Link>
                     <Link to='SignUp' className='px-4 py-2 bg-orange-700 text-white font-semibold hover:bg-orange-400 rounded'>SignUp</Link>
                </div>
            </div>

        </div>
        <div className='bg-black py-1 text-white items-center  text-center'> </div>
    </>
  )
}

export default Navbar