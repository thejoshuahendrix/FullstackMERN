import React, { useState } from 'react';
import NavBarHeader from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import UserList from './components/User/UserList';
import PostList from './components/Posts/PostList';
import Hero from './components/Hero';
import CustomerPage from './components/Customer/CustomerPage';
import jwt from 'jsonwebtoken';
import MyAccount from './components/User/MyAccount';

console.log(process.env.REACT_APP_ADMIN_KEY);


let decoded: any = jwt.decode(localStorage.getItem('token') ?? "");

const App = () => {
  const [user] = useState(decoded ? decoded.username : "");
  const [role] = useState(decoded ? decoded.role : "");
  const [isAdmin] = useState(role === 'h67524')
  const [isLoggedIn] = useState(decoded ? true : false);

  return (
    <div className="App">
      <NavBarHeader isLoggedIn={isLoggedIn} isAdmin={isAdmin} user={user} />


      <Router>
        <Switch>
          <Route exact path='/' component={() => <div style={{ margin: '2rem', padding: '2rem' }}> <Hero isLoggedIn={isLoggedIn} header="Home" /> </div>} />
          <Route exact path='/login' component={() => <Login />} />
          <Route path='/users' component={() => <UserList isLoggedIn={isLoggedIn} isAdmin={isAdmin} username={decoded ? decoded.username : ""} />} />
          <Route path='/register' component={Register} />
          <Route path='/logout' component={Logout} />
          <Route path='/customer' component={() => <CustomerPage isLoggedIn={isLoggedIn} />} />
          <Route path='/posts' component={() => <PostList isLoggedIn={isLoggedIn} isAdmin={isAdmin} username={decoded ? decoded.username : ""} />} />
          <Route path='/account' component={() => <MyAccount isLoggedIn={isLoggedIn} />} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;
