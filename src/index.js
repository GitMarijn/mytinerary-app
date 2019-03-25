import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import './index.css';
import LandingPage from './Containers/LandingPage_3';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={LandingPage} />
        {/* <Route path="/cities" component={Cities} /> */}
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))
  
serviceWorker.unregister();


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
