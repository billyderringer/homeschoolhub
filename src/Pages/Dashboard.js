import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Pages.css'
import SideMenu from '../DashboardContent/SideMenu'
import DashboardContent from '../DashboardContent/DashboardContent'

class Dashboard extends Component{
  render(){
    const {teacher} = this.props
    return(
      <React.Fragment>
        {teacher !== {} ?
          <div className="container-dashboard center-all-flex">
            <SideMenu />
            <DashboardContent />
          </div> :
          <div className="center-all-flex">
            Loading...
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    modal: state.styleReducer.modal,
    teacher: state.teacherReducer.currentTeacher
  }
}

export default connect(mapStateToProps) (Dashboard)