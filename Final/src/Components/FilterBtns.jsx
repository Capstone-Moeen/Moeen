import React from "react";
import { Button, CircularProgress } from "@nextui-org/react";
import {ShoppingIcon} from "../Assets/Icons/ShoppingIcon";
import {CoffeIcon} from '../Assets/Icons/CoffeIcon'
import { ParkIcon } from "../Assets/Icons/ParkIcon";
import {HotelIcon} from '../Assets/Icons/HotelIcon'
function FilterBtns() {
  return (
    <div className="flex justify-center py-5 gap-5 w-full flex-row-reverse">
      <Button
        className="shadow-lg font-bold text-[#005B41] bg-[#FAFAFB] text-xl"
        size="lg"
        endContent={<ShoppingIcon size={22} />}
      >
        تسوق
      </Button>
      <Button
        className="shadow-lg font-bold text-[#005B41] bg-[#FAFAFB] text-xl"
        size="lg"
        endContent={<CoffeIcon size={22} />}
      >
        المقاهي
      </Button>
      <Button
        className="shadow-lg font-bold text-[#005B41] bg-[#FAFAFB] text-xl"
        size="lg"
        endContent={<ParkIcon size={22} />}
      >
        حدائق
      </Button>
      <Button
        className="shadow-lg font-bold text-[#005B41] bg-[#FAFAFB] text-xl"
        size="lg"
        endContent={<HotelIcon size={22} />}
      >
        فنادق
      </Button>
    </div>
  );
}

export default FilterBtns;
