import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';


const UserOrderHistory = () => {
let data=[];

  const [orderHistory, setOrderHistory] = useState([]);
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  useEffect(() => {
    const fetch = async() =>{
      const response = await axios.get("http://localhost:1000/api/v1/get-order-history",{headers});
      // console.log(response.data.data);
      console.log(response.data)
      setOrderHistory(response.data);
      // console.log(orderHistory)
      data=response.data
      console.log(data)
    }
    // console.log(orderHistory)
    fetch();
  }, []);


  return (
    <>
      {!orderHistory &&
      <div className='flex w-full items-center justify-center h-screen'>
        <Loader />
      </div>}

      {orderHistory && orderHistory===0 && (
        <div className='h-[80vh] p-4 text-black '>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1>
              No order history
            </h1>
            <img 
              src='https://cdn-icons-png.flaticon.com/128/9961/9961218.png' 
              alt='no order' 
              className='h-[30vh] mb-8'
            />
          </div>
        </div>
      )}

      {orderHistory && orderHistory.length>0 && (
        <div className='h-[100%] p-0 text-gray-800 ' >
          <h1 className='text-3xl md:text-5xl font-semibold text-black mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-gray-600 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>

          {data.map((items, i) => (
            <div className='bg-gray-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-gray-600 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i+1}</h1>
              </div>

              <div className='w-[22%]'>
                <Link 
                  to={`/view-book-details/${items.book._id}`}
                  className='hover:text-blue-300'
                  >
                    {items.book.title}
                </Link>
              </div>

              <div className='w-[45%]'>
                  <h1 className=''>{items.book.desc.slice(0, 50)}...</h1>
              </div>

              <div className='w-[9%]'>
                <h1 className=''>{items.book.price}</h1>
              </div>

              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status==="Order Placed" ? (
                    <div className='text-yellow-500'>{items.status}</div>
                  ): items.status ==='Cancelled'? (
                   <div className='text-red-500'>{items.status}</div>
                  ):(
                    items.status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm'>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UserOrderHistory