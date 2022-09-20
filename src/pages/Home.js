import React,{ useState,useEffect } from 'react';

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
    fetch('https://63287ed29a053ff9aab95e51.mockapi.io/items')
    .then((res) => res.json())
    .then((arr) =>{
        setItems(arr)
        setIsLoading(false)})
    },[])

  return (
    <><div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">All Pizza</h2>
      <div className="content__items">
        {isLoading ? [... new Array(6)].map((_, index)=> <Skeleton key={index}/>) : items.map((obj)=>(
            <PizzaBlock {...obj} key={obj.id}/>
        )) }
      </div>
   </>
  )
}

export default Home