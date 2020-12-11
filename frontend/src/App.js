import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Results from './pages/Results';
import { LoginUser, AuthenticateUserPage } from './assets/auth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

function App()  {
  return (
    <div>
      <Switch>
        <Route exact path='/admin' component={AdminDashboard}></Route>
        <Route exact path='/' component={Landing}></Route>
        {/* <PrivateRoute path='/quiz'>
          <Quiz />
        </PrivateRoute> */}
        {/* <PrivateRoute path='/results'>
          <Results />
        </PrivateRoute> */}
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path='/quiz' component={Quiz}></Route>
        <Route exact path='/results' component={Results}></Route>
      </Switch>
      
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = AuthenticateUserPage();
  console.log(auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
