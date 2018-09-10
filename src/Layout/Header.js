import React, { Component } from 'react'
import {connect} from "react-redux"
import { Link } from 'react-router-dom'
import './Layout.css'
import LoginPanel from "./LoginPanel"
import LogoutPanel from "./LogoutPanel"

class Header extends Component{
  render(){
    const loggedIn = this.props.teacher.isLoggedIn
    return(
      <nav id="container-header"
           className={loggedIn ?
             "logout" : "login"}>
        <Link to={loggedIn ? "/dashboard/terms" : "/homeschoolhub"}
              id="header-brand"
              className="center-all-flex">
          {loggedIn ?
            <img src={require("../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                 alt="homeschool hub logo"
            /> :
            <img src={require("../Assets/hsh-logo/hsh-logo-wht-60x60.png")}
                 alt="homeschool hub logo"
            />
          }
          <h2>Homeschool Hub</h2>
        </Link>
        {loggedIn ?
          <LogoutPanel /> : <LoginPanel />}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  teacher: state.teacherReducer
})

export default connect(mapStateToProps)(Header)