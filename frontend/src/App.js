import React, { Component } from 'react'
import './App.css'
import cookie from 'react-cookies'
import axios from 'axios'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {GET_AUTHENTICATED_USER, GET_AUTHENTICATED_RESTAURANT} from './redux/types'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import profile from './pages/profile'
import restaurantLogin from './pages/restaurantLogin'
import restaurantSignup from './pages/restaurantSignup'
import restaurant from './pages/restaurant'
import orders from './pages/orders'
import orderSummary from './pages/orderSummary'
import checkout from './pages/checkout'
import favorites from './pages/favorites'

import NavigationBar from './components/NavigationBar'

class App extends Component{
  componentDidMount(){
    if(cookie.load('cookie')){
      let email = cookie.load('cookie')
      console.log('app cookie', email)
      axios.post('/getAuthenticatedUser', {email : email})
        .then(res => {
          store.dispatch({
            type : GET_AUTHENTICATED_USER,
            payload : res.data[0]
          })
        })
    }

    if(cookie.load('cookieRestaurant')){
      let email = cookie.load('cookieRestaurant')
      console.log('rest cookie', email)
      axios.post('/getAuthenticatedRestaurant', {email : email})
        .then(res => {
          store.dispatch({
            type : GET_AUTHENTICATED_RESTAURANT,
            payload : res.data[0]
          })
        })
    }
  }

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
              <Route exact path="/profile/:userid" component={profile} />
              <Route exact path="/restaurantLogin" component={restaurantLogin} />
              <Route exact path="/restaurantSignup" component={restaurantSignup} />
              <Route exact path="/restaurant/:restaurantName" component={restaurant} />
              <Route exact path="/orders" component={orders} />
              <Route exact path="/orderSummary" component={orderSummary} />
              <Route exact path="/checkout" component={checkout} />
              <Route exact path="/favorites" component={favorites} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
