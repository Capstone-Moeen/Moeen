import React from 'react'
import { Routes, Route as R } from 'react-router-dom'
import Home from '../Pages/Home'
import Error from '../Errors/Error'

function Route() {
  return (
    <>
        <Routes>
            <R path='/' element={<Home/>}></R>
            <R path='/*' element={<Error/>}></R>
        </Routes>
    </>
  )
}

export default Route