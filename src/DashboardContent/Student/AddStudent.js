import React, { Component } from 'react'
import { connect } from "react-redux"
import '../DashboardContent.css'
import Modal from 'react-modal'

class AddStudent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.addStudent = this.addStudent.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      value: ''
    })
  }

  handleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  addStudent(){

  }


  render(){
    return(
      <React.Fragment>

        <i className="far fa-plus-square menu-icon"
           onClick={this.handleModal}
           title="Add New Term" />

        <Modal isOpen={this.state.isModalOpen}
               onRequestClose={this.closeModal}
               ariaHideApp={false}
               contentLabel="Sign In Modal"
               style={this.props.styles.modal}>
          <div className="container-modal center-all-flex">
            <div className="modal-header">
              <h2 className="modal-title">Add Student</h2>
              <img src={require("../../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                   alt="homeschool hub logo"
                   className="modal-logo"/>
            </div>
            <form  className="center-all-flex"
                   onSubmit={this.handleSubmit}>
              <input type="text"
                     placeholder="First Name"
                     name="firstName"
                     onChange={this.handleChange}/>
              <input type="text"
                     placeholder="Last Name"
                     name="lastName"
                     onChange={this.handleChange}/>
              <div id="grade-select">
                <label htmlFor="gradeLevel"
                       id="grade-label">Grade: </label>
                <select name="gradeLevel"
                        defaultValue="Choose"
                        onChange={this.handleChange}>
                  <option disabled >Choose</option>
                  <option value="0" >K</option>
                  <option value="1" >1</option>
                  <option value="2" >2</option>
                  <option value="3" >3</option>
                  <option value="4" >4</option>
                  <option value="5" >5</option>
                  <option value="6" >6</option>
                  <option value="7" >7</option>
                  <option value="8" >8</option>
                  <option value="9" >9</option>
                  <option value="10" >10</option>
                  <option value="11" >11</option>
                  <option value="12" >12</option>
                </select>
              </div>

              <div className="button-row">
                <button type="submit"
                        className="green-button"
                        style={{marginLeft: '0'}}
                >Add
                </button>
                <button type="button"
                        onClick={this.handleModal}
                        className="green-button"
                >Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    styles: state.styleReducer,
    teacher: state.teacherReducer.currentTeacher
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setStudents: (students) => {
      const action = {type: 'SET_STUDENTS', students}
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)