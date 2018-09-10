import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Layout.css'

class LoginPanel extends Component {

  render() {

    return (
      <div id="login-panel"
           className="menu-panel center-all-flex">
        <Link to="/login"
              className="menu-link">
          Login
        </Link>
        <Link to="/register"
              className="menu-link">
          Sign Up
        </Link>
      </div>
    )
  }
}

export default LoginPanel