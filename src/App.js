import React,{ useState,useEffect } from 'react';
import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';
import './scss/app.scss';

function App() {

 const [items, setItems] = useState([]);

 useEffect(()=>{
  fetch('https://63287ed29a053ff9aab95e51.mockapi.io/items')
  .then((res) => res.json())
  .then((arr) =>{setItems(arr)})
 },[])
 
console.log(items)
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
           <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">All Pizza</h2>
          <div className="content__items">
            {items.map((obj)=>(
               <PizzaBlock {...obj} key={obj.id}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
