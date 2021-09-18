import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import restaurantLogin from './pages/restaurantLogin'
import restaurantSignup from './pages/restaurantSignup'

class App extends Component{
  render(){
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/restaurantLogin" component={restaurantLogin} />
            <Route exact path="/restaurantSignup" component={restaurantSignup} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App