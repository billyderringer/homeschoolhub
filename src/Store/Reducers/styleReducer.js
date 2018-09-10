const initialState = {
  modal: {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.9)',
      color: 'rgba(255,255,255,.8)'
    },
    content: {
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      padding: '40px',
      borderRadius: '0',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgb(0,0,0,.8)',
      color: 'rgba(255,255,255,.8)'
    },
    input: {
      padding: '5px',
      color: '#fff',
      backgroundColor: 'rgba(255,255,255,.1)'
    }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
