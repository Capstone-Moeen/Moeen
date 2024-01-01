import React from "react";
import { Button } from "@nextui-org/react";
import { ShoppingIcon } from "../Assets/Icons/ShoppingIcon";
import { CoffeIcon } from "../Assets/Icons/CoffeIcon";
import { ParkIcon } from "../Assets/Icons/ParkIcon";
import { HotelIcon } from "../Assets/Icons/HotelIcon";
function FilterBtns() {
  return (
    <div className="flex justify-center py-5 gap-3 w-full flex-row-reverse  overflow-x-clip flex-wrap">
      <Button
        className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
        endContent={<ShoppingIcon size={22} />}
      >
        تسوق
      </Button>
      <Button
        className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
        endContent={<CoffeIcon size={22} />}
      >
        المقاهي
      </Button>
      <Button
        className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
        endContent={<ParkIcon size={22} />}
      >
        حدائق
      </Button>
      <Button
        className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
        endContent={<HotelIcon size={22} />}
      >
        فنادق
      </Button>
    </div>
  );
}

export default FilterBtns;
