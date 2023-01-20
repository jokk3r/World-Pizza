import React, { useState,useRef,useEffect } from "react";

import { useDispatch, useSelector} from 'react-redux'
import {selectSort, setSort, SortOrderEnum, SortPropertyEnum} from '../../redux/slices/filterSlice'
import arrow from '../../assets/img/arrow.svg'

type SortItem = {
  name: string;
  sortProperty:SortPropertyEnum;
  sortOrder:SortOrderEnum;
};

type PopupClick = MouseEvent & {
  path:Node[]
}; 

export const sortList: SortItem[] = [
{name:"Popularity(DESC)",sortProperty:SortPropertyEnum.RATING,sortOrder:SortOrderEnum.DESC},
{name:"Popularity(ASC)",sortProperty:SortPropertyEnum.RATING,sortOrder:SortOrderEnum.ASC},
{name:"Price(DESC)",sortProperty:SortPropertyEnum.PRICE,sortOrder:SortOrderEnum.DESC},
{name:"Price(ASC)",sortProperty:SortPropertyEnum.PRICE,sortOrder:SortOrderEnum.ASC},
{name:"Title(DESC)",sortProperty:SortPropertyEnum.TITLE,sortOrder:SortOrderEnum.DESC},
{name:"Title(ASC)",sortProperty:SortPropertyEnum.TITLE,sortOrder:SortOrderEnum.ASC}]

function SortPopup(){
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)

  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const onClickListItem=(obj:SortItem)=>{
    dispatch(setSort(obj)) 
    setOpen(false);
  }
  useEffect(()=>{
    const handleClickOutside = (event:MouseEvent)=>{
      const _event = event as PopupClick;
      if(sortRef.current && !_event.path.includes(sortRef.current)){
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

export default SortPopup