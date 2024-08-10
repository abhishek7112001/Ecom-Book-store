import {useParams} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios';
import {GrLanguage} from 'react-icons/gr';


const ViewBookDetails = () => {
  const {id} =useParams();
  
  const [Data, setData] = useState();
  useEffect(()=>{
      const fetch = async() =>{
          const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
          console.log(response);
          
          setData(response.data.data);
      };
      fetch();
  }, []);

  return (
    <>
    {Data && (
    <div className='md:px-12 px-4 py-8 flex gap-8 flex-col md:flex-row'>
        <div className='bg-black rounded p-4 text-white h-[80] lg:h-[86vh] w-full lg:w-3/6 flex items-center justify-center'>
        {" "}
        <img src={Data.url} alt="/" className=' h-[50vh] lg:h-[80vh] rounded' />
        </div>
        <div className='p-4 w-5/6 '>
          <h1 className='text-4xl text-black font-semibold'>{Data && Data.title}</h1>
          <p className='text-xl text-black mt-1'>By {Data && Data.author}</p>
          <p className='text-black mt-4 text-xl'>{Data && Data.desc}</p>
          <p className='flex mt-4 items-center justify-start'><GrLanguage className='mt-1'/>{Data && Data.language}</p>
          <p className='mt-4 text-black text-3xl font-semibold'>₹{" "} {Data && Data.price}</p>
        </div>
    </div>
    )}
    {!Data && <div className='flex items-center justify-center h-screen'><Loader /> {" "}</div>}
    </>
  )

}
export default ViewBookDetails;