import React from 'react'
import Header from '../header/Header'
import "./layout.css"

const Layout = ({children}) => {
  return (
    <>
      <Header/>
      <div className='layout-item' style={{minHeight: "80vh"}}>
        {children}
      </div>
    </>
  )
}

export default Layout
