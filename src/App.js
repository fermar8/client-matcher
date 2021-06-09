import './App.css';
import { Switch,  Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import Modo from './Pages/Modo';
import Swipe from './Pages/Swipe';

function App() {
  return (
    <GlobalStyle>
     <Switch>
       <Route exact path="/" render={(props) => <Home {...props} />} />
       <Route exact path="/login" render={(props) => <Login {...props} />} />
       <Route exact path="/signup" render={(props) => <Signup {...props} />} />
       <Route exact path="/landing" render={(props) => <Landing {...props} />} />
       <Route exact path="/modo" render={(props) => <Modo {...props} />} />
       <Route exact path="/swipe" render={(props) => <Swipe {...props} />} />
     </Switch>
    </GlobalStyle>
  );
}

export default App;
