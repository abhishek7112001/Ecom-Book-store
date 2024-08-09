import React from 'react'
import { Link } from 'react-router-dom';

const BookCard = ({data}) => {
    console.log(data);
    
  return (
    <>
    <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-black text-white p-4 rounded shadow-lg flex flex-col'>
            <div className='bg-white rounded flex items-center justify-center'>
                <img className='' src={data.url} alt='/'/>
            </div>
            <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
            <p className='mt-2 text-white font-semibold'>-by {data.author}</p>
            <p className='mt-2 text-white font-semibold text-xl'>₹ {data.price}</p>
        </div>
    </Link>
    </>
  )
}

export default BookCard