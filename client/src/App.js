import React, {Fragment, useEffect} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from './components/layout/Alert';
import {loadUser} from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile'
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
//Pages
import SignInAndSignUpPage from 'pages/auth/SignInAndSignUpPages'
//Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
//material ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'2rem',
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const  App = () => {
  const classes = useStyles();
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])

  return (
<Provider store={store}>
  <Router>
      <Fragment>
        <Navbar/>
        <Route exact path='/' component={Landing}/>
        <section className={classes.root}>
        <Alert/>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={SignInAndSignUpPage}/>   
            <Route exact path='/profiles' component={Profiles}/>  
            <Route exact path='/profile/:id' component={Profile}/>   
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
            <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
            <PrivateRoute exact path='/add-experience' component={AddExperience}/>
            <PrivateRoute exact path='/add-education' component={AddEducation}/>
            <PrivateRoute exact path='/posts' component={Posts}/>
            <PrivateRoute exact path='/posts/:id' component={Post}/>
          </Switch>
        </section>
      </Fragment>  
  </Router>
</Provider>
  
  

);}
 


export default App;
