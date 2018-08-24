import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './components/home/HomePage';
import Login from './components/sessions/Login';
import Regsiter from './components/sessions/Register';
import Blogs from './components/home/Blogs';
import HomepageLayout from './layouts/HomepageLayout';

const NoMatch = ({match}) => 
<HomepageLayout match={match}>
<h2>页面未找到</h2>
<h3>404</h3>

</HomepageLayout>

class App extends Component {

  render() {
    return (
     
      <div className="App">
      
        <Router>
          
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route  path="/blog" component={Blogs} />
            <Route  path="/login" component={Login} />
            <Route  path="/register" component={Regsiter} />
            <Route component={NoMatch}/>
          </Switch>
        </Router>
        
      </div>
    );
  }
}

export default App;
