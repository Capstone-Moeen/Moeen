import React from "react";
import { Card, CardHeader, CardBody, Image, Button, CardFooter,useDisclosure } from "@nextui-org/react";
import { Rating } from "@mui/material";
import EasyLayoutModal from "./EasyLayoutModal";
function EasyCardPlaces() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  
  return (
    <>
    <Card className="hover:bg-gray-100 cursor-pointer ">
      <CardHeader className=" flex-col items-start p-0 w-full">
        <Image
          alt="Card background"
          className="object-cover w-full rounded-none"
          src="https://lh3.googleusercontent.com/p/AF1QipMcPwzVhV5G5eXkXuAZhXGnGWxAbmBHAqq5cKFU=s0"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex justify-between items-center">
          <h1 className="text-right font-bold text-xl">سنتريا مول</h1>
          <span className="text-[#70757a]">4.5 كم </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className=" text-[#70757a]">4.3</span>
          <Rating size="small" value={4}></Rating>
        </div>
        <p className="text-right font-light">مركز تسوق</p>
      </CardBody>
<CardFooter>
  <Button onPress={onOpen} color="primary">عرض</Button>
</CardFooter>
    </Card>



    <EasyLayoutModal onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} ></EasyLayoutModal>
    </>
  );
}

export default EasyCardPlaces;
