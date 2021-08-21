import React, { useState } from 'react';
import NavBar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import UserList from './components/UserList';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

const jwt = require('jsonwebtoken');


let decoded = jwt.decode(localStorage.getItem('token'));

const App = () => {
  
const [user, setUser] = useState(decoded?decoded.username:"");



  return (
    <div className="App">
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path='/' component={()=><Login/>} />
          <Route path='/users' component={()=> <UserList username={decoded? decoded.username:""} />}  />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path='/customer' component={CustomerForm} />
          <Route path='/customerlist' component={CustomerList} />
          <Route path='/posts' component={() => <PostList username={decoded? decoded.username:""} />} />
        </Switch>
      </Router>
      {user? "Hello "+user:""}
    </div>
  );
}

export default App;
