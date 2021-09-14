import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import home from './pages/home'
import login from './pages/login'

class App extends Component{
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App