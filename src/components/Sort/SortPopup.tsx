import React, { useState,useRef,useEffect } from "react";
import { useDispatch} from 'react-redux'
import arrow from '../../assets/img/arrow.svg'
import { setSort } from "../../redux/filter/slice";
import { Sort, SortOrderEnum, SortPropertyEnum } from "../../redux/filter/types";

type SortItem = {
  name: string;
  sortProperty:SortPropertyEnum;
  sortOrder:SortOrderEnum;
};

type PopupClick = MouseEvent & {
  path:Node[]
}; 
type SortPopupProps = {
  value: Sort;
}

export const sortList: SortItem[] = [
{name:"Popularity(DESC)",sortProperty:SortPropertyEnum.RATING,sortOrder:SortOrderEnum.DESC},
{name:"Popularity(ASC)",sortProperty:SortPropertyEnum.RATING,sortOrder:SortOrderEnum.ASC},
{name:"Price(DESC)",sortProperty:SortPropertyEnum.PRICE,sortOrder:SortOrderEnum.DESC},
{name:"Price(ASC)",sortProperty:SortPropertyEnum.PRICE,sortOrder:SortOrderEnum.ASC},
{name:"Title(DESC)",sortProperty:SortPropertyEnum.TITLE,sortOrder:SortOrderEnum.DESC},
{name:"Title(ASC)",sortProperty:SortPropertyEnum.TITLE,sortOrder:SortOrderEnum.ASC}]

export const SortPopup: React.FC<SortPopupProps> = React.memo(({value}) => {
  const dispatch = useDispatch()


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
                  <span onClick={()=>setOpen(!open)}>{value.name}</span>
                </div>
                {open  &&
                 (<div className="sort__popup">
                    <ul>
                    {sortList.map((obj,i)=>(
                      <li onClick={()=>onClickListItem(obj)}
                        className={value.name === obj.name ? "active":""}
                        key={i}
                      >{obj.name}</li>
                      ))}
                    </ul>
                  </div> )
                }      
      </div>
    )
  })

