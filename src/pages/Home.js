import React,{ useEffect,useContext,useRef } from 'react';
import { SearchContext } from '../App';
import { useDispatch, useSelector} from 'react-redux'
import qs from 'qs'
import {Link, useNavigate} from 'react-router-dom'
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "./../redux/slices/filterSlice"
import {fetchPizzas, selectPizzaData} from './../redux/slices/pizzaSlice'
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort/Sort';
import imgMainMobile from './../assets/img/imgMainMobile.svg';
import imgMainDesk from './../assets/img/imgMainDesk.svg';
import Search from '../components/Search/Search';
import { useState } from 'react';
import {useWindowWidth} from './../hooks/useWindowWidth';

/* const useWindowSize =(()=>

typeof window !== 'undefined'?()=>{

  const [value, setValue]= useState(()=>({
    width: window.innerWidth,
  }))

  useEffect(()=>{
   
    const handler = ()=>
      setValue({
        width: window.innerWidth,
      })
      window.addEventListener('resize', handler)

      return () => {
        window.removeEventListener('resize', handler)
      }
    
  },[])
  return value
}
:()=>({width: null}))() */




function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const {width} = useWindowWidth();
    
    const onChangeCategory = (id)=>{
     dispatch(setCategoryId(id))
    }
 
    const onChangePage = number =>{
      dispatch(setCurrentPage(number))
    }

    useEffect(()=>{
      if(isMounted.current){
        const queryString = qs.stringify({
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        })
        navigate(`?${queryString}`)
      }
      isMounted.current = true
    },[categoryId,sort,searchValue,currentPage])

    //if was 1st render, then check URL param and save in redux
    useEffect(()=>{
      
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1));
        const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
        dispatch(
          setFilters(
            {...params,
            sort}
          )
        )
        isSearch.current = true;
      }
    },[])

    const getPizzas = async() =>{
    
      const category = categoryId > 0 ? `category=${categoryId}`:"";
      const search = searchValue  ? `&search=${searchValue}`:"";
    
      dispatch(fetchPizzas({
            category,
            search,
            sort,
            currentPage,
          }))
      }
      useEffect(()=>{
      if(!isSearch.current){
        getPizzas()
      }
      isSearch.current = false
     
        /* window.scrollTo(0,0) */
    },[categoryId,sort,searchValue,currentPage])


    const pizzas = items
    .map((obj)=>(
    <PizzaBlock key={obj.id} {...obj} />))
    const skeletons = [... new Array(6)].map((_, index)=> <Skeleton key={index}/>)


  return (
    <div className="container">
      {width < 810 ?
      <img className="content__banner" src={imgMainMobile} alt="" />:
      <img className="content__banner" src={imgMainDesk} alt="" />
      }
     {width < 810 ? (
          <Search/>
        ):<></>}
      
      <h2 className="content__title">All Pizza</h2>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort />
      </div>
        {status === 'error' ? (
          <div className='content__error-info'>
            <h2>ERROR!!!</h2>
            <p>Unfortunately, the pizzas were not found</p>
            <p>Try later</p>
          </div>
        ): (
          <div className="content__items">
          {status === 'loading' ? skeletons : pizzas } 
          </div>
        )}
        
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
   </div>
  )
}

export default Home