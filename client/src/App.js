import React, {useEffect, useContext} from 'react';
import NavBar from './components/includes/navBar';
import './App.css';
import Routes from './components/routes/routes';
import AppFooter  from './components/includes/footer';
import {AuthContext} from './context/authContext';
import {verifyToken} from './actions/authActions';


const App = () => {
  const{dispatch} = useContext(AuthContext);
  useEffect( ()=> {
    const authToken = localStorage.authToken;
    if(authToken)
      verifyToken(authToken, dispatch);
  }, [])
  return(
    <div className="App">
          <NavBar />
          <br />
          <Routes />
      <AppFooter />
    </div>
  )
}

export default App;
