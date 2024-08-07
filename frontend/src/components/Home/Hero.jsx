import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh] flex mt-8 lg:mt-5'>
        <div className='w-full lg:w-3/6 flex flex-col items:center lg:items-start justify-center'>
            <div className='mb-5'>
                <h1 className=' text-5xl lg:text-6xl font-semibold text-orange-700 text-center lg:text-left'>
                    Discover Your Next Great Read
                </h1>
                <p className='mt-4 text-2xl text-black text-center lg:text-left'>Uncover captivating stories, enriching knowledge, and 
                    endless inspiration in our curated collection of books.
                </p>
            </div>
            <button className='text-black border-2 border-blue-500 rounded px-5 py-3 
            text-2xl hover:bg-blue-500'>Discover Books</button>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
            <img src='/hero.png' alt='hero' />
        </div>
    </div>
  )
}

export default Hero