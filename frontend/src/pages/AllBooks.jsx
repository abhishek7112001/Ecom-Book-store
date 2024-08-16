import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';
import Loader from '../components/Loader/Loader';

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:1000/allbooks");
        console.log("API Response:", res.data); // Log API response
        setData(res.data); // Set data
        setLoading(false); // Stop loading
      } catch (err) {
        console.error("Fetch Error:", err); // Log error
        setError(err.response ? err.response.data.message : err.message); // Set error
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='px-4 mb-8'>
      <h4 className='text-2xl font-semibold mt-4 mb-4'>All Books</h4>
      <ul>
        {data.length > 0 ? (

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {data.map((book, i) => (
        <BookCard key={i} data={book} />
      ))}
    </div>
        ) : (
          <div className='flex w-full items-center justify-center h-screen'> <Loader /></div>
        )}
      </ul>
    </div>
  );
};

export default AllBooks;
