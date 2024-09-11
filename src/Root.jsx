import React from 'react'
import { Outlet } from 'react-router-dom'
import  NavBar  from './components/NavBar'
import BackGroundPIc from './components/BackGroundPIc'
import "../src/css/root.css"

const Root = () => {
  return (
    <div>
        <NavBar />
        <BackGroundPIc/>
        <Outlet/>
    </div>
  )
}

export default Root