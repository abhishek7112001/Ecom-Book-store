import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {authActions} from '../store/Auth';
import { useDispatch } from 'react-redux';


const LogIn = () => {

  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const change =(e)=>{
    const {name, value} =e.target;
    setValues({...Values, [name]: value});
  }

  const submit = async() =>{
    
    try {
      if(Values.username===""||Values.password===""){
        alert("Please fill all the fields");
      }
      else{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/sign-in`, Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        console.log(response.data);
        
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        
        alert("Logged in successfully");


        navigate("/profile");
        
      }
    } catch (error) {
      alert(error.response.data.message);
      
    }
  }



  return (
    <div className='h-auto sm:h-screen px-12 py-8 flex items-center justify-center'>
      <div className='bg-gray-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
        <p className='text-white text-xl'>
          Log In
        </p>
        <div className='mt-4'>
          <div>
            <label htmlFor='' className='text-white'>
              Username
            </label>
            <input 
            type='text'
            className='w-full mt-2 bg-black text-white p-2 outline-none'
            placeholder='username'
            name="username"
            required
            value={Values.username}
            onChange={change}
            />
            
          </div>
          
          <div className='mt-4'>
            <label htmlFor='' className='text-white'>
              Password
            </label>
            <input
            type='password'
            className='w-full mt-2 bg-black text-white p-2 outline-none'
            placeholder='password'
            name="password"
            required
            value={Values.password}
            onChange={change}
            />
          </div>
          
          <div className='mt-4'>
            <button className='w-full mt-8 bg-blue-600 font-semibold hover:bg-blue-400 text-white p-2 rounded-lg'
            onClick={submit}>
              Log In
            </button>
          </div>

          <p className='flex mt-4 items-center justify-center text-white font-semibold'>or</p>
          <p className=' items-center justify-center flex mt-4 text-white'>
            Dont't have an account? &nbsp;
            <Link to="/SignUp" className='text-blue-500 font-semibold'>
              <u>Sign up</u>
            </Link> 
          </p>
        </div>
      </div>
    </div>
  )
}

export default LogIn