import { Outlet } from 'react-router-dom'
import  NavBar  from './components/NavBar'
import BackGroundPIc from './components/BackGroundPIc'
import ThemeToggle from './components/ThemeToggle'
import "../src/css/root.css"

const Root = () => {
  return (
    <div>
        <NavBar />
        <BackGroundPIc/>
        <ThemeToggle />
        <Outlet/>
    </div>
  )
}

export default Root