import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Terms from "./Term/Terms"
import Students from "./Student/Students"

class DashboardContent extends Component {
  render() {
    return (
      <Router>
        <section id="container-dashboard">
          <section id="dashboard-menu">

          </section>
          <Route path="/dashboard/terms" component={Terms}/>
          <Route path="/dashboard/term/:termId/students" component={Students}/>
        </section>
      </Router>
    )
  }
}

export default DashboardContent