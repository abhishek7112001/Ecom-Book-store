import React , { useState, useEffect } from 'react'
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateBook = () => {

    const [Data, setData] = useState(
        {
            url: "" ,
            title: "" ,
            author: "" ,
            price: "" ,
            desc: "" ,
            language: "" ,
        }
    );

    const {id} = useParams();
    const navigate = useNavigate();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };
    
    const change =(e)=>{
        const {name, value} =e.target;
        setData({...Data, [name]: value});
    };

    

    const submit = async()=>{
        try {
            if(Data.url===""|| Data.title===""|| Data.author===""|| Data.price===""|| Data.desc===""|| Data.language===""){
                alert("Please fill all the fields");
            }
            else{
                const response = await axios.put("http://localhost:1000/api/v1/update-book", Data, {headers});
                setData({
                    url: "" ,
                    title: "" ,
                    author: "" ,
                    price: "" ,
                    desc: "" ,
                    language: "" ,
                })
                alert(response.data.message);
                navigate(`/view-book-details/${id}`);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(()=>{
        const fetch = async() =>{
            const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`)
            console.log(response);
            
            setData(response.data.data);
        };
        fetch();
    }, []);

  return (
    <div className='h-[100%] p-0 md:p-4'>
        <h1 className='text-3xl font-semibold md:text-5xl text-black mb-8'>
            Update Book
        </h1>        
        <div className='p-4 bg-gray-600 '>
            <label htmlFor='' className='text-black'>
                Image
            </label>
            <input type="text" className='w-full mt-2 bg-gray-300 text-black p-2 outline-none'
                placeholder="url of image"
                name="url"
                required
                value={Data.url}
                onChange={change}
            />
        </div>
        <div className='p-4 bg-gray-600 '>
            <label htmlFor='' className='text-black'>
                Title of book
            </label>
            <input type="text" className='w-full mt-2 bg-gray-300 text-black p-2 outline-none'
                placeholder="title of book"
                name="title"
                required
                value={Data.title}
                onChange={change}
            />
        </div>
        <div className='p-4 bg-gray-600 '>
            <label htmlFor='' className='text-black'>
                Author of book
            </label>
            <input type="text" className='w-full mt-2 bg-gray-300 text-black p-2 outline-none'
                placeholder="title of book"
                name="author"
                required
                value={Data.author}
                onChange={change}
            />
        </div>
        <div className='p-4 bg-gray-600 flex gap-4'>
            <div>
                <label htmlFor='' className='text-black w-3/6'>
                    Language
                </label>
                <input type="text" className='w-full mt-2 bg-gray-300 text-black p-2 outline-none'
                    placeholder="title of book"
                    name="language"
                    required
                    value={Data.language}
                    onChange={change}
                />
            </div>
            <div>
                <label htmlFor='' className='text-black w-3/6'>
                    Price
                </label>
                <input type="text" className='w-full mt-2 bg-gray-300 text-black p-2 outline-none'
                    placeholder="title of book"
                    name="price"
                    required
                    value={Data.price}
                    onChange={change}
                />
            </div>
        </div>
        <div className='p-4 bg-gray-600 '>
            <label htmlFor='' className='text-black'>
                Description of book
            </label>
            <textarea type="text" className='w-full mt-2 bg-gray-300 text-black p-2 outline-none'
                rows="5"
                placeholder="title of book"
                name="desc"
                required
                value={Data.desc}
                onChange={change}
            />
        </div>
        
        <button className='bg-blue-600 rounded mt-4 p-3 text-white' onClick={submit}>
            Update Book
        </button>
    </div>
  )
}

export default UpdateBook