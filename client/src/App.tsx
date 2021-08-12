import React, { useEffect } from 'react';
import NavBar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/Login';
import PostList from './components/PostList';
import Register from './components/Register';
import Logout from './components/Logout';

const App = () => {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/posts' component={PostList} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
