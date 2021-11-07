import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED, SET_AUTHENTICATED_REST} from './redux/types'
import {getAuthenticatedUserData, logoutUser} from './redux/actions/userActions'
import {getAuthenticatedRestaurantData, logoutRestaurant} from './redux/actions/restaurantActions'

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
import orderSuccess from './pages/orderSuccess'

import jwtDecode from 'jwt-decode'

import NavigationBar from './components/NavigationBar'

//verify token, if token has not expired get the userdata
const token = localStorage.userToken
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = './login'
  }
  else {
    store.dispatch({
      type : SET_AUTHENTICATED
    })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getAuthenticatedUserData())
  }
}

//verify token, if token has not expired get the userdata
const restToken = localStorage.restaurantToken
if(restToken){
  const decodedToken = jwtDecode(restToken)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutRestaurant())
    window.location.href = './restaurantLogin'
  }
  else {
    store.dispatch({
      type : SET_AUTHENTICATED_REST
    })
    axios.defaults.headers.common['Authorization'] = restToken
    store.dispatch(getAuthenticatedRestaurantData())
  }
}

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
              <Route exact path="/profile/:userid" component={profile} />
              <Route exact path="/restaurantLogin" component={restaurantLogin} />
              <Route exact path="/restaurantSignup" component={restaurantSignup} />
              <Route exact path="/restaurant/:restaurantName" component={restaurant} />
              <Route exact path="/orders" component={orders} />
              <Route exact path="/orderSummary" component={orderSummary} />
              <Route exact path="/checkout" component={checkout} />
              <Route exact path="/favorites" component={favorites} />
              <Route exact path="/orderSuccess" component={orderSuccess} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
