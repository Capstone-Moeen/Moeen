import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import MapComponent from "../Components/MapComponent";
import EasyLayout from "../Components/EasyLayout";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [easyMode, setEasyMode] = useState(
    JSON.parse(localStorage.getItem("easy"))
  );
  const [search, setSearch] = useState("");

  const searchKeyword =(word) => {
    setSearch(word)
  }

  const handelLayoutChange = () => {
    setEasyMode(!easyMode);
  };

  return (
    <>
      {easyMode ? (
        <>
          <Nav
            handelLayoutChange={handelLayoutChange}
            easyMode={easyMode}
            searchKeyword={searchKeyword}
           
          ></Nav>
          <EasyLayout search={search} />
        </>
      ) : (
        <div className="h-screen overflow-hidden">
          <Nav
            handelLayoutChange={handelLayoutChange}
            easyMode={easyMode}
            searchKeyword={searchKeyword}

          ></Nav>
          <ToastContainer
            toastStyle={{ backgroundColor: "#FAFAFB" }}
          ></ToastContainer>

          <MapComponent search={search}></MapComponent>
        </div>
      )}
    </>
  );
}

export default Home;
