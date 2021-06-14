import React from 'react';
import authService from './../services/auth.service';

const { Consumer, Provider } = React.createContext();


class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null, 
    error: false
  }

  componentDidMount () {
    
    let currentUser = JSON.parse(localStorage.getItem('user'));
    
    if (currentUser != null) {
      this.setState({ isLoggedIn: true, user: currentUser, isLoading: false });
    } else {
      this.setState({ isLoggedIn: false, user: null, isLoading: false });
    }
  }

  signup = (username, team, email, password) => {
    authService.signup(username, team, email, password )
      .then((user) => this.setState({ isLoggedIn: true, user }) )
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null, error: err.response.data.message });
      })
  }

  login = (username, password) => {
    authService.login( username, password )
      .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null, error: err.response.data.message });
      })
  }

  logout = () => {
    logoutUser()

    function logoutUser () {
      const pr = localStorage.removeItem("user");
      return pr;
    }
    if (localStorage.getItem("user") === null) {
      this.setState({ isLoggedIn: false, user: null })
    }
  }


  render() {
    const { isLoggedIn, isLoading, user, error } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return(
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout, error }}  >
        {this.props.children}
      </Provider>
    )
  }

}


// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  
  return class extends React.Component {
    render() {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout, error } = value;

            return (<WrappedComponent 
                      {...this.props}
                      isLoggedIn={isLoggedIn} 
                      isLoading={isLoading} 
                      user={user} 
                      signup={signup} 
                      login={login} 
                      logout={logout}
                      error={error}
                    />)

          } }
        </Consumer>
        )
    }
}
}


export { AuthProvider, withAuth }
