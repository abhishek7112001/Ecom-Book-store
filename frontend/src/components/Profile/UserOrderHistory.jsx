import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get-order-history`, { headers });
        const data = response.data?.data || [];

        // Filter out orders with null books (just in case)
        const validOrders = data.filter(order => order.book !== null);
        setOrderHistory(validOrders);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className='flex w-full items-center justify-center h-screen'>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {orderHistory.length === 0 ? (
        <div className='h-[80vh] p-4 text-white'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1>No order history</h1>
            <img
              src='https://cdn-icons-png.flaticon.com/128/9961/9961218.png'
              alt='no order'
              className='h-[30vh] mb-8'
            />
          </div>
        </div>
      ) : (
        <div className='h-[100%] p-0 text-white'>
          <h1 className='text-3xl md:text-5xl font-semibold text-white mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-gray-600 w-full rounded py-2 px-4 flex gap-2 text-white'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1>Mode</h1>
            </div>
          </div>

          {orderHistory.map((items, i) => (
            <div
              key={items._id}
              className='bg-gray-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-gray-600 hover:cursor-pointer text-white'
            >
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                  {items.book.title}
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1>{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1>{items.book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold'>
                  {items.status === "Order Placed" ? (
                    <span className='text-yellow-400'>{items.status}</span>
                  ) : items.status === 'Cancelled' ? (
                    <span className='text-red-400'>{items.status}</span>
                  ) : (
                    <span className='text-green-400'>{items.status}</span>
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
  );
};

export default UserOrderHistory;
