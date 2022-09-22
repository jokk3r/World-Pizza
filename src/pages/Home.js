import React,{ useState,useEffect } from 'react';

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';

function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const [categoryID, setCategoryID] = useState(0);
    const [sortType, setSortType] = useState({name:"popularity(ASC)",sortProperty:"rating",sortOrder:"asc"})

  
    useEffect(()=>{
      setIsLoading(true)
      const category = categoryID > 0 ? `category=${categoryID}`:"";
      fetch(`https://63287ed29a053ff9aab95e51.mockapi.io/items?${category}&sortBy=${sortType.sortProperty}&order=${sortType.sortOrder}`)
      .then((res) => res.json())
      .then((arr) =>{
          setItems(arr)
          setIsLoading(false)
        })
      window.scrollTo(0,0)
    },[categoryID,sortType])

  

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onChangeCategory={(id)=>setCategoryID(id)}/>
        <Sort value={sortType} onChangeSort={(id)=>setSortType(id)}/>
      </div>
      <h2 className="content__title">All Pizza</h2>
      <div className="content__items">
        {isLoading ? [... new Array(6)].map((_, index)=> <Skeleton key={index}/>) : items.map((obj)=>(
            <PizzaBlock {...obj} key={obj.id}/>
        )) }
      </div>
   </div>
  )
}

export default Home