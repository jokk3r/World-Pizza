import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState("");
console.log(searchValue)
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue}/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
