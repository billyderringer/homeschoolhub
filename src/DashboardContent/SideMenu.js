import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DashboardContent.css'
import sideBg from '../Assets/sidenav-bg.jpg'
import AddTerm from '../DashboardContent/Term/AddTerm'
import AddStudent from '../DashboardContent/Student/AddStudent'

class SideMenu extends Component{
  render(){
    const {teacher} = this.props
    //conditionally render profile image
    const profile = teacher.avatar !== undefined ?
      teacher.avatar : "default-profile.png"
    return(
      <section id="side-menu"
               style={{
                 backgroundImage: 'url("'+ sideBg + '")',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'
               }}>
        <section id="profile-header" className="center-all-flex">
          <img src={require('../Assets/' + profile)} alt="profile"/>
          <div id="teacher-profile"
               className="flex">
            <h2>{teacher.firstName} {teacher.lastName}</h2>
            <h3>{teacher.homeroomName}</h3>
          </div>
        </section>
        <hr className="hr-side-menu" />

        <section id="quick-links"
                 className="container-menu">
          <h2 id="links-title">Quick Links</h2>
          <div className="quick-link flex flex-row">
            <div className="center-all-flex">
              <i className="fab fa-buromobelexperte" />
              <h4 className="menu-title">Terms</h4>
            </div>
            <AddTerm />
          </div>
          <div className="quick-link flex flex-row">
            <div className="center-all-flex">
              <i className="fas fa-user-graduate" />
              <h4 className="menu-title">Students</h4>
            </div>

            <AddStudent />
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    style: state.styleReducer,
    teacher: state.teacherReducer.currentTeacher
  }
}

export default connect(mapStateToProps) (SideMenu)