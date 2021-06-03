import './App.css';
import { Switch,  Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <GlobalStyle>
     <Switch>
       <Route exact path="/" render={(props) => <Home {...props} />} />
       <Route exact path="/login" render={(props) => <Login {...props} />} />
       <Route exact path="/signup" render={(props) => <Signup {...props} />} />
     </Switch>
    </GlobalStyle>
  );
}

export default App;
