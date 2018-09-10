import {apiURL} from '../data'
import axios from 'axios'

class TeacherAPI {

  //register new teacher & login teacher
  registerTeacher(registerUser, loginUser, cb) {
    axios(`${apiURL}/teacher/register`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: JSON.stringify(registerUser)
    })
      .then(() => {
        cb(loginUser)
      })
      .catch(err => {
        console.log(err);
      })
  }

  //login & set jwt to sessionStorage, then call setTeacherId()
  loginTeacher(loginUser, cb) {
    axios(`${apiURL}/teacher/login`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: JSON.stringify(loginUser)
    })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        cb(res.data.token)
      })
      .catch(err => {
        console.log(err);
      })
  }

  //gets teacher ObjectID
  getTeacherId(token, cb) {
    axios({
      url: `${apiURL}/teacher/me`,
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        localStorage.setItem('teacherId', res.data.id)
        cb(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getTeacherFullInfo(cb) {
    axios({
      url: `${apiURL}/teacher/${localStorage.getItem('teacherId')}`,
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => {
        cb(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default TeacherAPI