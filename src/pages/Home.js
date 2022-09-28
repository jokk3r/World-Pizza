import React,{ useState,useEffect,useContext } from 'react';
import { SearchContext } from '../App';
import { useDispatch, useSelector} from 'react-redux'

import {setCategoryId} from "./../redux/slices/filterSlice"
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort/Sort';

function Home() {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector(state => state.filter)

    const {searchValue}= useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const onChangeCategory = (id)=>{
     dispatch(setCategoryId(id))
    }
    console.log(categoryId)
    useEffect(()=>{
      setIsLoading(true)

      const category = categoryId > 0 ? `category=${categoryId}`:"";
      const search = searchValue  ? `&search=${searchValue}`:"";
      fetch(`https://63287ed29a053ff9aab95e51.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${sort.sortOrder}${search}`)
      .then((res) => res.json())
      .then((arr) =>{
          setItems(arr)
          setIsLoading(false)
        })
      /* window.scrollTo(0,0) */
    },[categoryId,sort,searchValue,currentPage])

    const pizzas = items
    .map((obj)=>(
    <PizzaBlock {...obj} key={obj.id}/>))
    const skeletons = [... new Array(6)].map((_, index)=> <Skeleton key={index}/>)


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort />
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