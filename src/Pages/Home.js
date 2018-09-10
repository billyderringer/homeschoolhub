import React, {Component} from 'react'
import './Pages.css'

class Home extends Component {
  render() {
    return (
      <div id="container-home">
        <div id="hero"
             className="center-all-flex">
          <h1>Made for<br/>
            <span id="hs-span">Homeschoolers</span><br/>
            with <span id="lv-span">Love</span></h1>
        </div>
      </div>
    )
  }
}

export default Home