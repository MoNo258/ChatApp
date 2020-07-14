import React, {Component} from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {auth} from './services/firebase'

import logo from './logo.svg';
import './App.css';

// due to distinguish between private and public routes this project has created `higher-order components` (HOCs) for both types of routes
// <PrivateRoute> HOC:
function PrivateRoute({component: Components, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={
                (props) => authenticated === true
                    ? <Component {...props}/>
                    : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }
        />
    )
}

// <PublicRoute> HOC:
function PublicRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/chat'/>
            }
        />
    )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState( {
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState( {
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
        <Router>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <PrivateRoute path='/chat' authenticated={this.state.authenticated} component={Chat} ></PrivateRoute>
            <PublicRoute path='/signup' authenticated={this.state.authenticated} component={Signup} ></PublicRoute>
            <PublicRoute path='/login' authenticated={this.state.authenticated} component={Login} ></PublicRoute>
          </Switch>
        </Router>
    )
  }


}

export default App;


// function App() {
//     return (
// <div className="App">
//     <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo"/>
//         <p>
//             Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//         >
//             Learn React
//         </a>
//     </header>
// </div>
//     );
// }

export default App;
