import React from 'react'
import FilterBtns from "./FilterBtns";
import Nav from './Nav';
import EasyCardPlaces from './EasyCardPlaces';
import FeaturedPlaceCardEasyLayout from './FeaturedPlaceCardEasyLayout';
import { Divider } from '@nextui-org/react';

export default function EasyLayout() {

  return (
    <>
    <Nav/>
     <div className='w-full flex justify-center'>
     </div>
     <h1 className='text-center font-bold text-3xl px-5 mt-12'>
        الاعلى تقييما
      </h1>
      
      <div className='w-full flex justify-center gap-5 p-10 items-center mt-5 mb-5 flex-wrap max-sm:p-4'>
     <FeaturedPlaceCardEasyLayout placeImage={"https://lh3.googleusercontent.com/p/AF1QipN-mBb87BJTqnySmMSQ2D8Qf-f0c7p1KoA6lssN=s0"} placename={"بوليفارد وورلد"}></FeaturedPlaceCardEasyLayout>
     <FeaturedPlaceCardEasyLayout placeImage={"https://lh3.googleusercontent.com/p/AF1QipM0MyykTZIerh4-ONkywBkGc7tPKTMf9Me6xEA=s0"}
            placename={"واجهة الرياض"}></FeaturedPlaceCardEasyLayout>
      </div>
     
      <FilterBtns></FilterBtns>

    <div className='w-full grid grid-cols-3 justify-items-center items-center flex-wrap gap-5 m p-20 max-sm:grid-cols-1 max-sm:p-6'>
     <EasyCardPlaces></EasyCardPlaces>
     <EasyCardPlaces></EasyCardPlaces>
     <EasyCardPlaces></EasyCardPlaces>
     <EasyCardPlaces></EasyCardPlaces>
     <EasyCardPlaces></EasyCardPlaces>
     <EasyCardPlaces></EasyCardPlaces>
    </div>
    </>

  )
}
