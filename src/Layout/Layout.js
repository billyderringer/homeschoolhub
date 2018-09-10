import React, { Component } from 'react'
import './Layout.css'
import Header from "./Header"
import Footer from "./Footer"

class Layout extends Component{
  render(){
    return (
      <div id="container-layout">
        <Header />
        <Footer />
      </div>
    )
  }
}

export default Layout