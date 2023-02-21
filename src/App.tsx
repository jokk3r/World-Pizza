import React,  { Suspense } from "react";
import Loadable from 'react-loadable';
import {
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

//const Cart = React.lazy(() => import(/* webpackChunkName: "cart" */'./pages/Cart'));
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "cart" */'./pages/Cart'),
  loading: ()=> <div>Cart loading...</div>,
});
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/Full-pizza'));
const About = React.lazy(() => import(/* webpackChunkName: "About" */'./pages/About'));
const Contacts = React.lazy(() => import(/* webpackChunkName: "Contacts" */'./pages/Contacts'));

function App() {
  return (
              <Routes>
                <Route path='/' element={<MainLayout/>}>
                  <Route path='/World-of-Pizza' element={<Home/>}/>
                  <Route path='/World-of-Pizza/cart' element={
                    <Suspense fallback={<div>Cart loading...</div>}>
                      <Cart/>
                    </Suspense>}/>
                  <Route path='/World-of-Pizza/pizza/:id' element={
                    <Suspense fallback={<div>loading...</div>}>
                      <FullPizza/>
                    </Suspense>}/>
                  <Route path='*' element={
                    <Suspense fallback={<div>loading...</div>}>
                      <NotFound/>
                    </Suspense>}/>
                  <Route path ='/World-of-Pizza/about' element={
                    <Suspense fallback={<div>loading...</div>}>
                      <About/>
                    </Suspense>}/>
                  <Route path ='/World-of-Pizza/contacts' element={
                    <Suspense fallback={<div>loading...</div>}>
                      <Contacts/>
                    </Suspense>}/>
                </Route>
              </Routes>
  );
}

export default App;
