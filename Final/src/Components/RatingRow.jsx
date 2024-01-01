import { Avatar, Divider } from "@nextui-org/react";
import React from "react";
import Rating from "@mui/material/Rating";
function RatingRow({name, body}) {
  const [value, setValue] = React.useState(2);
  return (
    <>
      <div className="flex flex-col w-full mt-4">
        <div className="flex gap-4 max-sm:gap-2">
          <Avatar
             className="w-12 h-12 max-sm:w-10 max-sm:h-10"
            src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
          ></Avatar>
          <div className="flex flex-col items-start">
            <h1 className="text-lg max-sm:text-sm">{name}</h1>
            <Rating value={value} readOnly size="small"></Rating>
          </div>
        </div>
        <p className="text-right font-medium  mt-2 mr-2 text-base">
          {body}
        </p>
      </div>
      <Divider className="mt-2"></Divider>
    </>
  );
}

export default RatingRow;
