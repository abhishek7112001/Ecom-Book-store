import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import SeeUserData from './SeeUserData';

const AllOrders = () => {

    const [AllOrders, setAllOrders] = useState();
    const [Options, setOptions] = useState(-1);
    const [Values, setValues] = useState({status: ""});
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState();

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };


    useEffect(()=>{
        const fetch = async() =>{
            const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", {headers});
            setAllOrders(response.data.data)
        }
        fetch();
    }, [AllOrders])

    const change = (e) => {
        const {value} =e.target;
        setValues({status: value});
    };

    const submitChanges = async (i) =>{
        const id = AllOrders[i]._id;
        const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, Values, {headers});
        alert(response.data.message);
    }

    AllOrders && AllOrders.splice(Allorders.length-1 , 1);
    

  return (
    <>
        {!AllOrders &&  (
            <div className='h-[100%] flex items-center justify-center'>{" "}
                <Loader />{" "}
            </div>
        )}

        {AllOrders && AllOrders.length > 0 &&
        (
            <div className='h-[100%] p-0 md:p-4 text-black'>
                <h1 className='text-3xl md:text-5xl font-semibold text-black mb-8'>All Orders</h1>
                <div className='mt-4 bg-black w-full rounded py-2 px-4 flex gap-2'>
                    <div className='w-[3%]'>
                        <h1 className='text-center'>Sr.</h1>
                    </div>
                    <div className='w-[40%] md:w-[22%]'>
                        <h1 className=''>Books</h1>
                    </div>
                    <div className=' w-0 md:w-[45%] hidden md:block'>
                        <h1 className=''>Description</h1>
                    </div>
                    <div className='w-[17%] md:w-[9%] '>
                        <h1 className=''>Price</h1>
                    </div>
                    <div className='w-[30%] md:w-[16%]'>
                        <h1 className=''>Status</h1>
                    </div>
                    <div className='w-[10%] md:w-[5%]k'>
                        <h1 className=''>
                            <CiUser />
                        </h1>
                    </div>
                </div>

                {AllOrders && 
                    AllOrders.map((items,i) =>(
                        <div className='bg-black w-full rounded py-2 px-4 flex gap-2 hover:bg-gray-900 hover-cursor-pointer'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{i+1}</h1>
                            </div>
                            <div className='w-[40%] md:w-[22%]'>
                                <Link to={`/view-book-details/${items.book._id}`}
                                 className='hover:text-blue-400'>
                                    {items.book.title}
                                </Link>
                            </div>
                            <div className='w-0 md:w-[45%] hidden md:block'>
                                <h1 className=''>{items.book.desc.slice(0, 50)}...</h1>
                            </div>
                            <div className='w-[17%] md:w-[9%] '>
                                <h1 className=''>{items.book.price}</h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='font-semibold '>
                                    <button className='hover:scale-105 transition-all duration-300'
                                        onClick={()=>setOptions(i)}>
                                            {items.status ==="Order placed" ? (
                                                <div className='text-yellow-500'>{items.status}</div>
                                            ): items.status ==='Cancelled'? (
                                                <div className='text-red-500'>{items.status}</div>
                                            ):(
                                            <div className='text-green-500'>{items.status}</div>
                                            )}
                                    </button>
                                    
                                     
                                        <div className={`${Options === i ? "block" : "hidden"}` }>
                                        <select name='status' id='status' className='text-black'
                                        
                                        onChange={change}
                                        value={Values.status}>
                                            {[
                                                "Order Placed",
                                                "Out for delivery",
                                                "Delivered",
                                                "Cancelled",
                                            ].map((items, i)=>(
                                                <option key={i} value={items}>
                                                    {items}
                                                </option>
                                            ))}
                                        </select>

                                        <button className='text-green-500 hover:text-pink-600 mx-2'
                                        onClick={() =>{
                                            setOptions(-1);
                                            submitChanges(i);
                                        }}>
                                            <FaCheck />
                                        </button>
                                    </div>

                                    
                                </h1>
                            </div>
                            <div className='w-[10%] md:w-[5%]'>
                                <button className='text-xl hover:text-orange-500'
                                onClick={() =>{
                                    setuserDiv("fixed");
                                    setuserDivData(items.user);
                                }}>
                                    <IoOpenOutline />
                                </button>
                            </div>
                            
                        </div>
                ))}

            </div>
        )
        }
        {userDivData && (
            <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
        )}
    </>
  )
}

export default AllOrders