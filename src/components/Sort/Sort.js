import React, { useState,useRef,useEffect } from "react";

import { useDispatch, useSelector} from 'react-redux'
import {selectSort, setSort} from './../../redux/slices/filterSlice'
import arrow from '../../assets/img/arrow.svg'

export const sortList = [{name:"Popularity(DESC)",sortProperty:"rating",sortOrder:"desc"},
{name:"Popularity(ASC)",sortProperty:"rating",sortOrder:"asc"},
{name:"Price(DESC)",sortProperty:"price",sortOrder:"desc"},
{name:"Price(ASC)",sortProperty:"price",sortOrder:"asc"},
{name:"Title(DESC)",sortProperty:"title",sortOrder:"desc"},
{name:"Title(ASC)",sortProperty:"title",sortOrder:"asc"}]

function Sort(){
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)

  const [open, setOpen] = useState(false);
  const sortRef = useRef();
  const onClickListItem=(obj)=>{
    dispatch(setSort(obj)) 
    setOpen(false);
  }
  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(!event.path.includes(sortRef.current)){
        setOpen(false)
       }
       
       document.body.addEventListener('click', handleClickOutside)
       return()=>{
         document.body.removeEventListener('click',handleClickOutside)
       }
    }

  },[])
    return(
      <div ref={sortRef} className="sort">
                <div className="sort__label">
                  
                  <img src={arrow} alt="arrow" />
                  <b>Sort by</b>
                  <span onClick={()=>setOpen(!open)}>{sort.name}</span>
                </div>
                {open  &&
                 (<div className="sort__popup">
                 <ul>
                 {sortList.map((obj,i)=>(
                  <li onClick={()=>onClickListItem(obj)}
                    className={sort.name === obj.name ? "active":""}
                    key={i}
                  >{obj.name}</li>
                   ))}
                 </ul>
               </div> )
                }
                
              </div>
    )
  }

export default Sort