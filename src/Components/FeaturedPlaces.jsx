import React, { useState } from "react";
import {  Card, CardBody, CardHeader } from "@nextui-org/react";
import  FeaturedPlaceCard from "./FeaturedPlaceCard";
function FeaturedPlaces({isOpen, featured}) {
const  [cardView, setCardView] = useState(false)

  return (
    <>
     
      <Card   onMouseEnter={()=>setCardView(true)} onMouseLeave={()=>setCardView(false)} className={`py-4 absolute left-2 top-5 bg-[#FAFAFB] shadow-2xl w-[22rem] flex-col transition-all duration-500 translate-x-[-90%] max-lg:hidden ${isOpen ? "hidden" : ""} ${cardView ? "translate-x-0" : ""}`}>
       
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold text-center ">الاعلى تقييما</h1>
        </CardHeader>
        <CardBody  className="overflow-visible py-2 gap-3">
         {
          featured.map((place,index)=>(
            < FeaturedPlaceCard
            key={index}
            placeImage={
              place.Images[0]
            }
            placeName={place.placeName}
            rating={place.avgRating}
          ></ FeaturedPlaceCard>
          ))
         }
       
        </CardBody>
      </Card>
    </>
  );
}

export default FeaturedPlaces;
