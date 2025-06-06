import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [data, setData] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  // let temp =[];
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

   // Run only once on mount

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = data[i]._id;
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/update-status/${id}`, Values, { headers });
      alert(response.data.message);

      // Ensure you're creating a new array
      setData(prevData => {
        const updatedData = [...prevData];
        updatedData[i].status = Values.status; // Update the specific order status
        return updatedData; // Return the new state
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get-all-orders`, { headers });
        console.log("API Response:", response.data); // Debugging the response
        setData(response.data);
         // Set the data state

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* {temp && temp.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-white'>
          <h1 className='text-3xl md:text-5xl font-semibold text-black mb-8'>All Orders</h1>
          <div className='mt-4 bg-black w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1><CiUser /></h1>
            </div>
          </div>

          {
              temp && temp.length>0 && 
              (
              temp.map((items, i,_) => (
                // <div key={i} className='bg-black w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-900 hover-cursor-pointer'>
                //   <div className='w-[3%]'>
                //     <h1 className='text-center'>{i + 1}</h1>
                //   </div>
                //   <div className='w-[40%] md:w-[22%]'>
                //     <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-400'>
                //       {items.book.title}
                //     </Link>
                //   </div>
                //   <div className='w-0 md:w-[45%] hidden md:block'>
                //     <h1>{items.book.desc.slice(0, 50)}...</h1>
                //   </div>
                //   <div className='w-[17%] md:w-[9%]'>
                //     <h1>{items.book.price}</h1>
                //   </div>
                //   <div className='w-[30%] md:w-[16%]'>
                //     <h1 className='font-semibold'>
                //       <button className='hover:scale-105 transition-all duration-300' onClick={() => setOptions(i)}>
                //         <div className={
                //           items.status === "Order placed" ? 'text-yellow-500' :
                //           items.status === 'Cancelled' ? 'text-red-500' :
                //           'text-green-500'
                //         }>
                //           {items.status}
                //         </div>
                //       </button>
    
                //       <div className={`${Options === i ? "block" : "hidden"}`}>
                //         <select
                //           name='status'
                //           id='status'
                //           className='text-black'
                //           onChange={change}
                //           value={Values.status}>
                //           {[
                //             "Order Placed",
                //             "Out for delivery",
                //             "Delivered",
                //             "Cancelled",
                //           ].map((option, index) => (
                //             <option key={index} value={option}>
                //               {option}
                //             </option>
                //           ))}
                //         </select>
    
                //         <button
                //           className='text-green-500 hover:text-pink-600 mx-2'
                //           onClick={() => {
                //             setOptions(-1);
                //             submitChanges(i);
                //           }}>
                //           <FaCheck />
                //         </button>
                //       </div>
                //     </h1>
                //   </div>
                //   <div className='w-[10%] md:w-[5%]'>
                //     <button
                //       className='text-xl hover:text-orange-500'
                //       onClick={() => {
                //         setUserDiv("fixed");
                //         setUserDivData(items.user);
                //       }}>
                //       <IoOpenOutline />
                //     </button>
                //   </div>
                // </div>
                <div key={i} className='bg-black text-white'>{items.book}</div>
              )))
            
          }
        </div>
      )}

      {userDivData && <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setUserDiv} />} */}
      {
        data && data.length>0 && (
          data.map((item,index,_)=>{
            return (
              <div className='bg-black text-white'>{item.book}</div>
            )
          })
        )
      }
    </div>
  );
};

export default AllOrders;
