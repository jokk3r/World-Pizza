import React from 'react'
import { Outlet } from 'react-router-dom'
import {Footer, Header} from '../components/index'


const MainLayout:React.FC = () => {
  
  return (
    <div className="main">
      <div className="wrapper">
          <Header/>
          <div className="content">
             <Outlet/>
          </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MainLayout