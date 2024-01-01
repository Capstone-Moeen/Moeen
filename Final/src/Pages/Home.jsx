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

  // const [easyMode, setEasyMode] = React.useState(localStorage.getItem('easy'));

  // React.useEffect(() => {
  //   setEasyMode(localStorage.getItem('easy'));
  // }, [localStorage.getItem('easy')]);

  // const [easyMode, setEasyMode] = React.useState(() => localStorage.getItem('easy'));

  // const [easyMode, setEasyMode] = React.useState(localStorage.getItem('easy') === 'true');

  // React.useEffect(() => {
  //   const handleStorageChange = () => {
  //     // Update the state when storage changes
  //     setEasyMode(localStorage.getItem('easy') === 'true');
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);

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
