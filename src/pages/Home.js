import React,{ useState,useEffect,useContext,useRef } from 'react';
import axios from 'axios';
import { SearchContext } from '../App';
import { useDispatch, useSelector} from 'react-redux'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'
import {setCategoryId, setCurrentPage, setFilters} from "./../redux/slices/filterSlice"
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort/Sort';


function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const {categoryId, sort, currentPage} = useSelector(state => state.filter)

    const {searchValue}= useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



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

    const fetchPizzas =() =>{
      setIsLoading(true)

      const category = categoryId > 0 ? `category=${categoryId}`:"";
      const search = searchValue  ? `&search=${searchValue}`:"";
      axios.get(`https://63287ed29a053ff9aab95e51.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${sort.sortOrder}${search}`)
      .then((res) =>{
          setItems(res.data)
          setIsLoading(false)
        })
    }
    useEffect(()=>{
     if(!isSearch.current){
      fetchPizzas()
     }

     isSearch.current = false
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
   </div>
  )
}

export default Home