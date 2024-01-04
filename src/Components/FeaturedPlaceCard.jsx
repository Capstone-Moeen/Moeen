import React from "react";
import { Card, CardHeader, Image, CardFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { Rating } from "@mui/material";
function FeaturedPlaceCard({ placeImage, placeName, rating }) {
  const [footerView, setFooterView] = useState(false);

  return (
    <>
      <Card
        onMouseEnter={() => setFooterView(true)}
        onMouseLeave={() => setFooterView(false)}
        isFooterBlurred
        className="w-full h-[150px] col-span-12 sm:col-span-7 FeaturedPlaceCard"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white/95 font-bold text-md p-1 rounded bg-[rgba(0,0,0,0.5)] ">{placeName}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={placeImage}
        />
        <CardFooter
          className={`absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 translate-y-[110%] transition-all duration-500  ${
            footerView ? "translate-y-0" : ""
          }`}
        >
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col items-start">
            <p className="text-white font-bold text-xl max-sm:text-lg">
                {rating.toFixed(2)}
              </p>
              <Rating value={rating.toFixed(2)} readOnly size="small"></Rating>
            </div>
          </div>
          <Button color="primary" size="sm" >
            عرض
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default FeaturedPlaceCard;
