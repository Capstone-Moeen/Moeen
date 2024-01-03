
import React from 'react'
import { Routes, Route as R } from 'react-router-dom'
import Home from '../Pages/Home'
import Error from '../Errors/Error'
import NewRequest from '../Pages/NewRequest'
import AdminHome from '../Pages/AdminHome'
import PlaceDetails from '../Pages/PlaceDetails'
import UpdatePlace from '../Pages/UpdatePlace'
import { AuthContext } from "../Context/AuthContext";

function Routing() {
  
  return (
    <>
    
    <Routes>
        <R path="/Dashboard" element={<AdminHome />} />
        <R path="/PlaceDetails/:id" element={<PlaceDetails />} />
        <R path="/Dashboard/Update/:id" element={<UpdatePlace />} />
        <R path="/" element={<Home />} />
        <R path="/*" element={<Error />} />
        <R path="/NewRequest" element={<NewRequest />} />
    </Routes>
    </>
  );
}


export default Routing

