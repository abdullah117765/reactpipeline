import logo from './logo.svg';
import React from 'react';
import {

  BrowserRouter, Routes, Route
} from 'react-router-dom';

import './App.css';
import { CheckList } from './components/testing';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckList />} />
      </Routes>
    </BrowserRouter>      
    </>
  );
}

export default App;
