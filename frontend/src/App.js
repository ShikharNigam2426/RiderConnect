import React from 'react'
import styled from 'styled-components'
import Navbar from './Component/HomePage/Navbar';
import Hero from './Component/HomePage/Hero';
import Feature from './Component/HomePage/Feature';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Register from './Component/RegisterPage/Register';
import Login from './Component/RegisterPage/Login';
import CreateRidePage from './Component/CreateRidePage/CreateRidePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <div>
            <AppComponent className='bg-dark text-light ubuntu-medium'>
              <Navbar />
              <Hero />
              <Feature />
            </AppComponent>
          </div>
        }></Route>
        <Route path='/register' element={
          <div>
            <AppComponent className='bg-dark text-light ubuntu-medium'>
              <Navbar />
              <Register />
            </AppComponent>
          </div>
        }></Route>
        <Route path='/login' element={
          <div>
            <AppComponent className='bg-dark text-light ubuntu-medium'>
              <Navbar />
              <Login />
            </AppComponent>
          </div>
        }></Route>
        <Route path='/createRide' element={
          <div>
            <AppComponent className='bg-dark text-light ubuntu-medium'>
              <Navbar />
              <CreateRidePage />
            </AppComponent>
          </div>
        }></Route>
      </Routes>
    </Router>
  )
}

const AppComponent = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App