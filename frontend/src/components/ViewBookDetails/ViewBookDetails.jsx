import {Link, useParams} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios';
import {GrLanguage} from 'react-icons/gr';
import { FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const ViewBookDetails = () => {
  const {id} =useParams();
  
  const navigate = useNavigate();

  const [Data, setData] = useState();

  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const role = useSelector((state)=> state.auth.role);
  

  useEffect(()=>{
      const fetch = async() =>{
          const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
          console.log(response);
          
          setData(response.data.data);
      };
      fetch();
  }, []);


  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async()=>{
    const response = await axios.put(`http://localhost:1000/api/v1/add-book-to-favourite` ,{},{headers});
    alert(response.data.message);
    
  }


  const handleCart = async()=>{
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart",{},{headers});
    alert(response.data.message);
  }

  const deleteBook = async()=>{
    const response = await axios.delete(`http://localhost:1000/api/v1/delete-book/`,{headers});
    alert(response.data.message);
    navigate('/all-books');
  }
  return (
    <>
    {Data && (
    <div className='md:px-12 px-4 py-8 flex flex-col lg:flex-row gap-8 items-start'>
        <div className='bg-black lg:w-4/6 w-full '>
        {" "}

        <div className=' flex flex-col lg:flex-row justify-around bg-black py-12 px-5 rounded sm:items-center sm:justify-center'>
          {" "}
            <img src={Data.url} alt="/" className=' h-[50vh] md:h-[60vh] lg:h-[80vh] rounded' />

            {isLoggedIn ===true && role==="user" && (
              <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                <button className='lg:rounded-full rounded text-4xl p-3 text-red-500 flex ml-4 items-center justify-center
                   ' onClick={handleFavourite}><FaHeart /><span className='ms-4 mr-4 text-xl lg:hidden block '>Fav</span>
                </button>
                <button className='lg:rounded-full mt-8 md:mt-0 rounded text-3xl p-3 text-white lg:mt-4 ml-4  bg-blue-500 
                flex items-center justify-center' onClick={handleCart}><IoCartOutline />
                <span className='ms-4 mr-4 text-xl lg:hidden block'>Add to cart</span></button>
            </div>
            )}

            {isLoggedIn ===true && role==="admin" && (
              <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-4 lg:mt-0'>
                <Link to={`/updateBook/${id}`} className='lg:rounded-full rounded mt-8 md:mt-0 text-3xl p-3 text-red-500 lg:mt-4 ml-4 bg-white 
                flex items-center justify-center'><MdEditSquare /><span className='ms-4 mr-4 text-xl lg:hidden block '>Edit</span>
                </Link>
                <button className='lg:rounded-full rounded mt-8 md:mt-0 text-3xl p-3 text-red-500 lg:mt-4 ml-4 bg-white 
                flex items-center justify-center' onClick={deleteBook}><MdDelete />
                <span className='ms-4 mr-4 text-xl lg:hidden block'>Delete Book</span></button>
            </div>
            )}

        </div>

        </div>
        <div className='p-4 w-full lg:3/6'>
          <h1 className='text-4xl text-black font-semibold'>{Data && Data.title}</h1>
          <p className='text-xl text-black mt-1'>By {Data && Data.author}</p>
          <p className='text-black mt-4 text-xl'>{Data && Data.desc}</p>
          <p className='flex mt-4 items-center justify-start'> {" "}<GrLanguage className='mt-1'/> {"  "}{Data && Data.language}</p>
          <p className='mt-4 text-black text-3xl font-semibold'>₹{" "} {Data && Data.price}</p>
        </div>
    </div>
    )}
    {!Data && <div className='flex items-center justify-center h-screen'><Loader /> {" "}</div>}
    </>
  )

}
export default ViewBookDetails;