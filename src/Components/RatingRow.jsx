import { Avatar, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { getDoc,doc } from "firebase/firestore";
import { db } from "../Config/firebase";
function RatingRow({ author, body,rating }) {
  const [value, setValue] = React.useState(Number(rating));
  const [authorData, setAuthorData] = useState({})
  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = async () => {
    const querySnapshot = await getDoc(doc(db, "users", author));
    const data =  querySnapshot.data()
    setAuthorData(data)
  };

  return (
    <>
      <div className="flex flex-col w-full mt-4">
        <div className="flex gap-3 max-sm:gap-2">
          <Avatar
          
            className="w-11 h-11 max-sm:w-10 max-sm:h-10"
            src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"
          ></Avatar>
          <div className="flex flex-col items-start mb-1">
            <h1 className="text-lg max-sm:text-sm">{authorData.name}</h1>
            <Rating value={value} readOnly size="small"></Rating>
          </div>
        </div>
        <p className="text-right font-medium  mt-2 mr-2 text-base">{body}</p>
      </div>
      <Divider className="mt-2"></Divider>
    </>
  );
}

export default RatingRow;
