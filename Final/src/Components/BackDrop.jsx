import React from "react";

function BackDrop({ isOpen }) {
  return (
    <div
      className={`w-full h-full bg-black opacity-35 ${
        isOpen ? "translate-x-0" : "translate-x-[110%]"
      }  absolute top-0 left-0 transition-all duration-500`}
     
    ></div>
  );
}

export default BackDrop;
