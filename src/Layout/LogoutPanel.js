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
      <React.Fragment>
        <section className="notification-bar center-all-flex flex-row">

          {/*notification container*/}
          <div className="notification-top flex flex-row">

            {/*relative container*/}
            <div className="badge-icon">
              <i className="far fa-clock" />

              {/*absolute container*/}
              <div className="badge-count">
                <h3>1</h3>
              </div>
            </div>

            <h4>Due<br/>Soon</h4>
          </div>

          {/*notification container*/}
          <div className="notification-top flex flex-row">

            {/*relative container*/}
            <div className="badge-icon">
              <i className="fas fa-bell" />

              {/*absolute container*/}
              <div className="badge-count">
                <h3>0</h3>
              </div>
            </div>

            <h4>Past<br/>Due</h4>
          </div>

          {/*notification container*/}
          <div className="notification-top flex flex-row">

            {/*relative container*/}
            <div className="badge-icon">
              <i className="fas fa-calculator" />

              {/*absolute container*/}
              <div className="badge-count">
                <h3>3</h3>
              </div>
            </div>

            <h4>Needs<br/>Grading</h4>
          </div>
        </section>
        <section id="logout-panel"
                 className="center-all-flex">
          <Link to="/"
                onClick={this.logout}
                title="Logout">
            <i className="fas fa-sign-out-alt"/>
          </Link>
        </section>
      </React.Fragment>

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