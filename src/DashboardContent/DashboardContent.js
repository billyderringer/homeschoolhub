import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Terms from "./Term/Terms"
import Students from "./Student/Students"

class DashboardContent extends Component {
  render() {
    return (
      <Router>
        <section id="container-dashboard">
          <Route path="/dashboard/terms" component={Terms}/>
          <Route path="/dashboard/students" component={Students}/>
        </section>
      </Router>
    )
  }
}

export default DashboardContent