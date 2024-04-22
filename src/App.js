import logo from './logo.svg';
import React from 'react';
import {
  BrowserRouter, 
  Routes, 
  Route
} from 'react-router-dom';

import './App.css';
import { CheckList } from './components/testing';

function AwsDeploymentMessage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>This React project is deployed on AWS.</p>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CheckList />} />
        </Routes>
      </BrowserRouter> 
      <AwsDeploymentMessage />     
    </>
  );
}

export default App;
