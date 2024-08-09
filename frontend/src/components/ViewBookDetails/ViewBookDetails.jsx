import {useParams} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Loader from '..//Loader/Loader'
import axios from 'axios';

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
    <div className='px-12 py-8 flex gap-8'>
        <div className='bg-black rounded p-4 text-white h-[70vh] w-3/6 items-center justify-center'>{" "}
          <img src={Data.url} />
        </div>
        <div className='p-4'></div>
    </div>
  )
}

export default ViewBookDetails