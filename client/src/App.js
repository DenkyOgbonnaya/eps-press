import React, {useEffect, useContext} from 'react';
import NavBar from './components/includes/navBar';
import './App.css';
import Routes from './components/routes/routes';
import AppFooter  from './components/includes/footer';
import {AuthContext} from './context/authContext';
import {verifyToken} from './actions/authActions';


const App = () => {
  const{dispatchAuth} = useContext(AuthContext);
  const authToken = localStorage.authToken;

  useEffect( ()=> {
    if(authToken)
      verifyToken(authToken, dispatchAuth);
  }, [authToken, dispatchAuth])
  return(
    <div className="App">
          <NavBar />
          <br />
          <Routes />
          <br />
      <AppFooter />
    </div>
  )
}

export default App;
