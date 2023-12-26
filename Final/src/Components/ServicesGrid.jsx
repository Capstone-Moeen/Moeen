import { Image } from "@nextui-org/react";
import React from "react";
import AutomaticDoorsActive from '../Assets/ServicesIcons/AutomaticDoorsActive.svg'
import ElevatorActive from '../Assets/ServicesIcons/ElevatorActive.svg'
import ParkingActive from '../Assets/ServicesIcons/ParkingActive.svg'
import RampsActive from '../Assets/ServicesIcons/RampsActive.svg'
import ResturansActive from '../Assets/ServicesIcons/ResturantActive.svg'
import WCActive from '../Assets/ServicesIcons/WCActive.svg'
import RampsDisabled from '../Assets/ServicesIcons/RampsDisabled.svg'
function ServicesGrid() {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="grid grid-cols-3 justify-items-center grid-rows-2 gap-y-2 gap-x-9">
          <img
            src={AutomaticDoorsActive}
            alt="AutomaticDoorsIcons"
          ></img>
           <img
            src={ElevatorActive}
            alt="ElevatorActive"
          ></img>
          <img src={ParkingActive} alt="ParkingActive"></img>
          <img src={RampsDisabled} alt="RampsActive"></img>
          <img src={ResturansActive} alt="ResturantActive"></img>
          <img src={WCActive} alt="WCActive"></img>
        </div>
      </div>
    </>
  );
}

export default ServicesGrid;
