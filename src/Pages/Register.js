import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import './Pages.css'
import TeacherAPI from '../Data/API/teacher'

const teacherApi = new TeacherAPI()

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.registerTeacher = this.registerTeacher.bind(this)
    this.registeredLogin = this.registeredLogin.bind(this)
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
    this.registerTeacher()
    this.setState({
      value: ''
    })
  }

  //api stuff
  registerTeacher() {
    //ensure no localStorage interferes with Register
    localStorage.removeItem('token')
    localStorage.removeItem('teacherId')

    const {
      firstName,
      lastName,
      email,
      password
    } = this.state

    const registerUser = {
      firstName,
      lastName,
      email,
      password
    }

    const loginUser = {
      email,
      password
    }

    teacherApi.registerTeacher(registerUser, loginUser, this.registeredLogin)

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  registeredLogin(loginUser) {
    teacherApi.loginTeacher(loginUser, this.setTeacherId)
  }

  setTeacherId(token) {
    teacherApi.getTeacherId(token, this.setTeacherData)
  }

  setTeacherData() {
    teacherApi.getTeacherFullInfo(this.setTeacherFullData)
  }

  setTeacherFullData(teacher) {
    this.props.setTeacherFullData(teacher)
  }

  render() {
    return (this.props.teacher.isLoggedIn ?
        <Redirect to="/dashboard/terms"/> :
        <section className="container-modal container-90 center-all-flex flex-column">
          <div className="modal-header flex flex-column">
            <h2 className="modal-title-page">REGISTER</h2>
            <img className="modal-logo-page"
                 src={require("../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                 alt="homeschool hub"/>
            <p>Welcome to Homeschool Hub!</p>
          </div>

          <form className="flex-form"
                id="login-form"
                onSubmit={this.handleSubmit}>
            <input id="first-name-register"
                   name="firstName"
                   onChange={this.handleChange}
                   type="text"
                   placeholder="First Name"
                   autoFocus
                   required/>
            <input id="last-name-register"
                   name="lastName"
                   onChange={this.handleChange}
                   type="text"
                   placeholder="Last Name"
                   required/>
            <input id="username-register"
                   name="email"
                   onChange={this.handleChange}
                   type="email"
                   placeholder="Email"
                   required/>
            <input id="password"
                   name="password"
                   onChange={this.handleChange}
                   type="password"
                   placeholder="Password"
                   required/>
            <div>
              <button type="submit"
                      onClick={this.registerTeacher}
                      className="link green-button">
                Register
              </button>
              <Link to="/"
                    type="button"
                    className="link green-button">
                Cancel
              </Link>
            </div>
          </form>
          <div className="modal-switch flex flex-row">
            <p>Already have an account?</p>
            <Link to="/login"
                  className="green-link">
              Login
            </Link>
          </div>
        </section>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.styleReducer.modal,
  teacher: state.teacherReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    registerTeacher: (teacher) => {
      const action = {type: 'REGISTER_TEACHER', teacher}
      dispatch(action)
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)