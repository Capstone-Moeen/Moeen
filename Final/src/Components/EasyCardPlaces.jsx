import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  CardFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Rating } from "@mui/material";
import EasyLayoutModal from "./EasyLayoutModal";
import calculateDistance from "../utils/CalculateDistance";
function EasyCardPlaces({ placeData, userLocation }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card className="hover:bg-gray-100 cursor-pointer w-full ">
        <CardHeader className=" flex-col items-start p-0 w-full">
          <img
            alt="Card background"
            className="rounded-none object-cover object-center min-h-44 w-full max-h-44"
            src={placeData.Images[0]}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div className="flex justify-between items-center">
            <h1 className="text-right font-bold text-xl">
              {placeData.placeName}
            </h1>
            <span className="text-[#70757a]">
              {calculateDistance(
                userLocation.lat,
                userLocation.lng,
                placeData.placeLocation.lat,
                placeData.placeLocation.lng
              )}
              <span className="mr-1">كم</span>
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className=" text-[#70757a]">{placeData.avgRating ? placeData.avgRating?.toFixed(2) : 0}</span>
            <Rating size="small" readOnly value={placeData.avgRating?.toFixed(2)}></Rating>
          </div>
          <p className="text-right font-light">
            {placeData.placeType === "cafe"
              ? "مقهى"
              : placeData.placeType === "hotel"
              ? "فندق"
              : placeData.placeType === "park"
              ? "منتزه"
              : placeData.placeType === "shopping"
              ? "تسوق"
              : placeData.placeType === "other"
              ? "اخرى"
              : "مطعم"}
          </p>
        </CardBody>
        <CardFooter>
          <Button onPress={onOpen} color="primary">
            عرض
          </Button>
        </CardFooter>
      </Card>

      <EasyLayoutModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placeData={placeData}
        userLocation={userLocation}
      ></EasyLayoutModal>
    </>
  );
}

export default EasyCardPlaces;
