import React from 'react'
import Nav from '../Components/Nav'
import MapComponent from '../Components/MapComponent'
function Home() {
  return (
    <>
    <div className='h-screen overflow-hidden'>
    <Nav></Nav>
    <MapComponent></MapComponent>
    </div>
    </>
  )
}

export default Home