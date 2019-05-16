import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import LandingPage from './Containers/LandingPage_3';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {rootReducer} from "./Store/Reducers/rootReducer";
import thunk from 'redux-thunk';
import Cities from "./Containers/Cities";
import Login from "./Containers/Login";
import SignUp from "./Containers/SignUp";
import Itineraries from './Containers/Itineraries';
import Favourites from "./Containers/Favourites";

const store = createStore(rootReducer, applyMiddleware(thunk))

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={LandingPage} />
        <Route path="/cities" component={Cities} />
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/itinerary/:city" component={Itineraries}/>
        <Route path="/favourites" component={Favourites}/>
      </div>
    </Router>
  )
  
ReactDOM.render(<Provider store={store}>{routing}</Provider>, document.getElementById('root'))
  
serviceWorker.unregister();
