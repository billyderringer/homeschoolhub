const initialState = {
  currentTeacher: {},
  isLoggedIn: false,
  openLogin: false,
  openRegister: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_TEACHER':
      return {
        ...state
      }
    case 'SET_TEACHER_ID':
      return {
        ...state,
        teacherId: action.teacherId.data.id
      }
    case 'SET_TEACHER_DATA':
      const loggedIn = !!(localStorage.getItem('token') &&
        localStorage.getItem('teacherId'))
      return {
        ...state,
        currentTeacher: action.teacher.data,
        isLoggedIn: loggedIn
      }
    case 'LOGOUT_TEACHER':
      localStorage.removeItem('token')
      localStorage.removeItem('teacherId')
      return {
        isLoggedIn: false
      }
    case 'OPEN_REGISTER':
      return {
        ...state,
        openRegister: true
      }
    case 'CLOSE_REGISTER':
      return {
        ...state,
        openRegister: false
      }
    case 'OPEN_LOGIN':
      return {
        ...state,
        openLogin: true
      }
    case 'CLOSE_LOGIN':
      return {
        ...state,
        openLogin: false
      }

    //term stuff
    case 'SET_TERMS':
      return {
        ...state,
        currentTeacher: {
          ...state.currentTeacher,
          terms: action.terms.data
        }

      }
    case 'CHOOSE_TERM':
      return {
        ...state,
        currentTeacher: {
          ...state.currentTeacher,
          currentTerm: action.term
        }
      }
    default:
      return state
  }
}

export default reducer