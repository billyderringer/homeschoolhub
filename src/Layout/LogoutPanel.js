import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import './Layout.css'

class LogoutPanel extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.logoutTeacher()
  }

  render() {
    return (
      <div id="logout-panel"
           className="center-all-flex">
        <Link to="/homeschoolhub/"
              onClick={this.logout}
              title="Logout">
          <i className="fas fa-sign-out-alt"/>
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    logoutTeacher:() => {
      const action = {type: 'LOGOUT_TEACHER'}
      dispatch(action)
    }
  }
}

export default connect (null, mapDispatchToProps) (LogoutPanel)