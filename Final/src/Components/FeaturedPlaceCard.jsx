import React from "react";
import { Card, CardHeader, Image, CardFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { Rating } from "@mui/material";
function FeaturedPlaceCard({ placeImage, placeName }) {
  const [footerView, setFooterView] = useState(false);

  return (
    <>
      <Card
        onMouseEnter={() => setFooterView(true)}
        onMouseLeave={() => setFooterView(false)}
        isFooterBlurred
        className="w-full h-[250px] col-span-12 sm:col-span-7 FeaturedPlaceCard"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white font-bold text-3xl">{placeName}</h4>
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
              <h1 className="text-2xl font-bold text-white">4.5</h1>
              <Rating value={4} precision={0.5} readOnly></Rating>
            </div>
          </div>
          <Button color="primary" size="lg">
            عرض
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default FeaturedPlaceCard;
