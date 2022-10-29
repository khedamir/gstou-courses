import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/UI/AppRouter';
import React from 'react';
import Navbar from './components/UI/Navbar/Navbar';

function App({user}) {


  return (

      <BrowserRouter>
        <Navbar/>
        <AppRouter user = {user} />
      </BrowserRouter>
  );
}

export default App;
