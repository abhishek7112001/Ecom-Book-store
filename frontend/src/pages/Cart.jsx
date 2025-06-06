import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import {AiFillDelete} from 'react-icons/ai'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate= useNavigate();
  const [Cart, setCart] =useState();
  const [Total, setTotal] = useState(0);

  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  useEffect(()=>{
    const fetch = async() =>{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get-user-cart`,{headers});
      setCart(response.data.data);
    }
    fetch();
  },[Cart]);

  const deleteItem = async(bookid)=>{
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/remove-from-cart/${bookid}`,{},{headers});
    alert(response.data.message);
  };

  useEffect(()=>{
    if(Cart && Cart.length>0){
      let total=0;
      Cart.map((items)=>{
        total=total+items.price
      });
      setTotal(total);
      total=0;
    }
  },[Cart]);

  const PlaceOrderCOD =async() =>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/place-order`,{order:Cart},{headers});
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className='bg-white px-12 h-screen py-8'>
      {!Cart &&
         <div className='flex w-full items-center justify-center h-[100%]'>
          <Loader />
         </div>}
      {Cart && Cart.length===0 && (
        <div className='h-screen'>
          <div className='text-3xl font-semibold h-[100%] text-black flex items-center justify-center w-full flex-col '>
            <h1 className='text-5xl lg:text-6xl font-semibold text-Black'>
              Empty Cart!
            </h1>
            <img src='./oops.png' alt='oops' className='h-[40vh] my-8'/>
          </div>
        </div>

      )}
      {Cart && Cart.length>0 && (
        <>
          <h1 className='text-5xl font-semibold text-black mb-8'>
            Your Cart
          </h1>
          {Cart.map((items, i)=>(
            <div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg:black justify-between 
            items-center bg-black' key={i}>
              <img src={items.url} alt='/' 
              className='h-[20vh] md:h-[10vh] object-cover'/>
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-white font-semibold text-start mt-2 md:mt-0'>
                  {items.title}
                </h1>
                <p className='text-normal text-white mt-2 hidden lg:block items-start'>
                  {items.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-white mt-2 hidden md:block lg:hidden items-start'>
                  {items.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-white mt-2 block md:hidden items-start'>
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-fu;; md:w-auto items-center justify-between'>
                <h2 className='text-white text-3xl font-semibold flex'>
                ₹ {items.price}
                </h2>
                <button className='bg-red-100 text-red-700 border border-red-700 p-2 ms-12'
                  onClick={()=> deleteItem(items._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          
        </>
      )}

      {Cart && Cart.length>0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-gray-600 rounded'>
            <h1 className='text-3xl font-semibold text-white'>
              Total:
            </h1>
            <div className='mt-3 flex items-center justify-between text-xl text-white'>
              <h2>{Cart.length} books </h2><h2>{Total}</h2>
            </div>
            <div className='w-[100%] mt-3 flex gap-4'>
              {/* COD Button */}
              <button
                className='bg-black rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-gray-400 text-white'
                onClick={PlaceOrderCOD}
              >
                Place Order (COD)
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Cart