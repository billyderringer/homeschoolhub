import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../DashboardContent.css'
import moment from 'moment'
import Modal from "react-modal";
import AddStudent from "./AddStudent"
import GenericApi from '../../Data/API/generic'

const genericApi = new GenericApi()

class StudentGrid extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      termTitle: '',
      termStart: '',
      termEnd: '',
      termId: '',
      currentStudent: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleModal = this.handleModal.bind(this)
    this.editStudent = this.editStudent.bind(this)
    this.removeStudent = this.removeStudent.bind(this)
    this.getStudents = this.getStudents.bind(this)
    this.setStudents = this.setStudents.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.editStudent()
    this.setState({
      value: ''
    })
  }

  handleModal(event){
    const currentId = event.target.parentNode.parentElement.parentElement.id
    const term = this.props.teacher.terms.find(term => term._id === currentId)
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      currentTerm: term || ''
    })
  }

  editStudent = () => {
    const currentTerm = this.state.currentTerm
    const body = {
      "termTitle": this.state.termTitle || currentTerm.termTitle,
      "termStart": this.state.termStart || currentTerm.termStart,
      "termEnd": this.state.termEnd || currentTerm.termEnd
    }

    genericApi.updateElement(body, "term", currentTerm._id, this.getTerms)
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      termTitle: '',
      termStart: '',
      termEnd: ''
    })
  }

  removeStudent = (event) => {
    const currentId = event.target.parentNode.parentElement.parentElement.id
    const term = this.props.teacher.terms.find(term => term._id === currentId)
    console.log(term)
    let confirmed = window.confirm("Are you sure you want to delete this term?" +
      "\nAll related data will be lost.")
    if (confirmed) {
      genericApi.deleteElement('term', term._id, this.getTerms)
    }
  }

  getStudents(){
    genericApi.getElements('term', 'teacher', this.setTerms)
  }

  setStudents(terms){
    this.props.setTerms(terms)
  }

  chooseStudent = (event) => {
    const currentId = event.target.parentNode.parentElement.parentElement.parentElement.id
    const term = this.props.teacher.terms.find(term => term._id === currentId)
    this.props.chooseStudent(term)
  }

  render(){
    const {teacher} = this.props
    return(
      <React.Fragment>
        {/*Checks for school terms & renders accordingly*/}
        {teacher.currentTerm.students.length !== 0 ?
          <section id="term-grid-container"
                   className="flex flex-column">
            <h2>Please choose a student or add a new one <AddStudent /></h2>
            <section className="item-grid flex flex-row">
              {
                teacher.terms.map((term, i) => {
                  return <div key={i}
                              id={term._id}
                              className="grid-item flex flex-row">
                    <i className="item-icon fab fa-buromobelexperte"/>
                    <div className="grid-header-container flex flex-column">
                      <div className="grid-item-header">
                        <h3>
                          {term.termTitle}
                          <div className="choose" onClick={this.chooseStudent}>
                            Choose
                          </div>
                        </h3>
                        <h4>{moment(term.termStart).add(1, 'days').format("MMM DD YYYY")} - {moment(term
                          .termEnd).add(1, 'days').format("MMM DD YYYY")}</h4>
                      </div>
                      <div className="grid-options flex flex-row">
                        <i className="options-icon fas fa-cog"
                           onClick={this.handleModal}
                           title="Edit Term"/>
                        <i className="options-icon far fa-trash-alt"
                           onClick={this.removeTerm}
                           title="Delete Term"/>
                      </div>
                    </div>
                  </div>
                })
              }
            </section>

            {/*Edit Student Modal*/}
            <Modal isOpen={this.state.isModalOpen}
                   onRequestClose={this.closeModal}
                   ariaHideApp={false}
                   contentLabel="Sign In Modal"
                   style={this.props.styles.modal}>
              <section className="container-modal">
                <section className="modal-header">
                  <h2 className="modal-title">Edit Term</h2>
                  <img src={require("../../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                       alt="homeschool hub logo"
                       className="modal-logo"/>
                </section>
                <form className="center-all-flex"
                      onSubmit={this.handleSubmit}>
                  <input type="text"
                         placeholder="Term Title"
                         name="termTitle"
                         defaultValue={this.state.currentTerm.termTitle}
                         onChange={this.handleChange}/>
                  <input type="date"
                         placeholder="Term Start"
                         name="termStart"
                         value={moment(this.state.currentTerm.termStart)
                           .add(1, 'days').format("YYYY-MM-DD")}
                         onChange={this.handleChange}/>
                  <input type="date"
                         placeholder="Term End"
                         name="termEnd"
                         value={moment(this.state.currentTerm.termEnd)
                           .add(1, 'days').format("YYYY-MM-DD")}
                         onChange={this.handleChange}/>
                  <section className="button-row">
                    <button type="submit"
                            className="green-button"
                            style={{marginLeft: '0'}}
                    >Save
                    </button>
                    <button type="button"
                            onClick={this.handleModal}
                            className="green-button"
                    >Cancel
                    </button>
                  </section>
                </form>
              </section>
            </Modal>
          </section> : <section className="center-all-flex flex-column dashboard-empty">
            <h2>Welcome to Homeschool Hub!</h2>
            <div className="add-instructions center-all-flex">
              <h3>
                Now let's add your students.
              </h3>
              <AddStudent />
            </div>
          </section>
        }
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
    editStudent: (student) => {
      const action = {type: 'EDIT_STUDENT', student}
      dispatch(action)
    },
    setStudents: (students) => {
      const action = {type: 'SET_STUDENTS', students}
      dispatch(action)
    },
    chooseStudent: (student) => {
      const action = {type: 'CHOOSE_STUDENT', student}
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentGrid)