import React from 'react'
import Nav from '../Components/Nav'
import MapComponent from '../Components/MapComponent'
import { ToastContainer, toast } from 'react-toastify';

function Home() {
  return (
    <>
    <div className='h-screen overflow-hidden'>
    <Nav></Nav>
    <ToastContainer toastStyle={{ backgroundColor: "#FAFAFB" }}></ToastContainer>

    <MapComponent></MapComponent>
    </div>
    </>
  )
}

export default Home