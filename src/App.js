import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/Full-pizza';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import About from './pages/About';
import Contacts from './pages/Contacts';

function App() {
  return (
              <Routes>
                <Route path='/' element={<MainLayout/>}>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/cart' element={<Cart/>}/>
                  <Route path='/pizza/:id' element={<FullPizza/>}/>
                  <Route path='*' element={<NotFound/>}/>
                  <Route path ='/about' element={<About/>}/>
                  <Route path ='/contacts' element={<Contacts/>}/>
                </Route>
              </Routes>
  );
}

export default App;
