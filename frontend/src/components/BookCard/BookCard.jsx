import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({data,favourite}) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
    }
    
  const handleRemoveBook = async ()=>{
    const response = await axios.put(`http://localhost:1000/api/v1/remove-book-from-favourite`,
      {},
      {headers}
    );
    alert(response.data.message);  
  }

  return (
    <div className='bg-black rounded p-4 flex flex-col'>
      <Link to={`/view-book-details/${data._id}`}>
          <div className='bg-black text-white p-4 rounded shadow-lg flex flex-col'>
              <div className='bg-white rounded flex items-center justify-center'>
                  <img className='h-[25vh]' src={data.url} alt='/'/>
              </div>
              <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
              <p className='mt-2 text-white font-semibold'>-by {data.author}</p>
              <p className='mt-2 text-white font-semibold text-xl'>₹ {data.price}</p>

          </div>
      </Link>
      {favourite && (
              <button className='bg-red-600 font-semibold py-2 rounded 
              border border-yellow-500 mt-4' onClick={handleRemoveBook}>Remove from favourite</button>
      )}
    </div>
  )
}

export default BookCard;