import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import store from './Store/'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import Header from "./Layout/Header"
import Footer from "./Layout/Footer"

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="container-main">
            <Header/>
            <Route path="/" exact strict component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Footer/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
