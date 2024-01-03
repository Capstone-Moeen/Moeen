import React, { useState } from "react";
import Nav from "../Components/Nav";
import MapComponent from "../Components/MapComponent";
import EasyLayout from "../Components/EasyLayout";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [easyMode, setEasyMode] = useState(false);
  const handelLayoutChange = () => {
    setEasyMode(!easyMode);
  };


  return (
    <>
      {easyMode ? (
        <>
        <Nav handelLayoutChange ={handelLayoutChange} easyMode={easyMode}></Nav>
        <EasyLayout />
        </>
      ) : (
        <div className="h-screen overflow-hidden">
          <Nav handelLayoutChange ={handelLayoutChange} easyMode={easyMode}></Nav>
          <ToastContainer
            toastStyle={{ backgroundColor: "#FAFAFB" }}
          ></ToastContainer>

          <MapComponent></MapComponent>
        </div>
      )}
    </>
  );
}

export default Home;
