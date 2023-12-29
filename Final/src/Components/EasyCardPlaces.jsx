import React from 'react'
import { Rating } from '@mui/material'


function EasyCardPlaces() {
  return (

   <div className="card card-side bg-white text-black w-full shadow-xl flex justify-center items-center ">
      <figure className='w-[50%] '> 
         <img className='rounded-r-md w-full h-[14rem]' src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0" alt="image"/>
      </figure>
     <div className="card-body">
          <h2 className="card-title text-2xl">اسم المكان</h2>
          <h2 className="text-xl text-black">4.5</h2>
          <Rating value={4} precision={0.5} readOnly></Rating>            
     </div>
   </div>
  )
}

export default EasyCardPlaces;