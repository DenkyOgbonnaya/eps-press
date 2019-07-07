import React from 'react';
import NavBar from './components/includes/navBar';
import './App.css';
import Routes from './components/routes/routes';
import AppFooter  from './components/includes/footer';


function App() {
  return (
    <div className="App">
      <NavBar />
      <br />
      <Routes />
      <AppFooter />
    </div>
  );
}

export default App;
