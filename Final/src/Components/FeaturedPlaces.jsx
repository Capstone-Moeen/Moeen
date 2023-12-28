import React, { useState } from "react";
import {  Card, CardBody, CardHeader } from "@nextui-org/react";
import  FeaturedPlaceCard from "./FeaturedPlaceCard";
function FeaturedPlaces() {
const  [cardView, setCardView] = useState(false)

  return (
    <>
     
      <Card onMouseEnter={()=>setCardView(true)} onMouseLeave={()=>setCardView(false)} className={`py-4 absolute left-2 bg-[#FAFAFB] shadow-2xl w-[32rem] flex-col transition-all duration-500 translate-x-[-90%] ${cardView ? "translate-x-0" : ""}`}>
       
        <CardHeader className="flex justify-center">
          <h1 className="text-3xl font-bold text-center ">الاعلى تقييما</h1>
        </CardHeader>
        <CardBody className="overflow-visible py-2 gap-5">
          <FeaturedPlaceCard
            placeImage={
              "https://lh3.googleusercontent.com/p/AF1QipN-mBb87BJTqnySmMSQ2D8Qf-f0c7p1KoA6lssN=s0"
            }
            placeName={"بوليفارد وورلد"}
          ></ FeaturedPlaceCard>
          < FeaturedPlaceCard
            placeImage={
              "https://lh3.googleusercontent.com/p/AF1QipM0MyykTZIerh4-ONkywBkGc7tPKTMf9Me6xEA=s0"
            }
            placeName={"واجهة الرياض"}
          ></ FeaturedPlaceCard>
        </CardBody>
      </Card>
    </>
  );
}

export default FeaturedPlaces;
