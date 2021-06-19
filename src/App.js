import './App.css';
import React, { Component } from "react";
import { Switch,  Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import AuthService from "./services/auth.service";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import EditaPerfil from './Pages/EditaPerfil';
import Modo from './Pages/Modo';
import AdminPage from './Pages/AdminPage';
import Swipe from './Pages/Swipe';
import Matches from './Pages/Matches';
import NoMatches from './Components/NoAvailableMatches'
import Chat from './Pages/Chat';

import AnonRoute from './Components/AnonRoute';
import PrivateRoute from './Components/PrivateRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    //const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <GlobalStyle>
       <Switch>
       
        <PrivateRoute exact path="/editaperfil" component={EditaPerfil} />
         <PrivateRoute exact path="/landing" component={Landing} /> 
         <PrivateRoute exact path="/modo" component={Modo} />
         <PrivateRoute exact path="/swipe" component={Swipe} />
         <PrivateRoute exact path="/matches" component={Matches} />
         <PrivateRoute exact path="/noswipesleft" component={NoMatches} />
         <PrivateRoute exact path="/chat/:id" component={Chat} />
       
    
          <AnonRoute exact path="/" component={Home} />
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup}/>
       
      
         <Route exact path="/admin" render={(props) => <AdminPage {...props} />} />
       </Switch>
      </GlobalStyle>
    );
  }
  
  }
  
export default App;
