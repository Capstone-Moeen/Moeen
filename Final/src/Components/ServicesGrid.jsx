import React from "react";
import AutomaticDoorsActive from "../Assets/ServicesIcons/AutomaticDoorsActive.svg";
import ElevatorActive from "../Assets/ServicesIcons/ElevatorActive.svg";
import ParkingActive from "../Assets/ServicesIcons/ParkingActive.svg";
import RampsActive from "../Assets/ServicesIcons/RampsActive.svg";
import ResturansActive from "../Assets/ServicesIcons/ResturantActive.svg";
import WCActive from "../Assets/ServicesIcons/WCActive.svg";
import RampsDisabled from "../Assets/ServicesIcons/RampDisabled.svg";
import ResturantDisabled from "../Assets/ServicesIcons/ResturantDisabled.svg";
import WCDisabled from "../Assets/ServicesIcons/WCDisabled.svg";
import { Tooltip } from "@nextui-org/react";
function ServicesGrid() {
  return (
    <>
      <div className="w-full flex justify-center items-center mt-5">
        <div className="grid grid-cols-3 justify-items-center grid-rows-2 gap-y-2 gap-x-9">
          <Tooltip
            placement="top"
            color="success"
            content="أبواب اوتوماتيكية"
            size="lg"
            className="text-2xl"
            showArrow={true}
          >
            <img src={AutomaticDoorsActive} alt="AutomaticDoorsIcons"></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="المصاعد"
            size="lg"
            className="text-2xl"
            showArrow={true}
          >
            <img src={ElevatorActive} alt="ElevatorActive"></img>
          </Tooltip>

          <Tooltip
            placement="top"
            color="success"
            content="مواقف السيارات"
            size="lg"
            className="text-2xl"
            showArrow={true}
          >
            <img src={ParkingActive} alt="ParkingActive"></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="المنحدرات"
            size="lg"
            className="text-2xl"
            showArrow={true}
          >
            <img src={RampsDisabled} alt="RampsActive"></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="طاولات طعام مخصصة"
            size="lg"
            className="text-2xl"
            showArrow={true}
          >
            <img src={ResturantDisabled} alt="ResturantDisabled"></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="دورات مياه مخصصة"
            size="lg"
            className="text-2xl"
            showArrow={true}
          >
            <img src={WCDisabled} alt="WCDisabled"></img>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default ServicesGrid;
