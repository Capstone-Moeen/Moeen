import React from "react";
import AutomaticDoorsActive from "../Assets/ServicesIcons/AutomaticDoorsActive.svg";
import AutomaticDoorsDisabled from "../Assets/ServicesIcons/AutomaticDoorsDisabled.svg";
import ElevatorActive from "../Assets/ServicesIcons/ElevatorActive.svg";
import ElevatorDisabled from "../Assets/ServicesIcons/ElevatorDisabled.svg";
import ParkingActive from "../Assets/ServicesIcons/ParkingActive.svg";
import ParkingDisabled from "../Assets/ServicesIcons/ParkingDisabled.svg";
import RampsActive from "../Assets/ServicesIcons/RampsActive.svg";
import RampsDisabled from "../Assets/ServicesIcons/RampDisabled.svg";
import ResturantActive from "../Assets/ServicesIcons/ResturantActive.svg";
import ResturantDisabled from "../Assets/ServicesIcons/ResturantDisabled.svg";
import WCActive from "../Assets/ServicesIcons/WCActive.svg";
import WCDisabled from "../Assets/ServicesIcons/WCDisabled.svg";
import { Tooltip } from "@nextui-org/react";
function ServicesGrid({ services }) {
  const [servicesObj, setServicesObj] = React.useState(JSON.parse(JSON.stringify(services)));
  return (
    <>
  
      <div className="w-full flex justify-center items-center mt-5">
        <div className="grid grid-cols-3 justify-items-center grid-rows-2 gap-y-2 gap-x-9">
          <Tooltip
            placement="top"
            color="success"
            content="أبواب اوتوماتيكية"
            size="sm"
            className="text-lg"
            showArrow={true}
          >
            <img
              src={
                services.automaticGates
                  ? AutomaticDoorsActive
                  : AutomaticDoorsDisabled
              }
              alt="AutomaticDoorsIcons"
            ></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="المصاعد"
            size="sm"
            className="text-lg"
            showArrow={true}
          >
            <img
              src={services.elevators ? ElevatorActive : ElevatorDisabled}
              alt="ElevatorActive"
            ></img>
          </Tooltip>

          <Tooltip
            placement="top"
            color="success"
            content="مواقف السيارات"
            size="sm"
            className="text-lg"
            showArrow={true}
          >
            <img
              src={services.parking ? ParkingActive : ParkingDisabled}
              alt="ParkingActive"
            ></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="المنحدرات"
            size="sm"
            className="text-lg"
            showArrow={true}
          >
            <img
              src={services.ramps ? RampsActive : RampsDisabled}
              alt="RampsActive"
            ></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="طاولات طعام مخصصة"
            size="sm"
            className="text-lg"
            showArrow={true}
          >
            <img
              src={services.tables ? ResturantActive : ResturantDisabled}
            ></img>
          </Tooltip>
          <Tooltip
            placement="top"
            color="success"
            content="دورات مياه مخصصة"
            size="sm"
            className="text-lg"
            showArrow={true}
          >
            <img src={services.toilets ? WCActive : WCDisabled}></img>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default ServicesGrid;
