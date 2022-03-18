import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar'
import FooterComponent from './components/FooterComponent'
import Home from './components/Home'
import Admin from './components/auth/Admin'
import ShoppingList from './components/ShoppingList'
// import ShoppingCart from './components/ShoppingCart'
import { Container } from 'reactstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />
            <Container>
              <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/products' component={ShoppingList} />
              {/* <Route path='/shoppingcart' component={ShoppingCart} /> */}
              <Route path='/adminpanel' component={Admin} />
              </Switch>
            </Container>
          </div>
            <FooterComponent />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
