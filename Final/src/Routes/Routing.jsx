import React from 'react'
import { Routes, Route as R } from 'react-router-dom'
import Home from '../Pages/Home'
import Error from '../Errors/Error'
import NewRequest from '../Pages/NewRequest'
import EasyLayout from '../Components/EasyLayout'
import AdminHome from '../Pages/AdminHome'

function Routing() {
  return (
    <>
        <Routes>
            <R path='/' element={<Home/>}></R>
            <R path='/*' element={<Error/>}></R>
            <R path='/NewRequest' element={<NewRequest/>}></R>
            {/* <R path='/EasyLayout' element={<EasyLayout/>}></R> */}
            <R path='/Dashboard' element={<AdminHome/>}></R>
        </Routes>
    </>
  )
}

export default Routing