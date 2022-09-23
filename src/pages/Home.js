import React,{ useState,useEffect } from 'react';

import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';

function Home({searchValue}) {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const [categoryID, setCategoryID] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState({name:"popularity(DESC)",sortProperty:"rating",sortOrder:"desc"})

  
    useEffect(()=>{
      setIsLoading(true)

      const category = categoryID > 0 ? `category=${categoryID}`:"";
      const search = searchValue  ? `&search=${searchValue}`:"";
      fetch(`https://63287ed29a053ff9aab95e51.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType.sortProperty}&order=${sortType.sortOrder}${search}`)
      .then((res) => res.json())
      .then((arr) =>{
          setItems(arr)
          setIsLoading(false)
        })
      window.scrollTo(0,0)
    },[categoryID,sortType,searchValue,currentPage])

    const pizzas = items
  /*   .filter((obj)=>{
      if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
        return true;
      }
      return false;
    }) */
    .map((obj)=>(
    <PizzaBlock {...obj} key={obj.id}/>))
    const skeletons = [... new Array(6)].map((_, index)=> <Skeleton key={index}/>)


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onChangeCategory={(id)=>setCategoryID(id)}/>
        <Sort value={sortType} onChangeSort={(id)=>setSortType(id)}/>
      </div>
      <h2 className="content__title">All Pizza</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas }
      </div>
      <Pagination onChangePage={(number)=>setCurrentPage(number)}/>
   </div>
  )
}

export default Home