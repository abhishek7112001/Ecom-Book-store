import React from 'react'
import {useParams} from 'react-router-dom'

const ViewBookDetails = () => {
  const {id} =useParams();
  console.log();
  
  return (
    <div className='px-12 py-8 flex gap-8'>
        <div className='bg-black rounded p-4 text-white h-[70vh]'>jkwhkew</div>
        <div className='p-4'></div>
    </div>
  )
}

export default ViewBookDetails