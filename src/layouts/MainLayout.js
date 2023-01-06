import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

const MainLayout = () => {
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