import React from 'react'
import FilterBtns from "./FilterBtns";
import Nav from './Nav';
import EasyPlaceInfoSideCard from './EasyPlaceInfoSideCard';
import EasyCardPlaces from './EasyCardPlaces';

export default function EasyLayout() {

  return (
    <>
    <Nav/>

    <div className=' grid grid-cols-2 gap-14 justify-center items-start w-full h-full px-10  bg-[#FAFAFB] max-sm:grid-cols-1 max-sm:px-1 '>
        <div className='flex flex-col gap-3 py-11 max-sm:py-5'>

         <FilterBtns/>

         <h1 className='text-black font-extrabold text-[2rem] mb-3'>الاعلى تقيمًا </h1>
         <div>

         <EasyCardPlaces/>

         </div>

        <h1 className='text-black font-extrabold text-[2rem] mb-3 mt-5'>قائمة الاماكن </h1>

        <EasyCardPlaces/>

        </div>

        <div className='max-sm:hidden  ' >

         <EasyPlaceInfoSideCard/>

        </div>

           
    </div>
    </>

  )
}
