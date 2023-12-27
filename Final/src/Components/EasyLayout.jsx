import React from 'react'
import FilterBtns from "./FilterBtns";
import { Link } from 'react-router-dom';

export default function EasyLayout() {
  return (
    <div className=' grid grid-cols-2 justify-center items-center w-full min-h-screen p-10  bg-[#FAFAFB]'>
        <div className='flex flex-col gap-5 '>

         <FilterBtns/>

        
         <Link>
         <div className="card card-side  bg-white text-black shadow-xl mx-10 flex justify-center items-center ">
                <figure className='w-[50%] '> 
                   <img className='rounded-md' src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0" alt="image"/>
              </figure>
              <div className="card-body">
                  <h2 className="card-title">اسم المكان 1</h2>
                  <h2 className="font-medium"> تصنيف المكان </h2>
              </div>
         </div>
         </Link>


         <Link>
         <div className="card card-side  bg-white text-black shadow-xl mx-10 flex justify-center items-center ">
                <figure className='w-[50%] '> 
                   <img className='rounded-md' src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0" alt="image"/>
              </figure>
              <div className="card-body">
                  <h2 className="card-title">اسم المكان 2</h2>
                  <h2 className="font-medium"> تصنيف المكان </h2>
              </div>
         </div>
         </Link>

         <Link>
         <div className="card card-side  bg-white text-black shadow-xl mx-10 flex justify-center items-center ">
                <figure className='w-[50%] '> 
                   <img className='rounded-md' src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0" alt="image"/>
              </figure>
              <div className="card-body">
                  <h2 className="card-title">اسم المكان 3</h2>
                  <h2 className="font-medium"> تصنيف المكان </h2>
              </div>
         </div>
         </Link>

         

        </div>

        <div className=''>
            <h1>Card</h1>
        </div>
           

    </div>
  )
}
