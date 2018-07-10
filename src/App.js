
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './component/general/Header';
import Loading from './component/general/Loading';
import Message from './component/general/Message';


const HomePage = Loadable({
  loader: () => import('./component/HomePage'),
  loading: Loading,
});

const LoginPage = Loadable({
  loader: () => import('./component/LoginPage'),
  loading: Loading,
});

const SignupPage = Loadable({
  loader: () => import('./component/SignupPage'),
  loading: Loading,
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Header/>
        <Message/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/register' component={SignupPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
