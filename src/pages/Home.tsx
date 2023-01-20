import React,{ useEffect,useRef } from 'react';
import { useSelector} from 'react-redux'
import qs from 'qs'
import { useNavigate} from 'react-router-dom'
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice"
import {fetchPizzas, SearchPizzasParams, selectPizzaData} from '../redux/slices/pizzaSlice'
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort/Sort';
import imgMainMobile from './../assets/img/imgMainMobile.svg';
import imgMainDesk from './../assets/img/imgMainDesk.svg';
import Search from '../components/Search/Search';
import {useWindowWidth} from '../hooks/useWindowWidth';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);

    const isMounted = useRef(false);

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter)
    const [width] = useWindowWidth();
    
    const onChangeCategory = React.useCallback((index: number)=>{
     dispatch(setCategoryId(index))
    },[]);
 
    const onChangePage = (page: number) =>{
      dispatch(setCurrentPage(page))
    }

    useEffect(()=>{
      if(isMounted.current){
        const queryString = qs.stringify({
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        })
        navigate(`/World-of-Pizza/?${queryString}`)
        console.log(navigate)
      }
      isMounted.current = true
    },[categoryId,sort,searchValue,currentPage])

    //if was 1st render, then check URL param and save in redux
    useEffect(()=>{
      
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1)) as SearchPizzasParams;
        const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
      
        dispatch(setFilters(
            ({ searchValue: params.search,
              categoryId: Number(params.category),
              currentPage: Number(params.currentPage),
              sort: sort || sortList[0]})
          )
        )
        isSearch.current = true;
      }
    },[])

    const getPizzas = async() =>{
    
      const category = categoryId > 0 ? `category=${categoryId}`:"";
      const search = searchValue  ? `&search=${searchValue}`:"";
    
      dispatch(
      
        fetchPizzas({
            category,
            search,
            sortBy:sort.sortProperty,
            order:sort.sortOrder,
            currentPage: String(currentPage),
          }))
      }
      useEffect(()=>{
      if(!isSearch.current){
        getPizzas()
      }
      isSearch.current = false
     
        
    },[categoryId,sort,searchValue,currentPage,sort.sortProperty])


    const pizzas = items
    .map((obj:any)=>(
    <PizzaBlock key={obj.id} {...obj} />))
    const skeletons = [... new Array(8)].map((_, index)=> <Skeleton key={index}/>)


  return (
    <div className="container">
      {width < 810 ?
      <img className="content__banner" src={imgMainMobile} alt="mainImg" />:
      <img className="content__banner" src={imgMainDesk} alt="mainImg" />
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