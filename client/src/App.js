import React from 'react';
import NavBar from './components/includes/navBar';
import './App.css';
import Routes from './components/routes/routes';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes />
    </div>
  );
}

export default App;
