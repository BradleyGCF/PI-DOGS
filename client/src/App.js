import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import DogDetails from './components/DogDetails';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/home/:id' component={DogDetails} />
      <Route path='/creation' component={CreateDog} />
    </div>
    </BrowserRouter>
  );
}

export default App;
