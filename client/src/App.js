import React from 'react';
import NavBar from './components/includes/navBar';
import './App.css';
import Routes from './components/routes/routes';
import AppFooter  from './components/includes/footer';
import { AuthContextProvider } from './context/authContext';



function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <NavBar />
      <br />
      <Routes />
      </AuthContextProvider>
      <AppFooter />
    </div>
  );
}

export default App;
