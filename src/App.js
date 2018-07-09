
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './component/general/Header';
import Loading from './component/general/Loading';



const HomePage = Loadable({
  loader: () => import('./component/HomePage'),
  loading: Loading,
});

const LoginPage = Loadable({
  loader: () => import('./component/LoginPage'),
  loading: Loading,
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Header/>
          <Switch>
            <Route exact={true} to='/' component={HomePage}/>
            <Route to='/login' component={LoginPage}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
