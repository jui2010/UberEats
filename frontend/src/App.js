import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import profile from './pages/profile'
import restaurantLogin from './pages/restaurantLogin'
import restaurantSignup from './pages/restaurantSignup'

import NavigationBar from './components/NavigationBar'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavigationBar/>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/profile" component={profile} />
              <Route exact path="/restaurantLogin" component={restaurantLogin} />
              <Route exact path="/restaurantSignup" component={restaurantSignup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App