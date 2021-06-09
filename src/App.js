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
import Chat from './Pages/Chat';
import Modo from './Pages/Modo';
import AdminPage from './Pages/AdminPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      loguejat: false
    };

    this.setloguejat = this.setloguejat.bind(this);
  }
  
  setloguejat(valor){
    this.setState({loguejat: valor});
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
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <GlobalStyle>
       <Switch>
         <Route exact path="/" render={(props) => <Home {...props} />} />
         <Route exact path="/login" render={(props) => <Login setloguejat={this.setloguejat} {...props} />} />
         <Route exact path="/signup" render={(props) => <Signup {...props} />} />
         
       { this.state.loguejat ? <>
        <Route exact path="/editaperfil" render={(props) => <EditaPerfil loguejat={this.state.loguejat} {...props} />} />
         <Route exact path="/chat" render={(props) => <Chat {...props} />} />
         <Route exact path="/landing" render={(props) => <Landing loguejat={this.state.loguejat} {...props} />} />   
       
       </>
       : <>
         <Route exact path="/landing" render={(props) => <Login setloguejat={this.setloguejat} {...props} />} />
       
       </>}
         <Route exact path="/modo" render={(props) => <Modo {...props} />} />
         <Route exact path="/admin" render={(props) => <AdminPage {...props} />} />
       </Switch>
      </GlobalStyle>
    );
  }
  
  }
  
export default App;
