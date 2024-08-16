import React, {useEffect, useState} from 'react'
import axios from 'axios';
import BookCard from '../BookCard/BookCard';


const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] =useState();


  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };


  useEffect(()=>{
    const fetch = async() =>{
      const response= await axios.get("http://localhost:1000/api/v1/get-favourite-books",{headers});
  
      setFavouriteBooks(response.data.data);
  }
  fetch();
  },[favouriteBooks]);
  

  return (
    <>
      {favouriteBooks && favouriteBooks.length===0 && (
        <div className='text-5xl font-semibold h-[100%] text-black flex items-center justify-center w-full flex-col '>
          No Favourite Books
        <img src='./oops.png' alt='oops' className='h-[40vh] my-8'/>
        </div>
      )}

      {/* <h1 className='text-5xl font-semibold text-black mb-8'>Favourite Books</h1> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {favouriteBooks && favouriteBooks.map((items, i)=>
        <div key={i}>
          <BookCard data={items} favourite={true} />
        </div>)}
      </div>
    </>
  )
}

export default Favourites