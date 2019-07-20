import React, {useEffect} from 'react';
import NavBar from './components/includes/navBar';
import './App.css';
import Routes from './components/routes/routes';
import AppFooter  from './components/includes/footer';
import { AuthContextProvider } from './context/authContext';



const App = () => {

  return(
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <br />
        <Routes />
      </AuthContextProvider>
      <AppFooter />
    </div>
  )
}

export default App;
