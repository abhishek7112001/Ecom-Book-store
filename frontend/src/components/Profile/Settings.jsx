import React , {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Settings = () => {
  const [Value, setValue] = useState({address: ""});
  const [profileData, setProfileData] = useState();
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };

  const change =(e) =>{
    const {name, value} =e.target;
    setValue({...Value, [name]: value});
  };

    useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/get-user-information`,{headers});
        setProfileData(response.data);
        setValue({address: response.data.address});
      }
      fetch();
    }, []);

    
    const submitAddress =async()=>{
      const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/update-address`,Value,{headers});
      alert(res.data.message);
    }
    
    


  return (
    <>
      {!profileData && 
      (<div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
      </div>
      )}{" "}

      {profileData && (
        <div className='h-[100%] p-0 md:p-4 text-white'>
          <h1 className='text-3xl md:text-5xl font-semibold text-black mb-8'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor='' className='text-black'>UserName:</label>
              <p className='p-2 rounded bg-black mt-2 font-semibold'>
                {profileData.username}
              </p>
            </div>
            <div className=''>
              <label htmlFor='' className='text-black'>Email</label>
              <p className='p-2 rounded bg-black mt-2 font-semibold'>
                {profileData.email}
              </p>
            </div>

          </div>

          <div className='mt-4 flex flex-col text-black'>
            <label htmlFor=''>Address</label>
            <textarea 
              className='p-2 mt-2 font-semibold bg-gray-400 rounded text-black'
              rows="5"
              placeholder='Address'
              name='address'
              value={Value.address}
              onChange={change}
            />
          </div>

          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-black font-semibold px-3 py-2 rounded  hover:bg-yellow-400'
              onClick={submitAddress}>
              Update
            </button>
          </div>
        </div>

      )}
     </>
  )
}


export default Settings