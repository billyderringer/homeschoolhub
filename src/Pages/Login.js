import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from "react-router-dom"
import TeacherAPI from '../Data/API/teacher'

const teacherApi = new TeacherAPI()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginTeacher = this.loginTeacher.bind(this)
    this.setTeacherId = this.setTeacherId.bind(this)
    this.setTeacherData = this.setTeacherData.bind(this)
    this.setTeacherFullData = this.setTeacherFullData.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.loginTeacher()
    this.setState({
      value: ''
    })
  }

  //api stuff
  loginTeacher() {
    //ensure no localStorage interferes with Login
    localStorage.removeItem('token')
    localStorage.removeItem('teacherId')

    const {
      email,
      password
    } = this.state

    const loginUser = {
      email,
      password
    }

    teacherApi.loginTeacher(loginUser, this.setTeacherId)

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  setTeacherId(token) {
    teacherApi.getTeacherId(token, this.setTeacherData)
  }

  setTeacherData() {
    teacherApi.getTeacherFullInfo(this.setTeacherFullData)
  }

  //send teacher data to redux store
  setTeacherFullData(teacher) {
    this.props.setTeacherFullData(teacher)
  }

  render() {
    return (this.props.teacher.isLoggedIn ?
        <Redirect to="/dashboard/terms"/> :
        <div className="container-modal center-all-flex flex-column">
          <div className="modal-header flex flex-column">
            <h2 className="modal-title-page">LOGIN</h2>
            <img className="modal-logo-page"
                 src={require("../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                 alt="homeschool hub logo"/>
            <p>Welcome to Homeschool Hub!</p>
          </div>
          <form className="flex-form"
                id="login-form"
                onSubmit={this.handleSubmit}>
            <input id="username-login"
                   name="email"
                   onChange={this.handleChange}
                   type="email"
                   placeholder="Email"
                   autoFocus
                   required/>
            <input id="password-login"
                   name="password"
                   onChange={this.handleChange}
                   type="password"
                   placeholder="Password"
                   required/>

            <div>
              <Link to="/dashboard"
                    type="button"
                    onClick={this.handleSubmit}
                    className="link green-button">
                Login
              </Link>
              <Link to="/"
                    type="button"
                    onClick={this.props.closeLogin}
                    className="link green-button">
                Cancel
              </Link>
            </div>
          </form>
          <div className="modal-switch flex flex-row">
            <p>New to Homeschool Hub?</p>
            <Link to="/register"
                  onClick={this.switchModal}
                  className="green-link">
              Sign Up
            </Link>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.styleReducer.modal,
  teacher: state.teacherReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    setTeacherId: (teacherId) => {
      const action = {type: 'SET_TEACHER_ID', teacherId}
      dispatch(action)
    },
    setTeacherFullData: (teacher) => {
      const action = {type: 'SET_TEACHER_DATA', teacher}
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)