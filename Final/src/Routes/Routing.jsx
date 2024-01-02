
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

  const [isAdmin, setIsAdmin] = React.useState(false);
  const admins = ["RdDQQRbPBIWUcmD10UICl6S7TTb2"];
  const { currentUser } = React.useContext(AuthContext);
  
  
  return (
    <>
    
    <Routes>
        <R path="/Dashboard" element={currentUser!== null && admins.includes(currentUser.uid) ? <AdminHome /> : <Home />} />
        <R path="/PlaceDetails/:id" element={currentUser!== null && admins.includes(currentUser.uid) ? <PlaceDetails /> : <Home />} />
        <R path="/Dashboard/Update/:id" element={currentUser!== null && admins.includes(currentUser.uid) ? <UpdatePlace /> : <Home />} />
        <R path="/" element={<Home />} />
        <R path="/*" element={<Error />} />
        <R path="/NewRequest" element={<NewRequest />} />
      
    </Routes>
    </>
  );
}


export default Routing

