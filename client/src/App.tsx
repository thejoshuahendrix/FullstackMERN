import React, { useEffect } from 'react';
import NavBar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/Login';
import PostList from './components/PostList';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/posts' component={PostList} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
