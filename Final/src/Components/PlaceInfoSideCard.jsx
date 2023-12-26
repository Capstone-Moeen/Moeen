import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { DirectionsIcon } from "../Assets/Icons/DirectionsIcon";
function PlaceInfoSideCard({ isOpen }) {
  return (
    <Card
      className={`${
        isOpen ? "translate-x-0" : "translate-x-[110%]"
      }    py-2 bg-[#FAFAFB] shadow-2xl absolute right-5 w-[32rem] flex flex-col justify-center items-center h-[83%] top-5 max-sm:right-2 `}
    >
      <CardHeader className="pb-0 pt-1 px-2 flex-col ">
        <Image
          width="100%"
          alt="NextUI hero Image with delay"
          className="object-fit"
          src="https://lh3.googleusercontent.com/p/AF1QipMYTWtnsrHICvloeWZUvdGLXVKQ5KUQMvpy7CL6=s0"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col items-center ">
        <div className="w-full flex flex-col mt-5">
          <h1 className="text-3xl font-bold text-right">أسم المكان</h1>
          <h1 className="text-2xl  text-right text-gray-400 mt-2 ">4.5 Km</h1>
        </div>
        <Button
          className="bg-[#005B41] text-white text-xl font-bold"
          endContent={<DirectionsIcon size={22} />}
        >
          توجيهات الوصل
        </Button>
      </CardBody>
    </Card>
  );
}

export default PlaceInfoSideCard;
