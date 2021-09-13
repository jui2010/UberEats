import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import home from './pages/home'

class App extends Component{
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App