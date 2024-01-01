import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import { Rating } from '@mui/material';
function FeaturedPlaceCardEasyLayout({placename, placeImage}) {

  return (
   <>
    <Card isFooterBlurred className="w-[35rem] h-[300px] col-span-12 sm:col-span-7">
    
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <h4 className="text-white/90 font-bold text-2xl">{placename}</h4>
      </CardHeader>

     <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src= {placeImage}
    
      />

      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
          <p className='text-white font-bold text-2xl'>4.3</p>
            <Rating value={4} readOnly></Rating>
          </div>
        </div>
        <Button radius="full" color='primary' >عرض</Button>
      </CardFooter>
    </Card>
   </>
  )
}

export default FeaturedPlaceCardEasyLayout