import { Avatar, Divider } from "@nextui-org/react";
import React from "react";
import Rating from "@mui/material/Rating";
function RatingRow({name, body}) {
  const [value, setValue] = React.useState(2);
  return (
    <>
      <div className="flex flex-col w-full mt-4">
        <div className="flex gap-4">
          <Avatar
            size="lg"
            src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
          ></Avatar>
          <div className="flex flex-col items-start">
            <h1 className="text-xl">{name}</h1>
            <Rating value={value} readOnly></Rating>
          </div>
        </div>
        <p className="text-right font-normal mt-2 mr-2">
          {body}
        </p>
      </div>
      <Divider className="mt-2"></Divider>
    </>
  );
}

export default RatingRow;
