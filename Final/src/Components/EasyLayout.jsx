import React from 'react'
import FilterBtns from "./FilterBtns";
import Nav from './Nav';
import EasyPlaceInfoSideCard from './EasyPlaceInfoSideCard';
import EasyCardPlaces from './EasyCardPlaces';

export default function EasyLayout() {

  return (
    <>
    <Nav/>
    <div className=' grid grid-cols-2 gap-14 justify-center items-start w-full h-full px-10  bg-[#FAFAFB] '>
        <div className='flex flex-col gap-3 py-11'>

         <FilterBtns/>

         <h1 className='text-black font-extrabold text-[2rem] mb-3'>الاعلى تقيمًا </h1>

         <EasyCardPlaces/>

        <h1 className='text-black font-extrabold text-[2rem] mb-3 mt-5'>قائمة الاماكن </h1>

        <EasyCardPlaces/>

        </div>

        <div className=' '>

         <EasyPlaceInfoSideCard/>
        </div>
           

    </div>
    </>

  )
}
