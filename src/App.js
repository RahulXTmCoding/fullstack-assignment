import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import store from './reduxweb/store'
import Home from './components/Home';

import Bookings from './components/Bookings';



function App() {
  return (

    <Provider store={store}>
       <Router>
         <Switch>
           <Route path='/' exact>
             <Home />

             </Route>

           <Route path='/bookings' exact>
             <Bookings/>

             </Route>

          

          



           </Switch>
         </Router>
      </Provider>
    
  );
}

export default App;
